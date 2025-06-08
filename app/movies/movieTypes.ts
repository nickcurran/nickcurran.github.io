export interface RawMovie {
  tmsId: string
  rootId: string
  sportsId?: string
  subType: string
  title: string
  releaseYear: number
  releaseDate: string
  titleLang: string
  descriptionLang: string
  entityType: string
  genres: string[]
  longDescription: string
  shortDescription: string
  topCast?: string[]
  directors?: string[]
  officialUrl?: string
  qualityRating?: {
    ratingsBody: string
    value: string
  }
  ratings?: Array<{
    body: string
    code: string
  }>
  advisories?: string[]
  runTime: string
  preferredImage: {
    width?: string
    height?: string
    uri: string
    category?: string
    text?: string
    primary?: string
  }
  animation?: string
  showtimes: RawShowtime[]
}

export interface RawShowtime {
  theatre: Theater
  dateTime: string
  quals?: string
  barg: boolean
  ticketURI?: string
}

export interface Movie {
  tmsId: string
  rootId: string
  sportsId?: string
  subType: string
  title: string
  releaseYear: number
  releaseDate: string
  titleLang: string
  descriptionLang: string
  entityType: string
  genres: string[]
  longDescription: string
  shortDescription: string
  topCast?: string[]
  directors?: string[]
  officialUrl?: string
  qualityRating?: {
    ratingsBody: string
    value: string
  }
  ratings?: Array<{
    body: string
    code: string
  }>
  advisories?: string[]
  runTime: string
  preferredImage: {
    width?: string
    height?: string
    uri: string
    category?: string
    text?: string
    primary?: string
  }
}

export interface Theater {
  id: string
  name: string
}

export interface Showtime {
  theatreId: string
  movieId: string
  dateTime: string
  time: string
  quals?: string
  barg: boolean
  ticketURI?: string
}

export interface Data {
  movies: Movie[]
  theaters: Theater[]
  showtimes: Showtime[]
}
