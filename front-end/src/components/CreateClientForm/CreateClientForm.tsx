'use client'

import { useActionState } from 'react'
import INIT_STATE from '@/models/IFormState'
import createClient from '@/actions/createClient'
import { Icon } from '@iconify/react'

export default function CreateClientForm() {
    const [formState, formAction] = useActionState(createClient, INIT_STATE)

    console.log(formState);
    
    return <form action={ formAction }>
        <div>
            <div>
                <label htmlFor="email">Email:</label>
                <input name='email' type="email" required/>
            </div>
            <div>
                <label htmlFor="name">Username:</label>
                <input name='name' type="text" required/>
            </div>
            <div>
                <label htmlFor="passWord">Password:</label>
                <input name='passWord' type="password" required/>
            </div>
            <div>
                <label htmlFor="passConf">Validate Password:</label>
                <input name='passConf' type="password" required/>
            </div>
        </div>
        <div style={{ display: 'flex', gap: '1em' }}>
            <button type='reset'>Reset <Icon icon='system-uicons:reset'/></button>
            <button type='submit'>Create <Icon icon='system-uicons:mail-new' rotate={ 45 }/></button>
        </div>
    </form>
}