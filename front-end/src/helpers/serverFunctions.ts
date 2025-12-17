'use server'

import JWTHelper from '@/helpers/JWTHelper'
import { getBGGDB } from '@/lib/getBGGDB'
import BoardGameNightsAPI, { IInputTypes } from '@/services/boardGameNightsAPI'

const DB = await getBGGDB(), JWT = new JWTHelper(), API = new BoardGameNightsAPI()

export const searchByName = async (gameName: string) => DB.searchByName(gameName)

export const getToken = async (str: string) => await JWT.getToken(str)

export const verifyToken = async (str: string, token: string) => await JWT.verifyToken(str, token)

export const createEvent = async (data: IInputTypes['createEvent']) => await API.createEvent(data)

export const getEvents = async () => await API.getEvents()

export const createClient = async (data: IInputTypes['createClient']) => await API.createClient(data)

export const getClient = async (email: IInputTypes['getClient']['email']) => await API.getClient(email)