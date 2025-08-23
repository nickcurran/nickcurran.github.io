'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'

import { getData } from './service'
import { Data, Filters } from './movieTypes'
import MovieView from './movieView'
import Menu from '@/components/Menu'
import { TheaterView } from './theaterView'

export default function MoviesPage(): React.ReactElement {
  const [zipCode, setZipCode] = useState('')
  const [radius, setRadius] = useState('10')
  const [mode, setMode] = useState('movies')
  const [data, setData] = useState<Data>({ movies: [], theaters: [], showtimes: [] })
  const [filters, setFilters] = useState<Filters>({ movies: [], theaters: [] })

  async function fetchData(): Promise<void> {
    if (zipCode.length === 5) { // Only fetch data if zip code is valid
      const data = await getData(zipCode, radius)
      setData(data)
    }
  }

  useEffect(() => {
    const storedZipCode = localStorage.getItem('zipCode')
    const storedRadius = localStorage.getItem('radius')
    const storedMode = localStorage.getItem('mode')
    const storedFilters = localStorage.getItem('filters')

    if (storedMode !== null) {
      setMode(storedMode)
    }
    if (storedZipCode !== null) {
      setZipCode(storedZipCode)
    }
    if (storedRadius !== null) {
      setRadius(storedRadius)
    }
    if (storedFilters !== null) {
      setFilters(JSON.parse(storedFilters))
    }
  }, [])

  useEffect(() => {
    void fetchData()
  }, [zipCode, radius]) // Add dependency array to avoid running on every render

  function zipCodeChange(event: ChangeEvent<HTMLInputElement>): void {
    const newZipCode = event.target.value
    setZipCode(newZipCode)
    localStorage.setItem('zipCode', newZipCode) // Save zip code to local storage
  }

  function radiusChange(event: ChangeEvent<HTMLSelectElement>): void {
    const newRadius = event.target.value
    setRadius(newRadius)
    localStorage.setItem('radius', newRadius) // Save radius to local storage
  }

  function modeChange(event: ChangeEvent<HTMLSelectElement>): void {
    const newMode = event.target.value
    setMode(newMode)
    localStorage.setItem('mode', newMode) // Save mode to local storage
  }

  function saveFilters(newFilters: Filters): void {
    localStorage.setItem('filters', JSON.stringify(newFilters))
  }

  function filterMovie(tmsId: string): void {
    const newFilters = { ...filters, movies: [...filters.movies, tmsId] }
    setFilters(newFilters)
    saveFilters(newFilters)
  }

  function filterTheater(theaterId: string): void {
    const newFilters = { ...filters, theaters: [...filters.theaters, theaterId] }
    setFilters(newFilters)
    saveFilters(newFilters)
  }

  function clearFilters(): void {
    setFilters({ movies: [], theaters: [] })
    saveFilters({ movies: [], theaters: [] })
  }

  const theaters = data.theaters
  const movies = data.movies.filter(m => !filters.movies.includes(m.tmsId))
  const isFiltered = filters.movies.length > 0 || filters.theaters.length > 0

  return (
    <div className='max-w-[800px] w-full flex-1'>
      <Menu />
      <div className='flex-1 ms-5 me-5 mt-[2rem]'>
        <h1 className='text-[2.5rem]'>Movie Showtimes</h1>

        <section className='mt-2'>
          <input
            type='text'
            data-1p-ignore
            value={zipCode}
            onChange={zipCodeChange}
            placeholder='zip code'
            className='border border-gray-300 rounded-md w-[100px] p-2 mb-4 text-center'
          />

          <select value={radius} onChange={radiusChange} className='ml-4'>
            <option value='5'>5 miles</option>
            <option value='10'>10 miles</option>
            <option value='15'>15 miles</option>
            <option value='20'>20 miles</option>
            <option value='25'>25 miles</option>
          </select>

          <select value={mode} onChange={modeChange} className='ml-4'>
            <option value='movies'>Movies</option>
            <option value='theaters'>Theaters</option>
          </select>

          {isFiltered && (
            <button onClick={clearFilters} className='ml-4'>Clear Filters</button>
          )}
        </section>

        <section>
          <ul>
            {mode === 'theaters' && theaters.map(t => (
              <TheaterView
                key={t.id}
                theater={t}
                data={data}
                // filters={filters}
                // onFilterMovie={filterMovie}
                // onFilterTheater={filterTheater}
                 />
            ))}
            {mode === 'movies' && movies.map(m => (
              <MovieView
                key={m.tmsId}
                movie={m}
                data={data}
                filters={filters}
                onFilterMovie={filterMovie}
                onFilterTheater={filterTheater} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
