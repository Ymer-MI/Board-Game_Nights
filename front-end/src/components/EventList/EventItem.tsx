import styles from './eventList.module.css'
import { IEvent } from '@/models/Event'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { IBGGDBRow } from '@/models/BGGDB'

export default function EventItem({ event, gameName }: { event: IEvent, gameName: IBGGDBRow['name'] }) {
    const [isDetailsOpened, setIsDetailsOpened] = useState(false)

    return <li id={ event.documentId } className={ styles.event } onClick={() => { setIsDetailsOpened(!isDetailsOpened) }}>
        <h4>{ gameName } @{ event.location }</h4>
        <div className={ styles.infoRow }>
            <div>
                <span className={ styles.bannerDetail }>Time: { new Date(event.dateTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit'}) }</span>
                <span className={ styles.bannerDetail }>Players: { event.playersMin } - { event.playersMax }</span>
                <span className={ styles.bannerDetail }>Host: { event.host?.name }</span>
            </div>
            <span className={ `${ styles.detailsClosed } ${ isDetailsOpened && styles.hidden }` }>Details <Icon icon='system-uicons:chevron-down' height={ 30 } width={ 20 }></Icon></span>
        </div>
        <section className={ `${ styles.description } ${ !isDetailsOpened && styles.hidden }` }>
            <p>
                { event.description }
            </p>
            <div className={ styles.attendeeRow }>
                <span>
                    Attending: { event.attendees?.map((c, i, a) => <>
                        <span key={ c.documentId }>{ c.name }</span>{ i !== --a.length && ','}
                    </>) }
                </span>
                <span className={ `${ styles.detailsOpened } ${ !isDetailsOpened && styles.hidden }` }>Details <Icon icon='system-uicons:chevron-up' height={ 30 } width={ 20 }></Icon></span>
                <div className={ styles.attendContainer }>
                    <button onClick={() => { console.log('Attending') }}>Attend<Icon icon='system-uicons:write'></Icon></button>
                </div>
            </div>
        </section>
    </li>
}