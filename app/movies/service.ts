import moment from 'moment'

import { Movie, Theater, Showtime, RawMovie, RawShowtime, Data } from './movieTypes'

const api: string = 'https://data.tmsapi.com/v1.1/movies/showings'
const apiKey: string = '6vb58mje68k3z6gavqfkmtfe'

function timeString (dateTime: string): string {
  return moment(dateTime).format('h:mm a')
}

function comparableTitle (title: string): string {
  if (title.startsWith('The ')) {
    return title.substring(4).trim() // Remove "The " from the start for sorting
  }

  if (title.startsWith('A ')) {
    return title.substring(2).trim() // Remove "A " from the start for sorting
  }

  if (title.startsWith('An ')) {
    return title.substring(3).trim() // Remove "An " from the start for sorting
  }

  return title
}

function titleSort (a: Movie, b: Movie): number {
  const aTitle = comparableTitle(a.title)
  const bTitle = comparableTitle(b.title)
  return aTitle.localeCompare(bTitle)
}

function convertMovie (raw: RawMovie): Movie {
  return {
    tmsId: raw.tmsId,
    rootId: raw.rootId,
    sportsId: raw.sportsId ?? '',
    subType: raw.subType,
    title: raw.title,
    releaseYear: raw.releaseYear,
    releaseDate: raw.releaseDate,
    titleLang: raw.titleLang,
    descriptionLang: raw.descriptionLang,
    entityType: raw.entityType,
    genres: raw.genres ?? [],
    longDescription: raw.longDescription ?? '',
    shortDescription: raw.shortDescription ?? '',
    topCast: raw.topCast ?? [],
    directors: raw.directors ?? [],
    officialUrl: raw.officialUrl ?? '',
    qualityRating: raw.qualityRating ?? undefined,
    ratings: raw.ratings ?? [],
    advisories: raw.advisories ?? [],
    runTime: raw.runTime ?? '',
    preferredImage: raw.preferredImage
  }
}

function processData (rawData: RawMovie[]): Data {
  const rawMovies = rawData.sort(titleSort)
  const movies: Movie[] = rawMovies.map(convertMovie)
  const showtimes: Showtime[] = []
  const theaters: Theater[] = []

  rawMovies.forEach(rm => {
    rm.showtimes.forEach((s: RawShowtime) => {
      showtimes.push({
        theatreId: s.theatre.id,
        movieId: rm.tmsId,
        dateTime: s.dateTime,
        time: timeString(s.dateTime),
        quals: s.quals ?? '',
        barg: s.barg,
        ticketURI: s.ticketURI ?? ''
      })

      if (theaters.find(t => t.id === s.theatre.id) == null) {
        theaters.push({
          id: s.theatre.id,
          name: s.theatre.name
        })
      }
    })
  })

  return {
    movies,
    theaters: [...theaters].sort((a, b) => a.name.localeCompare(b.name)),
    showtimes
  }
}

export async function getData (zipCode: string, radius: string): Promise<Data> {
  const date = new Date()
  const dateParam = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const paramString = `startDate=${dateParam}&zip=${zipCode}&radius=${radius}`

  const stored = localStorage.getItem(paramString) ?? ''

  if (stored.length > 0) {
    return JSON.parse(stored) as Data
  }

  const moviesUrl = `${api}?startDate=${dateParam}&zip=${zipCode}&radius=${radius}&api_key=${apiKey}`

  const result = await fetch(moviesUrl)
  const rawData: RawMovie[] = await result.json()

  const data = processData(rawData)
  localStorage.setItem(paramString, JSON.stringify(data))
  return data
}
