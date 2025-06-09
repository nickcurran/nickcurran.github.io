'use client'

import { useState, FormEvent } from 'react'

import { getData } from './service'
import { Data } from './movieTypes'
import MovieView from './movieView'
import Menu from '@/components/Menu'

export default function MoviesPage () {
  const [zipCode, setZipCode] = useState('55407')
  const [radius, setRadius] = useState('10')
  // const [mode, setMode] = useState('movies')
  const mode = 'movies'
  const [data, setData] = useState({ movies: [], theaters: [], showtimes: [] } as Data)

  async function handleSubmit (event: FormEvent) {
    event.preventDefault() // Prevent the default form submission behavior
    const data = await getData(zipCode, radius)
    setData(data)
  }

  return (
    <div className='max-w-[800px] w-full flex-1'>
      <Menu />
      <div className='flex-1 ms-5 me-5 mt-[2rem]'>
        <h1 className='text-[2.5rem]'>Movie Showtimes</h1>

        <section className='mt-2'>
          <input
            type='text'
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            placeholder='zip code'
            className='border border-gray-300 rounded-md w-[100px] p-2 mb-4 text-center'
          />

          <select value={radius} onChange={e => setRadius(e.target.value)} className='ml-4'>
            <option value='5'>5 miles</option>
            <option value='10'>10 miles</option>
            <option value='15'>15 miles</option>
            <option value='20'>20 miles</option>
            <option value='25'>25 miles</option>
          </select>

          {/* <select value={mode} onChange={(e) => setMode(e.target.value)} className='ml-4'>
            <option value='movies'>Movies</option>
            <option value='theaters'>Theaters</option>
          </select> */}

          <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded ml-4'>
            Submit
          </button>
        </section>

        <section>
          <ul>
            {/* {mode == 'theaters' && data.theaters.map(t => (
              <li key={t.id}>
                {t.name}
              </li>
            ))} */}
            {mode == 'movies' && data.movies.map(m => (
              <li key={m.tmsId}>
                <MovieView movie={m} data={data} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
