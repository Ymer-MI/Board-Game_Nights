import styles from './attendEventForm.module.css'
import { useActionState, useRef } from 'react'
import attendEventAction, { IAttendEventState } from '@/actions/attendEvent'
import InputGroup from '@/components/InputGroup'
import { Icon } from '@iconify/react'
import { IEvent } from '@/models/Event'
import MessageBox, { MESSAGETYPE } from '../MessageBox/MessageBox'

export const ATTEND_EVENT_INIT_STATE: IAttendEventState = {
    strapiErrors: undefined,
    errorMessage: undefined,
    successMessage: undefined,
    zodErrors: undefined,
    formData: {
        id: '',
        token: ''
    }
} satisfies IAttendEventState

export default function AttendEventForm({ event }: { event: IEvent }) {
    const [formState, formAction] = useActionState(attendEventAction, ATTEND_EVENT_INIT_STATE), { zodErrors, errorMessage, successMessage } = formState,
    strapiErrors = formState.strapiErrors?.message, ref = useRef<HTMLFormElement>(null), { token } = formState.formData

    return <form className={ styles.attendEvent } ref={ ref } action={ formAction }>
        <div className={ styles.inputGroups }>
            <InputGroup required id='token' className={ styles.inputGroup } label='Attendee user token' type='text' defaultValue={{ value: token }} error={ zodErrors?.token }/>
            <input hidden name='id' value={ event.documentId } />
        </div>
        <div className={ styles.buttonRow }>
            <button type='reset' onClick={() => { /*form.reset()*/ }}>Reset <Icon icon='system-uicons:reset'/></button>
            <button type='submit'>Attend <Icon icon='system-uicons:write'/></button>
        </div>
        { (strapiErrors || errorMessage ) && <MessageBox msg={ `${ strapiErrors?.length && strapiErrors }${ strapiErrors?.length && errorMessage?.length && '\n'}${ errorMessage?.length && errorMessage }` } type={ MESSAGETYPE.ERROR }/> }
        { successMessage && <MessageBox msg={ successMessage } type={ MESSAGETYPE.SUCCESS }/> }
    </form>
}