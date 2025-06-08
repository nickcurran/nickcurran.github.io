import type { Metadata } from 'next'
import './globals.css'
import Link
  from 'next/link'
import { ReactElement } from 'react'

export const metadata: Metadata = {
  title: 'Nick Curran',
  description: 'Taking Care of Business, the home page of Nick Curran'
}

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout (props: Readonly<LayoutProps>): ReactElement {
  return (
    <html lang='en'>
      <body>
        <div className='flex items-center justify-center flex-col min-h-screen'>
          <main className='flex w-full items-center justify-center flex-col flex-1'>
            {props.children}
          </main>

          <footer className='w-full p-5 text-center text-xs'>
            <div className='flex justify-between text-gray-300 dark:text-gray-700'>
              <div className=''>© 2025 <Link href='/'>Nick Curran</Link></div>
              <div>Icons by <a href='https://icons8.com' target='_blank' rel='noopener noreferrer'>Icon8</a></div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
