import { useState, useDeferredValue, useEffect } from 'react'
import MessageBox, { MESSAGETYPE } from '@/components/MessageBox/MessageBox'

interface IBaseProps {
    id: string
    label: string
    className?: string
    error?: string[]
    kind?: 'text' | 'search-select'
}

interface ITextInputProps extends IBaseProps {
    kind?: 'text'
    type: HTMLInputElement['type']
    defaultValue?: {
        value?: string
        checked?: boolean
    }
}

interface ISelectInputProps<T> extends IBaseProps {
    kind: 'search-select'
    minChars?: number
    maxResults?: number
    search: searchFn<T>
    onSelect: (item: ISearchResult<T>) => void
}

export type searchFn<T> = (query: string) => ISearchResult<T>[]

export type IInputGroupProps<T = unknown> = ITextInputProps | ISelectInputProps<T>

export interface ISearchResult<T> { label: string, value: string | number, raw: T }

function isTextInputProps<T>(props: IInputGroupProps<T>): props is ITextInputProps {
    return props.kind !== 'search-select'
}

export default function InputGroup<T>(props: IInputGroupProps<T>) {
    const { id, label, className, error } = props, [query, setQuery] = useState(''),
    [results, setResults] = useState<ISearchResult<T>[]>([]), deferredQuery = useDeferredValue(query)
    
    useEffect(() => {
        if (props.kind === 'search-select') {
            const { minChars = 3, maxResults = 10, search } = props
            deferredQuery.length >= minChars ? setResults(search(deferredQuery).slice(0, maxResults)) : setResults([])
        }
    }, [deferredQuery, props])

    return <div className={className}>
        <label htmlFor={id}>{label}:</label>
        { isTextInputProps(props) ? 
            <input id={ id } name={ id } type={ props.type } required defaultValue={ props.defaultValue?.value } checked={ props.defaultValue?.checked }/>
        : <>
            <input id={ `${ id }-search` } type='text' value={ query } onChange={ e => setQuery(e.target.value) } placeholder={`Type at least ${ props.minChars ?? 3 } characters...`} autoComplete='off'/>
            <select id={ id } onChange={e => {
                const item = results.find(r => String(r.value) === e.target.value)
                if (item) {
                props.onSelect(item)
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