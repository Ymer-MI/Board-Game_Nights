import type { AxiosHeaders, AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, HeadersDefaults } from 'axios'
import axios from 'axios'

export class BaseService {
    private ax: AxiosInstance

    constructor(baseURL?: string, token?: string) {
        this.ax = axios.create({ baseURL, headers: { Authorization: token && `Bearer ${token}` } })
    }

    private checkEndPointStr = (str: string) => `${str.charAt(0) !== '/' ? `/${str}` : str}`

    private checkParams = (str?: string) => str && str.length !== 0 ? `?${str}` :  ''

    private buildEndPoint = (endPoint: string, params?: string) => this.checkEndPointStr(endPoint) + this.checkParams(params)

    public ping = async (URL: string, headers?: AxiosRequestConfig['headers']) => await axios.create().get(URL, { headers })

    public get = async <T>(endpoint: string, params?: string, query?: object) => (await this.ax.get<T>(this.buildEndPoint(endpoint, params), { params: query })).data
}