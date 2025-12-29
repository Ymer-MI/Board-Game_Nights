'use client'

import { IEvent } from '@/models/Event'
import { getEvents } from '@/helpers/serverFunctions'
import { useEffect, useState } from 'react'
import { LogButton } from '@/components/dev/LogButton'
import ServerStatus from '@/components/dev/ServerStatus'
import GamesList from '@/components/dev/GamesList'
import EventList from '../components/EventList/EventList'
import CreateClientForm from '@/components/CreateClientForm/CreateClientForm'
import CreateEventForm from '@/components/CreateEventForm/CreateEventForm'
import Modal, { IModalContent } from '@/components/Modal/Modal'

export default function Home() {
    const [events, setEvents] = useState<IEvent[]>([]), [isOpen, setIsOpen] = useState(false), [modalContent, setModalContent] = useState<IModalContent | null>(null),
    openModal = (content: IModalContent) => { 
        setModalContent(Object.assign(content, {
            title: ['event', 'client'].includes(content.title.toLowerCase()) ? `Create ${ content.title }` : content.title,
            cancelButtonText: content.cancelButtonText ?? 'Close'
        })) 
        setIsOpen(true)
    }, closeModal = () => { setIsOpen(false); setModalContent(null) }

    useEffect(() => { !events.length && (async () => { setEvents((await getEvents()).data as IEvent[]) })() })

    return <section>
        <h1>Board Game Nights</h1>
        {/* <ServerStatus status={ await (async () => { const r = await DB.Strapi.ping(); r.status.toString().match(/^-1$/) && console.error('Error pinging server:', r.statusText); return r.status.toString().startsWith('2') && r.statusText.match(/^OK$/) ? 'Online' : 'Offline' })() }/> */}
        {/* <GamesList BGGDB={ BGGDB } itemsToDisplay={ 5 }/> */}
        {/* <LogButton str={JSON.stringify(BGGDB.getDB())}/> */}
        <div style={{ display: 'flex', justifyContent: 'end', gap: '1em'}}>
            <button onClick={() => openModal({ title: 'Client', content: <CreateClientForm /> })}>Create Client</button>
            <button onClick={() => openModal({ title: 'Event', content: <CreateEventForm /> })}>Create Event</button>
        </div>
        <EventList events={ events }/>
        { isOpen && modalContent && <Modal title={ modalContent.title } content={ modalContent.content } cancelButtonText={ modalContent.cancelButtonText } successButton={ modalContent.successButton } onclose={ closeModal } /> }
        {/* <CreateClientForm/> */}
        {/* <CreateEventForm/> */}
    </section>
}