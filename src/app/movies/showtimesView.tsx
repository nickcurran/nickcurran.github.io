import { ReactElement, useState } from 'react'
import { Showtime } from './movieTypes'

interface ShowtimesViewProps {
  showtimes: Showtime[]
}

export default function ShowtimesView ({ showtimes }: ShowtimesViewProps): ReactElement {
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null)

  return (
    <div>
      <ul>
        {showtimes.map((s, idx) => (
          <li key={`${s.theatreId}-${idx}`} className='inline-block mr-4'>
            {(s.quals.length > 0)
              ? (selectedShowtime === s)
                  ? <button type='button' className='text-blue-500 underline' aria-expanded={true} onClick={() => setSelectedShowtime(null)}>{s.time}</button>
                  : <button type='button' className='text-blue-500' aria-expanded={false} onClick={() => setSelectedShowtime(s)}>{s.time}</button>
              : <span>{s.time}</span>}

          </li>
        ))}
      </ul>

      {(selectedShowtime != null) && (
        <div>{selectedShowtime.quals.join(', ')}</div>
      )}
    </div>
  )
}
