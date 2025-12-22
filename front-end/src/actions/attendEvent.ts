import z from 'zod'
import { ZodFieldErrors } from '@/models/zodFieldErrors'
import IFormState from '@/models/IFormState'
import { formatZodErrors, getFormData } from '@/helpers/actionHelpers'
import { ATTEND_EVENT_INIT_STATE } from '@/components/AttendForm/AttendEventForm'
import { attendEvent, getClient, verifyToken } from '@/helpers/serverFunctions'
import Client from '@/models/Client'
import { id } from 'zod/locales'

const attendEventSchema = z.object({
    id: z.string(),
    token: z.string().min(128, { error: 'Token is to short. make sure you entered the entire token.' })
})

export interface IAttendEventState extends IFormState<ZodFieldErrors<typeof attendEventSchema.shape>, z.infer<typeof attendEventSchema>> {}

export default async function attendEventAction(prevState: IAttendEventState, formData: FormData) {
    const data = getFormData(formData), validatedFields = attendEventSchema.safeParse(data)

    if (!validatedFields.success) return { ...prevState, ...ATTEND_EVENT_INIT_STATE, zodErrors: formatZodErrors(z.treeifyError(validatedFields.error).properties), formData: { ...data } } satisfies IAttendEventState as IAttendEventState

    const { id, token } = data, client = (await getClient(token)).data?.map(c => new Client(c))[0]

    if (!client) return { ...prevState, ...ATTEND_EVENT_INIT_STATE, errorMessage: `Could not find user with token: ${ token }`, formData: { ...data } } satisfies IAttendEventState as IAttendEventState

    if (!await verifyToken(data.token, client.getToken())) return { ...prevState, ...ATTEND_EVENT_INIT_STATE, errorMessage: `Could not verify token. Please check it and try entering it again.`, formData: { ...data } } satisfies IAttendEventState as IAttendEventState

    const respons = await attendEvent(id, { attendees: { connect: [client.getDocumentId()] } })

    if(!respons) return { ...prevState, ...ATTEND_EVENT_INIT_STATE, errorMessage: 'Ops! Something went wrong. Please try again.', formData: { ...data } } satisfies IAttendEventState as IAttendEventState
    
    if(respons.error) return { ...prevState, ...ATTEND_EVENT_INIT_STATE, strapiErrors: respons.error, errorMessage: 'Failed to create a new event.', formData: { ...data } } satisfies IAttendEventState as IAttendEventState

    return { ...prevState, ...ATTEND_EVENT_INIT_STATE, successMessage: `1` } satisfies IAttendEventState as IAttendEventState
}