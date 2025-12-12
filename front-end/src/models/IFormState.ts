export default interface IFormState<T, D> {
    zodErrors?: T,
    strapiErrors?: {
        status: number
        name: string
        message: string
        details: object
    }
    errorMessage?: string
    successMessage?: string
    formData: D
}