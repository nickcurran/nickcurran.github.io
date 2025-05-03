'use client'

import { useState } from "react"
import Titles from "@/data/Titles.json"
import { Outfit } from "next/font/google"

const outfit = Outfit({
    weight: ["700"],
    subsets: ["latin"],
});

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default function Banner() {
    const [title, setTitle] = useState<string>(Titles.titles[0])

    function onClick() {
        const newIndex = getRandomInt(Titles.titles.length - 1)
        const newTitle = Titles.titles.filter(t => t != title)[newIndex]

        // Set after the animation ends, its duration is 1s
        setTimeout(() => setTitle(newTitle), 1100)
    }

    return (
        <div onClick={onClick} className={`${outfit.className} text-[15vw] leading-[85%]`}>
            {title.split(" ").map((word, i) =>
                <div key={i++}>{word}</div>
            )}
        </div>
    )
}
