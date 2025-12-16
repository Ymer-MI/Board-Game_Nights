'use server'

import BoardGameNightsAPI, { IInputTypes } from '@/services/boardGameNightsAPI'
import JWTHelper from '@/helpers/JWTHelper'

const JWT = new JWTHelper(), API = new BoardGameNightsAPI()

export const getToken = async (str: string) => await JWT.getToken(str)

export const createEvent = async (data: IInputTypes['createEvent']) => await API.createEvent(data)

export const getEvents = async () => await API.getEvents()

export const createClient = async (data: IInputTypes['createClient']) => await API.createClient(data)