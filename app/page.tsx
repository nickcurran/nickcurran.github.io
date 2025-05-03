'use client'

import dynamic from 'next/dynamic'

import Flipper from "@/components/Flipper";
import About from '@/components/About'

// Prevents visual glitch on load if server side and client side
// random title are different
// https://nextjs.org/docs/app/guides/lazy-loading#skipping-ssr
const Banner = dynamic(() => import('@/components/Banner'), { ssr: false })

export default function Home() {
    return (
        <Flipper>
            <Banner />
            <About />
        </Flipper>
    );
}
