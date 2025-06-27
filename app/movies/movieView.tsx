import { ReactElement } from 'react'
import { Movie, Data, Theater } from './movieTypes'
import Image from 'next/image'
const imageBaseUrl = 'https://www.tmsimg.com/assets/'

function imageLoader ({ src }: { src: string }): string {
  return `${imageBaseUrl}${src}`
}

export default function MovieView ({ movie, data }: { movie: Movie, data: Data }): ReactElement {
  const showtimes = data.showtimes.filter(s => s.movieId === movie.tmsId)
  const theaterIds = showtimes.map(s => s.theatreId).reduce((acc, id) => {
    acc.add(id)
    return acc
  }, new Set<string>())

  const theaters = [...theaterIds]
    .map(id => data.theaters.find(t => t.id === id))
    .filter((t): t is Theater => t !== undefined) // filter out any undefined theaters
    .sort((a: Theater, b: Theater) => a.name.localeCompare(b.name))

  const imgUrl = typeof movie.preferredImage.uri === 'string' && !movie.preferredImage.uri.includes('generic') ? `${movie.preferredImage.uri}` : null

  return (
    <li className='pt-2 mb-12 clear-both'>
      {imgUrl !== null && (
        <Image src={imgUrl} loader={imageLoader} width='160' height='240' alt={movie.title} className='mb-12 rounded-md float-right clear-both ml-8' />
      )}

      <h1 className='text-2xl'>{movie.title}</h1>
      <p>{movie.longDescription}</p>

      <ul>
        {theaters.map((theater) => {
          const theaterShowtimes = showtimes.filter(s => s.theatreId === theater.id)

          return (
            <li key={theater.id} className='mt-2'>
              <h2 className='text-xl'>{theater.name}</h2>
              <ul>
                {theaterShowtimes.map((s, idx) => (
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
          )
        })}
      </ul>
    </li>
  )
}
