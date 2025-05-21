'use client'

import { useState } from "react"
import Titles from "@/data/Titles.json"
import { Outfit } from "next/font/google"
import Link from "next/link";

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
        <h1 onClick={onClick} className={`${outfit.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] leading-[85%]`}>
            <Link href="/welcome">
                {title.split(" ").map((word, i) =>
                    <div key={i++}>{word}</div>
                )}
            </Link>
        </h1>
    )
}
