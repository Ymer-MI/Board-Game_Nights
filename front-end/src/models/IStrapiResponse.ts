interface IMeta {
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

interface IData {
    id: number
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
}

export default interface IStrapiResponse<T> extends IMeta {
    data: (T & IData)[]
}