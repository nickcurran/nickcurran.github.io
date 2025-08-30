import { ReactElement, useState } from 'react'
import { Showtime, Theater  } from './movieTypes'

interface MovieTheaterViewProps {
  theater: Theater
  showtimes: Showtime[]
  onFilterTheater: (theaterId: string) => void
}

export default function MovieTheaterView ({ theater, showtimes, onFilterTheater }: MovieTheaterViewProps): ReactElement {

  const [showHide, setShowHide] = useState(false)

  return (
    <li className='mt-2'>
      <div className='flex items-center'>
        <h2 className='text-xl inline-block' onClick={() => setShowHide(!showHide)}>{theater.name}</h2>
        {showHide && (
          <span>
            <button className='ml-4 text-sm' onClick={() => onFilterTheater(theater.id)}><em>Hide</em>?</button>
          </span>
        )}
      </div>
      
      <ul>
        {showtimes.map((s, idx) => (
          <li key={`${s.theatreId ?? idx}-${idx}`} className='inline-block mr-4'>
            {s.ticketURI !== null
              ? (
                <a href={s.ticketURI} target='_blank' rel='noopener noreferrer'>{s.time}</a>
                )
              : (
                <span>{s.time}</span>
                )
            }
          </li>
        ))}
      </ul>
    </li>
  )
}
