import { ReactElement } from 'react'
import { Showtime } from './movieTypes'

interface ShowtimesViewProps {
  showtimes: Showtime[]
}

export default function ShowtimesView({ showtimes }: ShowtimesViewProps): ReactElement {
  return (
    <ul>
      {showtimes.map((s, idx) => (
        <li key={`${s.theatreId}-${idx}`} className='inline-block mr-4'>
          <span>{s.time}</span>
        </li>
      ))}
    </ul>
  )
}
