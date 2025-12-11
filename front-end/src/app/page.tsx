import { getBGGDB } from '@/lib/getBGGDB'
import { BoardGameNightsAPI } from '@/services/boardGameNightsAPI'
import Event from '@/models/Event'
import { LogButton } from '@/components/dev/LogButton'
import ServerStatus from '@/components/dev/ServerStatus'
import GamesList from '@/components/dev/GamesList'
import EventList from '../components/EventList/EventList'
import { Icon } from '@iconify/react/dist/iconify.js';

export default async function Home() {
    const DB = { BGG: await getBGGDB(), Strapi: new BoardGameNightsAPI() }, events = (await DB.Strapi.getEvents()).data?.map(e => new Event(e)) ?? []

    return <>
        <h1>Board Game Nights</h1>
        {/* <ServerStatus status={ await (async () => { const r = await DB.Strapi.ping(); r.status.toString().match(/^-1$/) && console.error('Error pinging server:', r.statusText); return r.status.toString().startsWith('2') && r.statusText.match(/^OK$/) ? 'Online' : 'Offline' })() }/> */}
        {/* <GamesList BGGDB={ DB.BGG } itemsToDisplay={ 5 }/> */}
        {/* <EventList events={ events } BGGDB={ DB.BGG }/> */}
        {/* <LogButton str={JSON.stringify(DB.BGG.getDB())}/> */}
        <form action="">
            <div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" required/>
                </div>
                <div>
                    <label htmlFor="name">Username:</label>
                    <input type="text" required/>
                </div>
                <div>
                    <label htmlFor="pass">Password:</label>
                    <input type="password" required/>
                </div>
                <div>
                    <label htmlFor="passValid">Validate Password:</label>
                    <input type="password" required/>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1em' }}>
                <button type='reset'>Reset <Icon icon='system-uicons:reset'/></button>
                <button type='submit'>Create <Icon icon='system-uicons:mail-new' rotate={ 45 }/></button>
            </div>
        </form>
    </>
}