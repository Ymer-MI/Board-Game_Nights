import BGGDB from '@/models/BGGDB'
import Event from '@/models/Event'
import styles from './eventList.module.css'

export default function EventList({ events, BGGDB}: { events: Event[], BGGDB: BGGDB }) {
    return <section>
        <h2>Events:</h2>
        <ul className={ styles.dateList }>
            { Object.entries(Event.groupByDate(events)).map(([ date, events ]) => <li className={ styles.date } key={ date }>
                <h3>{ date.slice(2).split('-').reverse().join('-').replace(/-/, '/') }</h3>
                <ul className={ styles.eventList }>
                    { events.map(e => <li className={ styles.event } key={ e.getDocumentId() }>
                        <h4>{ BGGDB.findByID(e.getGameID())?.getName() } @{ e.getLocation() }</h4>
                        <div className={ styles.infoRow }>
                            <span>Time: { e.getDateTime().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit'}) }</span>
                            <span>Players: { e.getPlayersMin() } - { e.getPlayersMax() }</span>
                            <span>Host: { e.getHost()?.getName() }</span>
                        </div>
                        <section className={ `${ styles.description } hidden` }>
                            Hello World!
                        </section>
                    </li>) }
                </ul>
            </li> ) }
        </ul>
    </section>
}