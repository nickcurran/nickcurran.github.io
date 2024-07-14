import React from "react"
import Titles from "./Titles.json"

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
  
function Banner() {
    const index = getRandomInt(Titles.length)
    const title = Titles[index]

    return (
        <div id="banner">
            {title.split(" ").map((title) => 
                <div>{title}</div>
            )}
        </div>
    )
}

export default Banner
