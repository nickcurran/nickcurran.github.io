import Link from 'next/link'
import { ReactElement } from 'react'
import Icon from './Icon'

const items = [
  { name: 'TCOB', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Photos', href: 'https://photos.tcob.com' }
]

const socials = [
  {
    name: 'BlueSky',
    url: 'https://bsky.app/profile/nickcurran.bsky.social',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/nickcurran',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/nickcurran',
  },
  {
    name: 'Letterboxd',
    url: 'https://letterboxd.com/AlmostNico/',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nickcurran/',
  }
]

export default function Menu (): ReactElement {
  return (
    <div id='menu' className='flex items-center m-5'>
      <ul className='flex flex-1 space-x-2.5'>
        {items.map(item => (
          <li key={item.name}>
            <Link href={item.href}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul className='flex space-x-2.5'>
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
