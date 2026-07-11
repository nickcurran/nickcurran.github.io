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
                  ? <span className='text-blue-500 underline' onClick={() => setSelectedShowtime(null)}>{s.time}</span>
                  : <span className='text-blue-500' onClick={() => setSelectedShowtime(s)}>{s.time}</span>
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
