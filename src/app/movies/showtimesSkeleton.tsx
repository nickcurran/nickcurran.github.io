import { ReactElement } from 'react'

interface ShowtimesSkeletonProps {
  mode: string
}

const PLACEHOLDER_ITEMS = [
  { rows: 2, showtimes: 4 },
  { rows: 1, showtimes: 3 },
  { rows: 2, showtimes: 5 }
]

export default function ShowtimesSkeleton ({ mode }: ShowtimesSkeletonProps): ReactElement {
  return (
    <>
      {PLACEHOLDER_ITEMS.map((item, i) => (
        <li key={i} className={mode === 'movies' ? 'pt-2 mb-12 clear-both' : 'flex-1 mb-10 pt-2'}>
          {mode === 'movies' && (
            <div className='skeleton mb-12 rounded-md float-right clear-both ml-8 w-[160px] h-[240px]' />
          )}

          <div className='skeleton h-8 w-2/3 mb-3' />

          {mode === 'movies' && (
            <>
              <div className='skeleton h-4 w-full mb-2' />
              <div className='skeleton h-4 w-5/6 mb-4' />
            </>
          )}

          <ul>
            {Array.from({ length: item.rows }).map((_, j) => (
              <li key={j} className='mt-2'>
                <div className='skeleton h-6 w-1/3 mb-2' />
                <div>
                  {Array.from({ length: item.showtimes }).map((__, k) => (
                    <span key={k} className='skeleton inline-block h-6 w-14 mr-4 mb-2 align-middle' />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </>
  )
}
