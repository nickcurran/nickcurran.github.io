import { ReactElement } from 'react'
import Link from 'next/link'

import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin']
})
export default function Home (): ReactElement {
  const title = 'Taking Care of Business'

  return (
    <h1 id='banner' className={outfit.className}>
      <Link href='/about' className='grow-0'>
        {title.split(' ').map((word, i) =>
          <div key={i++}>{word}</div>
        )}
      </Link>
    </h1>
  )
}
