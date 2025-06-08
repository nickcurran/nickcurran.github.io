'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'
import Icon from './Icon'

const items = [
  { name: 'TCOB', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Photos', href: 'https://photos.tcob.com' },
  { name: 'Movies', href: '/movies' }
]

const socials = [
  {
    name: 'BlueSky',
    url: 'https://bsky.app/profile/nickcurran.bsky.social'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/nickcurran'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/nickcurran'
  },
  {
    name: 'Letterboxd',
    url: 'https://letterboxd.com/AlmostNico/'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nickcurran/'
  }
]

export default function Menu (): ReactElement {

  const pathname = usePathname()

  return (
    <div id='menu' className='flex items-center m-5'>
      <ul className='flex flex-1 space-x-2'>
        {items.map(item => (
          <li key={item.name}>
            <Link href={item.href} className={`${ pathname === item.href ? 'border-b-4' : ''}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul className='flex space-x-1.5'>
        {socials.map(social => (
          <li key={social.name}>
            <Link href={social.url} target='_blank' rel='noopener noreferrer' className='social'>
              <Icon name={social.name.toLowerCase()} alt={social.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
