export interface IFormState {
    zodErrors: string | undefined
    strapiErrors: string | undefined
    errorMessage: string | undefined
    successMessage: string | undefined
}

const INIT_STATE = {
    zodErrors: undefined,
    strapiErrors: undefined,
    errorMessage: undefined,
    successMessage: undefined
} satisfies IFormState as IFormState

export default INIT_STATE