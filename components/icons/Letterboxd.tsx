import Image from 'next/image'

// This image was from them: https://letterboxd.com/about/brand/
export default function Letterboxd() {
    return (
        <Image src="/letterboxd.svg" alt="Letterboxd" width={32} height={32} className="inline-block" style={{ verticalAlign: "middle" }} />
    )
}