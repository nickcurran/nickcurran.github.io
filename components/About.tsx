'use client'

import { MouseEvent } from "react";
import { Outfit } from "next/font/google";
import BlueSky from "@/components/icons/BlueSky";
import Instagram from "@/components/icons/Instagram";
import Facebook from "@/components/icons/Facebook";
import LinkedIn from "./icons/LinkedIn";

const outfit = Outfit({
    weight: ["700"],
    subsets: ["latin"],
});

const socials = [
    {
        name: "BlueSky",
        url: "https://bsky.app/profile/nickcurran.bsky.social",
        icon: <BlueSky />
    },
    {
        name: "Instagram",
        url: "https://instagram.com/nickcurran",
        icon: <Instagram />
    },
    {
        name: "Facebook",
        url: "https://facebook.com/nickcurran",
        icon: <Facebook />
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nickcurran/",
        icon: <LinkedIn />
    }
]

export default function About() {

    function linkClicked(event: MouseEvent<HTMLAnchorElement>) {
        event.stopPropagation()
    }

    return (
        <div>
            <h1 className={`${outfit.className} text-[12vw] text-nowrap`}>Nick Curran</h1>

            <div className="flex flex-row justify-between pl-1 pr-1">
                {socials.map(social =>
                    <a key={social.name} onClick={linkClicked} href={social.url} target="_blank" rel="noopener noreferrer">
                        {social.icon}
                    </a>
                )}
            </div>
        </div>
    )
}