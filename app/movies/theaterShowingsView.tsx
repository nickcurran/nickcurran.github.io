import { ReactElement, useState } from 'react'
import { Showtime, Movie } from './movieTypes'
import ShowtimesView from './showtimesView'

interface TheaterShowingsViewProps {
  movie: Movie
  showtimes: Showtime[]
  onFilterMovie: (movieId: string) => void
}

export default function TheaterShowingsView({ movie, showtimes, onFilterMovie }: TheaterShowingsViewProps): ReactElement {

  const [showHide, setShowHide] = useState(false)

  return (
    <li className='mt-2'>
      <div className='flex items-center'>
        <h2 className='text-xl inline-block' onClick={() => setShowHide(!showHide)}>{movie.title}</h2>
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
