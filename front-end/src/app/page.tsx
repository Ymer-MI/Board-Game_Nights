import { IEvent } from '@/models/Event'
import { getEvents } from '@/helpers/serverFunctions'
import { LogButton } from '@/components/dev/LogButton'
import ServerStatus from '@/components/dev/ServerStatus'
import GamesList from '@/components/dev/GamesList'
import EventList from '../components/EventList/EventList'
import CreateClientForm from '@/components/CreateClientForm/CreateClientForm'
import CreateEventForm from '@/components/CreateEventForm/CreateEventForm'

export default async function Home() {
    const events = (await getEvents())?.data as IEvent[] ?? []

    return <>
        <h1>Board Game Nights</h1>
        {/* <ServerStatus status={ await (async () => { const r = await DB.Strapi.ping(); r.status.toString().match(/^-1$/) && console.error('Error pinging server:', r.statusText); return r.status.toString().startsWith('2') && r.statusText.match(/^OK$/) ? 'Online' : 'Offline' })() }/> */}
        {/* <GamesList BGGDB={ BGGDB } itemsToDisplay={ 5 }/> */}
        {/* <LogButton str={JSON.stringify(BGGDB.getDB())}/> */}
        <EventList events={ events }/>
        <CreateClientForm/>
        <CreateEventForm/>
    </>
}