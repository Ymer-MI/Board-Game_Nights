import { useState, useDeferredValue, useEffect } from 'react'
import MessageBox, { MESSAGETYPE } from '@/components/MessageBox/MessageBox'
import { required } from 'zod/mini'

interface IBaseProps {
    id: string
    label: string
    className?: string
    required?: boolean
    error?: string[]
    kind?: 'basic' | 'search-select'
}

interface IBasicInputProps extends IBaseProps {
    kind?: 'basic'
    type: HTMLInputElement['type']
    defaultValue?: {
        value?: string
        checked?: boolean
    }
}

interface ISelectInputProps extends IBaseProps {
    kind: 'search-select'
    minChars?: number
    maxResults?: number
    search: searchFn
    defaultValue?: number | string
}

export type searchFn = (query: string) => Promise<ISearchResult[]>

export type inputGroupProps = IBasicInputProps | ISelectInputProps

export interface ISearchResult { label: string, value: number | string}

function isBasicInputProps<T>(props: inputGroupProps): props is IBasicInputProps {
    return props.kind === 'basic'
}

export default function InputGroup<T>(props: inputGroupProps) {
    const { id, label, className, required, error } = props, [query, setQuery] = useState(isBasicInputProps(props) ? props.defaultValue?.value ?? '' : ''),
    [results, setResults] = useState<ISearchResult[]>([]), deferredQuery = useDeferredValue(query)
        
    useEffect(() => {
        if (props.kind === 'search-select') {
            const { minChars = 3, maxResults = 10, search, defaultValue } = props
            
            let cancelled = false;

            (async () => {
                return query === '' && defaultValue != null && !cancelled ? 
                    setQuery((await search('')).find(r => r.value === defaultValue)?.label ?? '') :
                    deferredQuery.length < minChars && !cancelled ? setResults([]) :
                    !cancelled ? setResults((await search(deferredQuery)).slice(0, maxResults)) : null
            })()
            
            return () => { cancelled = true }
        }
    }, [deferredQuery, props])

    return <div className={ className }>
        <label htmlFor={ id }>{ label }:</label>
        { isBasicInputProps(props) ? 
            <input id={ id } name={ id } type={ props.type } required={ required } defaultValue={ props.defaultValue?.value } checked={ props.defaultValue?.checked }/>
        : <>
            <input id={ `${ id }-search` } type='text' value={ query } onChange={ e => setQuery(e.target.value) } placeholder={`Type at least ${ props.minChars ?? 3 } characters...`} autoComplete='off'/>
            <select id={ id } required={ required } value={ query } onChange={e => {
                const item = results.find(r => String(r.value) === e.target.value)
                if (item) {
                setQuery(item.label)
                }
            }} size={ results.length || 1 }>
            { results.length === 0 ? <option disabled>No matches</option> : results.map(r => (
                <option key={ r.value } value={ r.value }>{ r.label }</option>
            ))}
            </select>
        </>}
        {error && <MessageBox msg={error} type={MESSAGETYPE.WARNING} />}
    </div>
}