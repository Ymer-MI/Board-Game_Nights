import Event, { IEvent } from '@/models/Event'

export interface IClient {
    documentId: string
    name: string
    events?: IEvent[]
}

export default class Client {
    private documentId: string
    private name: string
    private events?: Event[]

    constructor({ documentId, name, events }: IClient) {
        this.documentId = documentId
        this.name = name
        this.events = events?.map(e => new Event(e))
    }

    getDocumentId = () => this.documentId
    getName = () => this.name
    getEvents = () => this.events
}