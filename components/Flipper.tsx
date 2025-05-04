'use client'

import React, { useState, ReactNode } from 'react'

export interface FlipperProps {
    children: [ReactNode, ReactNode]
}

export default function Flipper(props: FlipperProps) {

    const centeringClass = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    const [flipClass, setFlipClass] = useState<string>("");

    function flip(): void {
        setFlipClass(flipClass == "" ? "rotate-y-180" : "");
    }

    return (
        <div id="container" onClick={flip} className={`${centeringClass} perspective-distant cursor-pointer`}>

            <div id="flipper" className={`${flipClass} transform-3d duration-[1s] transition-transform`}>

                <div id="front" className={`${centeringClass} backface-hidden`}>
                    {props.children[0]}
                </div>

                <div id="back" className={`${centeringClass} rotate-y-180 backface-hidden`}>
                    {props.children[1]}
                </div>

            </div>
        </div>
    )
}
