import { ReactElement } from 'react'
import Link from 'next/link'

export default function Home(): ReactElement {
  const title = 'Taking Care of Business'

  return (
    <h1 id='banner'>
      <Link href='/about' className='grow-0'>
        {title.split(' ').map((word, i) =>
          <div key={i++}>{word}</div>
        )}
      </Link>
    </h1>
  )
}
