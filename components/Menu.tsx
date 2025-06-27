'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement, useState } from 'react'
import Icon from './Icon'

import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin']
})

const items = [
  { name: 'TCOB', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Photos', href: '/photos' },
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div id='menu' className={`relative flex flex-col sm:flex-row items-center m-5 ${outfit.className}`}>
      {/* Hamburger for mobile */}
      <div className="block sm:hidden absolute z-30">
        <button
          aria-label="Open menu"
          className="p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h20M4 14h20M4 20h20"/>
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 bg-white rounded-lg shadow-lg p-4 z-40 min-w-[220px] w-max">
            <ul className="flex flex-row space-x-4 justify-center mb-4">
              {items.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className={`${pathname === item.href ? 'border-b-4' : ''}`} onClick={() => setMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-row space-x-6 justify-center">
              {socials.map(social => (
                <li key={social.name}>
                  <Link href={social.url} target='_blank' rel='noopener noreferrer' className='social' onClick={() => setMenuOpen(false)}>
                    <Icon name={social.name.toLowerCase()} alt={social.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Desktop layout */}
      <div className='flex-1 w-full sm:w-auto hidden sm:block'>
        <ul className='flex flex-row flex-1 space-x-3.5'>
          {items.map(item => (
            <li key={item.name}>
              <Link href={item.href} className={`${pathname === item.href ? 'border-b-4' : ''}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-none w-full sm:w-auto sm:ml-6 hidden sm:block'>
        <ul className='flex flex-row space-x-3.5'>
          {socials.map(social => (
            <li key={social.name}>
              <Link href={social.url} target='_blank' rel='noopener noreferrer' className='social'>
                <Icon name={social.name.toLowerCase()} alt={social.name} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
