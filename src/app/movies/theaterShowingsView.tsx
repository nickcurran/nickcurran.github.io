import { ReactElement, useState } from 'react'
import { Showtime, Movie } from './movieTypes'
import ShowtimesView from './showtimesView'

interface TheaterShowingsViewProps {
  movie: Movie
  showtimes: Showtime[]
  onFilterMovie: (movieId: string) => void
}

export default function TheaterShowingsView ({ movie, showtimes, onFilterMovie }: TheaterShowingsViewProps): ReactElement {
  const [showHide, setShowHide] = useState(false)

  return (
    <li className='mt-2'>
      <div className='flex items-center'>
        <h3 className='text-xl inline-block'>
          <button type='button' className='text-left' aria-expanded={showHide} onClick={() => setShowHide(!showHide)}>{movie.title}</button>
        </h3>
        {showHide && (
          <span>
            <button className='ml-4 text-sm' onClick={() => onFilterMovie(movie.tmsId)}><em>Hide</em>?</button>
          </span>
        )}
      </div>

      <ShowtimesView showtimes={showtimes} />
    </li>
  )
}
