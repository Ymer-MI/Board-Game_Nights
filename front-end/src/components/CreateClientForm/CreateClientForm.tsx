'use client'

import { useActionState, useRef } from 'react'
import createClientAction, { ICreateClientState } from '@/actions/createClient'
import { Icon } from '@iconify/react'
import InputGroup from '@/components/InputGroup'

export const CREATE_CLIENT_INIT_STATE = {
    strapiErrors: undefined,
    errorMessage: undefined,
    successMessage: undefined,
    zodErrors: undefined,
    formData: {}
} as ICreateClientState

export default function CreateClientForm() {
    const [formState, formAction] = useActionState(createClientAction, CREATE_CLIENT_INIT_STATE), { zodErrors, errorMessage, successMessage } = formState, strapiErrors = formState.strapiErrors?.message,
    ref = useRef<HTMLFormElement>(null)
    
    return <form ref={ ref } action={ formAction }>
        <div>
            <InputGroup id='email' label='Email' type='email' defaultValue={{ value: formState.formData?.email ?? '' }} error={ zodErrors?.email }/>
            <InputGroup id='name' label='Username' type='text' defaultValue={{ value: formState.formData?.name ?? '' }} error={ zodErrors?.name }/>
            <InputGroup id='passWord' label='Password' type='password' defaultValue={{ value: formState.formData?.passWord ?? '' }} error={ zodErrors?.passWord }/>
            <InputGroup id='passConf' label='Passsword Confirmation' type='password' defaultValue={{ value: formState.formData?.passConf ?? '' }} error={ zodErrors?.passConf }/>
        </div>
        <div style={{ display: 'flex', gap: '1em' }}>
            <button type='reset' onClick={() => { /*form.reset()*/ }}>Reset <Icon icon='system-uicons:reset'/></button>
            <button type='submit'>Create <Icon icon='system-uicons:mail-new' rotate={ 45 }/></button>
        </div>
        { (strapiErrors || errorMessage ) && <p>{ `${ strapiErrors?.length && strapiErrors }${ strapiErrors?.length && errorMessage?.length && '\n'}${ errorMessage?.length && errorMessage }` }</p> }
        { successMessage && <p>{ successMessage }</p> }
    </form>
}