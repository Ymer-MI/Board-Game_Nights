import { getBGGDB } from '@/lib/getBGGDB'
import { BoardGameNightsAPI } from '@/services/boardGameNightsAPI'
import Event from '@/models/Event'
import { LogButton } from '@/components/dev/LogButton'
import ServerStatus from '@/components/dev/ServerStatus'
import GamesList from '@/components/dev/GamesList'
import EventList from '../components/EventList/EventList'

export default async function Home() {
    const DB = { BGG: await getBGGDB(), Strapi: new BoardGameNightsAPI() }, events = (await DB.Strapi.getEvents()).data?.map(e => new Event(e)) ?? []

    return <>
        <h1>Board Game Nights</h1>
        {/* <ServerStatus status={ await (async () => { const r = await DB.Strapi.ping(); r.status.toString().match(/^-1$/) && console.error('Error pinging server:', r.statusText); return r.status.toString().startsWith('2') && r.statusText.match(/^OK$/) ? 'Online' : 'Offline' })() }/>
        <GamesList BGGDB={ DB.BGG } itemsToDisplay={ 5 }/> */}
        <EventList events={ events } BGGDB={ DB.BGG }/>
        {/* <LogButton str={JSON.stringify(DB.BGG.getDB())}/> */}
    </>
}