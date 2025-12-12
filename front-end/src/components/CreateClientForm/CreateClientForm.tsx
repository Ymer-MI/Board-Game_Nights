'use client'

import { useActionState } from 'react'
import createClient, { CREATE_CLIENT_INIT_STATE } from '@/actions/createClient'
import { Icon } from '@iconify/react'
import InputGroup from '@/components/InputGroup'

export default function CreateClientForm() {
    const [formState, formAction] = useActionState(createClient, CREATE_CLIENT_INIT_STATE), { zodErrors, errorMessage } = formState, strapiErrors = formState.strapiErrors?.message

    console.log(formState);
    
    return <form action={ formAction }>
        <div>
            <InputGroup id='email' label='Email' type='email' defaultValue={{ value: formState.formData.email ?? '' }} error={ zodErrors?.email }/>
            <InputGroup id='name' label='Username' type='text' defaultValue={{ value: formState.formData.name ?? '' }} error={ zodErrors?.name }/>
            <InputGroup id='passWord' label='Password' type='password' defaultValue={{ value: formState.formData.passWord ?? '' }} error={ zodErrors?.passWord }/>
            <InputGroup id='passConf' label='Passsword Confirmation' type='password' defaultValue={{ value: formState.formData.passConf ?? '' }} error={ zodErrors?.passConf }/>
        </div>
        <div style={{ display: 'flex', gap: '1em' }}>
            <button type='reset'>Reset <Icon icon='system-uicons:reset'/></button>
            <button type='submit'>Create <Icon icon='system-uicons:mail-new' rotate={ 45 }/></button>
        </div>
    </form>
}