import { z } from 'zod'
import INIT_STATE, { IFormState } from '@/models/IFormState'

const createClientSchema = z.object({
    email: z.email({ error: 'Please enter a valid email address.' }),
    name: z.string().min(2, { error: 'Please enter a valid user name.' }),
    passWord: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!?#%&+-_~])(?!.*[^A-Za-z0-9!?#%&+-_~]).{10,}$/, { error: `Please enter a valid password:\n1. At least 1 upper case character.\n2. At least 1 lower case character.\n3. At least one digit.\n4. At least one of these special characters: ! ? # % & + - _ ~ (no other special characters are allowed).\n5. At least 10 characters long.` }),
    passConf: z.string()
}).superRefine(({ passWord, passConf }, ctx) => {
    if (passConf !== passWord) {
    ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match.',
        path: ['confirmPassword']
    });
  }
})

export default async function createClient(prevState: IFormState, formData: FormData) {
    console.log(JSON.parse(`{${formData.entries().map(e => `"${[e[0]]}": "${e[1]}"`).toArray().join(',')}}`));

    return { ...prevState, ...INIT_STATE, successMessage: 'New user created successfully!' } satisfies IFormState as IFormState
}