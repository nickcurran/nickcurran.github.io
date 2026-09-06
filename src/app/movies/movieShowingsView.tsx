import { ReactElement, useState } from 'react'
import { Showtime, Theater } from './movieTypes'
import ShowtimesView
  from './showtimesView'

interface MovieShowingsViewProps {
  theater: Theater
  showtimes: Showtime[]
  onFilterTheater: (theaterId: string) => void
}

export default function MovieShowingsView ({ theater, showtimes, onFilterTheater }: MovieShowingsViewProps): ReactElement {
  const [showHide, setShowHide] = useState(false)

  return (
    <li className='mt-2'>
      <div className='flex items-center'>
        <h3 className='text-xl inline-block'>
          <button type='button' className='text-left' aria-expanded={showHide} onClick={() => setShowHide(!showHide)}>{theater.name}</button>
        </h3>
        {showHide && (
          <span>
            <button className='ml-4 text-sm' onClick={() => onFilterTheater(theater.id)}><em>Hide</em>?</button>
          </span>
        )}
      </div>

      <ShowtimesView showtimes={showtimes} />
    </li>
  )
}
