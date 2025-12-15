'use server'

import BoardGameNightsAPI, { IInputTypes } from '@/services/boardGameNightsAPI'
import JWTHelper from '@/helpers/JWTHelper'

const JWT = new JWTHelper(), API = new BoardGameNightsAPI()

export async function getToken(str: string) {
    return await JWT.getToken(str)
}

export async function getEvents() {
    return await API.getEvents()
}

export async function createClient(data: IInputTypes['createClient']) {
    return await API.createClient(data)
}