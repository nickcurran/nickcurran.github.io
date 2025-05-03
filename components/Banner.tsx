'use client'

import React, { useState } from 'react'
import Titles from "@/data/Titles.json"
import { Outfit } from "next/font/google";

const outfit = Outfit({
    weight: ["700"],
    subsets: ["latin"],
});

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default function Banner() {

    const [isFlipped, setIsFlipped] = useState(false)

    const index = getRandomInt(Titles.titles.length)
    const title = Titles.titles[index]
    const words = title.split(" ")

    const handleClick = () => {
        setIsFlipped(!isFlipped)
        const front = document.getElementById("banner")
        if (front) {
            front.classList.toggle("rotate-y-180")
        }
    }

    return (
        <div id="container" onClick={handleClick} className='absolute perspective-distant top-1/2 left-1/2 bg-red-500 -translate-x-1/2 -translate-y-1/2'>
            <div id="banner" className={`transform-3d duration-[1s] transition-transform ${outfit.className} bg-green-500 text-[15vw] leading-[85%]`}>

                <div id="front" className="bg-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backface-hidden">
                    {words.map((word, i) =>
                        <div key={i++} className='bg-blue-500'>{word}</div>
                    )}
                </div>
                <div id="back" className="bg-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-y-180 backface-hidden">
                    {words.map((word, i) =>
                        <div key={i++} className='bg-pink-500'>{word}</div>
                    )}
                </div>

            </div>
        </div>
    )
}
