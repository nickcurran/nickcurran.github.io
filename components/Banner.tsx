'use client'

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
    const index = getRandomInt(Titles.titles.length)
    const title = Titles.titles[index]
    const words = title.split(" ")

    return (
        <div className={`${outfit.className} text-[15vw] leading-[85%]`}>
            {words.map((word, i) =>
                <div key={i++}>{word}</div>
            )}
        </div>
    )
}