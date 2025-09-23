import { ReactElement, useState } from 'react'
import { Movie, Theater, Data, Filters } from './movieTypes'
import { titleSort } from './service'
import TheaterShowingsView from './theaterShowingsView'
interface TheaterViewProps {
  theater: Theater
  data: Data
  filters: Filters
  onFilterMovie: (tmsId: string) => void
  onFilterTheater: (theaterId: string) => void
}

export function TheaterView ({ theater, data, filters, onFilterMovie, onFilterTheater }: TheaterViewProps): ReactElement | null {

  const [showHide, setShowHide] = useState(false)

  const showtimes = data.showtimes.filter(s => s.theatreId === theater.id)
  
  const movieIds = showtimes
    .map(s => s.movieId)
    .filter(id => !filters.movies.includes(id))
    .reduce((acc, id) => {
    acc.add(id)
    return acc
  }, new Set<string>())

  const movies = [...movieIds]
    .map(id => data.movies.find(m => m.tmsId === id))
    .filter((m): m is Movie => m !== undefined) // filter out any undefined movies
    .sort(titleSort)

  if (movies.length === 0) {
    return null
  }
  
  return (
    <li className='flex-1 mb-10 pt-2'>
      <div className='flex items-center'>
        <h1 className='text-2xl' onClick={() => setShowHide(!showHide)}>{theater.name}</h1>
        {showHide && (
          <span>
            <button className='ml-4 text-sm' onClick={() => onFilterTheater(theater.id)}><em>Hide</em>?</button>
          </span>
        )}
      </div>

      <ul>
        {movies.map(movie => {

          const movieShowtimes = showtimes.filter(s => s.movieId === movie.tmsId)

          return (
            <TheaterShowingsView
              key={movie.tmsId}
              movie={movie}
              showtimes={movieShowtimes}
              onFilterMovie={onFilterMovie}
            />
          )
        })}
      </ul>
    </li>
  )
}