import { ReactElement } from 'react'
import { Movie, Theater, Data, Filters } from './movieTypes'
import { titleSort } from './service'

interface TheaterViewProps {
  theater: Theater
  data: Data
  filters: Filters
  onFilterMovie: (tmsId: string) => void
  onFilterTheater: (theaterId: string) => void
}

export function TheaterView ({ theater, data, filters }: TheaterViewProps): ReactElement | null {

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

  return (
    <li className='flex-1 mb-10 pt-2'>
      <h1 className='text-2xl'>{theater.name}</h1>

      <ul>
        {movies.map((movie) => (
          <li key={movie.tmsId}>
            <h2 className='text-xl mt-2'>{movie.title}</h2>

            <ul>
              {showtimes.filter(s => s.movieId === movie.tmsId).map((s, idx) => (
                <li key={`${s.theatreId ?? idx}-${idx}`} className='inline-block mr-4'>
                  {s.ticketURI !== null
                    ? (
                      <a href={s.ticketURI} target='_blank' rel='noopener noreferrer'>{s.time}</a>
                      )
                    : (
                      <span>{s.time}</span>
                      )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  )
}
