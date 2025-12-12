'use server'

import BoardGameNightsAPI from '@/services/boardGameNightsAPI'
import JWTHelper from '@/helpers/JWTHelper'

const JWT = new JWTHelper(), API = new BoardGameNightsAPI()

export async function getToken(str: string) {
    return await JWT.getToken(str)
}

export async function getEvents() {
    return await API.getEvents()
}

export async function createClient(data: any) {
    return await API.createClient(data)
}