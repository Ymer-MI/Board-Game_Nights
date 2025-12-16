'use client'

import styles from './createClientForm.module.css'
import { useActionState, useRef } from 'react'
import createEventAction, { ICreateEventState } from '@/actions/createEvent'
import { Icon } from '@iconify/react'
import InputGroup from '@/components/InputGroup'
import MessageBox, { MESSAGETYPE } from '../MessageBox/MessageBox'

export const CREATE_EVENT_INIT_STATE = {
    strapiErrors: undefined,
    errorMessage: undefined,
    successMessage: undefined,
    zodErrors: undefined
} as ICreateEventState

export default function CreateClientForm() {
    const [formState, formAction] = useActionState(createEventAction, CREATE_EVENT_INIT_STATE), { zodErrors, errorMessage, successMessage } = formState, strapiErrors = formState?.strapiErrors?.message,
    ref = useRef<HTMLFormElement>(null)
    
    return <form id={ styles.createClient } ref={ ref } action={ formAction }>
        <div className={ styles.inputGroups }>
            <InputGroup id='email' className={ styles.inputGroup } label='Host users email' type='email' defaultValue={{ value: formState?.formData?.email ?? '' }} error={ zodErrors?.email }/>
            <InputGroup id='token' className={ styles.inputGroup } label='Host users token' type='text' defaultValue={{ value: formState.formData?.token ?? '' }} error={ zodErrors?.token }/>
            
            <InputGroup id='passWord' className={ styles.inputGroup } label='Password' type='password' defaultValue={{ value: formState?.formData?.passWord ?? '' }} error={ zodErrors?.passWord }/>
            <InputGroup id='passConf' className={ styles.inputGroup } label='Passsword Confirmation' type='password' defaultValue={{ value: formState?.formData?.passConf ?? '' }} error={ zodErrors?.passConf }/>
        </div>
        <div className={ styles.buttonRow }>
            <button type='reset' onClick={() => { /*form.reset()*/ }}>Reset <Icon icon='system-uicons:reset'/></button>
            <button type='submit'>Create <Icon icon='system-uicons:mail-new' rotate={ 45 }/></button>
        </div>
        { (strapiErrors || errorMessage ) && <MessageBox msg={ `${ strapiErrors?.length && strapiErrors }${ strapiErrors?.length && errorMessage?.length && '\n'}${ errorMessage?.length && errorMessage }` } type={ MESSAGETYPE.ERROR }/> }
        { successMessage && <MessageBox msg={ successMessage } type={ MESSAGETYPE.SUCCESS }/> }
    </form>
}