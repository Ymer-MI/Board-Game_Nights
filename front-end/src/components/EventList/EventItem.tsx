import styles from './eventList.module.css'
import buttonStyles from './detailsButton.module.css'
import { IEvent } from '@/models/Event'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { IBGGDBRow } from '@/models/BGGDB'
import DetailsButton from './DetailsButton'

export default function EventItem({ event, gameName }: { event: IEvent, gameName: IBGGDBRow['name'] }) {
    const [isDetailsOpened, setIsDetailsOpened] = useState(false), toggleDetails = () => { setIsDetailsOpened(!isDetailsOpened) }

    return <li id={ event.documentId } className={ styles.event }>
        <h4>{ gameName } @{ event.location }</h4>
        <div className={ styles.infoRow }>
            <div>
                <span className={ styles.bannerDetail }>Time: { new Date(event.dateTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit'}) }</span>
                <span className={ styles.bannerDetail }>Players: { event.playersMin } - { event.playersMax }</span>
                <span className={ styles.bannerDetail }>Host: { event.host?.name }</span>
            </div>
            <div>
                <DetailsButton className={ isDetailsOpened && buttonStyles.hidden } icon='system-uicons:pull-down' onClick={ toggleDetails }/>
            </div>
        </div>
        <section className={ `${ styles.description } ${ !isDetailsOpened && styles.hidden }` }>
            <p>
                { event.description }
            </p>
            <div className={ styles.attendeeRow }>
                <span>Attending: { event.attendees?.map((c, i, a) => <><span key={ c.documentId }>{ c.name }</span>{ i !== --a.length && ','}</>) }</span>
                <div>
                    <DetailsButton className={ !isDetailsOpened && buttonStyles.hidden } icon='system-uicons:push-up' onClick={ toggleDetails }/>
                </div>
                <div className={ styles.attendContainer }>
                    <button onClick={() => { console.log('Attending') }}>Attend<Icon icon='system-uicons:write'></Icon></button>
                </div>
            </div>
        </section>
    </li>
}