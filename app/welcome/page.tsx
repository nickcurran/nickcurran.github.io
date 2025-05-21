'use client'

import { MouseEvent, ReactElement } from 'react'
import { Outfit } from 'next/font/google'
import Icon from '@/components/Icon'
import Link from 'next/link'

const outfit = Outfit({
  weight: ['700'],
  subsets: ['latin']
})

const socials = [
  {
    name: 'BlueSky',
    url: 'https://bsky.app/profile/nickcurran.bsky.social',
    icon: <Icon name='bluesky' alt='BlueSky' />
  },
  {
    name: 'Letterboxd',
    url: 'https://letterboxd.com/AlmostNico/',
    icon: <Icon name='letterboxd' alt='Letterboxd' />
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/nickcurran',
    icon: <Icon name='instagram' alt='Instagram' />
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/nickcurran',
    icon: <Icon name='facebook' alt='Facebook' />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nickcurran/',
    icon: <Icon name='linkedin' alt='LinkedIn' />
  }
]

export default function About (): ReactElement {
  function linkClicked (event: MouseEvent<HTMLAnchorElement>): void {
    event.stopPropagation()
  }

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <h1 className={`${outfit.className} text-[12vw] text-nowrap`}><Link href='/'>Nick Curran</Link></h1>

      <p className='max-w-[600px] m-auto pb-5'>
        Greetings! Thanks for visiting tcob.com; I&apos;m Nick. I
        like <a onClick={linkClicked} href='https://photos.tcob.com' target='_blank' rel='noreferrer'>photography</a> and <a onClick={linkClicked} href='http://movies.tcob.com' target='_blank' rel='noreferrer'>movies</a>
        , travel and pickleball.
      </p>

      <p className='max-w-[600px] m-auto pb-15'>
        My socials are below. The <a onClick={linkClicked} href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer'>OnlyFans page</a> is still in progress. In the meantime, here are some other pages: <Link onClick={linkClicked} target='_blank' href='/about'>about this site</Link>, the <Link onClick={linkClicked} target='_blank' href='/tray'>tray story</Link>, and my <Link onClick={linkClicked} target='_blank' href='/prk'>PRK experience</Link>.
      </p>

      <div className='flex flex-row justify-between pl-1 pr-1'>
        {socials.map(social =>
          <a key={social.name} onClick={linkClicked} href={social.url} target='_blank' rel='noopener noreferrer'>
            {social.icon}
          </a>
        )}
      </div>
    </div>
  )
}
