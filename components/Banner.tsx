'use client'

import { useState, useEffect, ReactElement } from 'react'
import { titles } from '@/data/Titles.json'
import { Outfit } from 'next/font/google'
import Link from 'next/link'

const outfit = Outfit({
  weight: ['700'],
  subsets: ['latin']
})

function getRandomInt (max: number): number {
  return Math.floor(Math.random() * max)
}

function pickTitleIndex (): number {
  if (localStorage.getItem('lastTitleIndex') === null) {
    return 0
  }

  return getRandomInt(titles.length - 1)
}

function pickTitle (): string {
  const index = pickTitleIndex()
  const title = titles[index]
  localStorage.setItem('lastTitleIndex', index.toString())
  return title
}

export default function Banner (): ReactElement {
  const [title, setTitle] = useState('')

  useEffect(() => {
    const title = pickTitle()
    setTitle(title)
  }, [])

  return (
    <h1 className={`${outfit.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] leading-[85%]`}>
      <Link href='/links'>
        {title.split(' ').map((word, i) =>
          <div key={i++}>{word}</div>
        )}
      </Link>
    </h1>
  )
}
