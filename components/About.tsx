import { Outfit } from "next/font/google";

const outfit = Outfit({
    weight: ["700"],
    subsets: ["latin"],
});

export default function About() {
    return (
        <div>
            <h1 className={`${outfit.className} text-[12vw] text-nowrap`}>Nick Curran</h1>

            <div className="flex flex-row justify-between">
                <a href="https://bsky.app/profile/nickcurran.bsky.social" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M18.231,3.618c-2.312,1.736-4.785,5.107-5.948,7.244c-0.123,0.226-0.444,0.226-0.567,0	c-1.163-2.137-3.636-5.508-5.948-7.244C3.949,2.252,1,1.195,1,4.559c0,0.672,0.385,5.643,0.611,6.451	c0.606,2.169,2.454,3.089,4.437,3.195c0.19,0.01,0.222,0.261,0.043,0.324c-2.988,1.048-3.518,3.196-1.424,5.344	c3.826,3.894,5.814,0.647,6.733-1.514c0.224-0.525,0.977-0.525,1.2,0c0.92,2.161,2.907,5.408,6.733,1.514	c2.093-2.148,1.564-4.296-1.424-5.344c-0.179-0.063-0.146-0.313,0.043-0.324c1.983-0.106,3.83-1.026,4.437-3.195	C22.615,10.203,23,5.231,23,4.559C23,1.195,20.051,2.252,18.231,3.618z"></path>
                    </svg>
                </a>

                <a href="https://instagram.com/nickcurran" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 50 50">
                        <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                    </svg>
                </a>

                <a href="https://facebook.com/nickcurran" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 50 50">
                        <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                    </svg>
                </a>

                <a href="https://www.linkedin.com/in/nickcurran/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 50 50">
                        <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                    </svg>
                </a>
            </div>

        </div>
    )
}