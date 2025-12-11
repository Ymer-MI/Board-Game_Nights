import { BaseService } from '@/services/base'
import qs from 'qs'
import IStrapiResponse from '@/models/IStrapiResponse'
import { IEvent } from '@/models/Event'
import { IClient } from '@/models/Client'

const clientKeys = Object.keys({ name: '' } satisfies Omit<IClient, 'documentId'>),
    eventKeys = Object.keys({ location: '', dateTime: '', gameID: 0, description: '', token: '', playersMin: 0, playersMax: 0 } satisfies Omit<IEvent, 'documentId'>)
    
    
export class BoardGameNightsAPI {
    private readonly URL = process.env.DB_API_URL
    private readonly TOKEN = process.env.DB_API_TOKEN
    private readonly endpointPrefix = '/api'

    private readonly populateEvents = qs.stringify({
        sort: [`dateTime:asc`],
        populate: {
            host: {
                fields: clientKeys
            },
            attendees: {
                fields: clientKeys
            }
        }
    })

    private readonly populateClients = qs.stringify({
        populate: {
            events: {
                fields: eventKeys
            }
        }
    })
    
    private service = new BaseService(`${ this.URL }${this.endpointPrefix}`, this.TOKEN)

    ping = async () => this.URL && this.TOKEN ? await this.service.ping(this.URL, {Authorization: `Bearer ${ this.TOKEN }`}) : { status: -1, statusText: 'Missing env variable!' }

    getEvents = async () => await this.service.get<IStrapiResponse<IEvent>>('/events', this.populateEvents)

    getClients = async () => await this.service.get<IStrapiResponse<IClient>>('/clients', this.populateClients)

    logReadonly = () => {
        console.log(this.populateEvents, this.populateClients);
    }
}