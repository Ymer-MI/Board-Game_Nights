export default function({ id, className, label, type, defaultValue, error }: { id: HTMLElement['id'], className?: HTMLElement['className'], label: HTMLLabelElement['innerHTML'], type: HTMLInputElement['type'], defaultValue?: { value?: HTMLInputElement['value'], checked?: HTMLInputElement['checked'] }, error?: string[] }) {
    return <div className={ className }>
        <label htmlFor={ id }>{ label }:</label>
        <input id={ id } name={ id } type={ type } required defaultValue={ defaultValue?.value } checked={ defaultValue?.checked } />
        { error && <p>{ error }</p> }
    </div>
}