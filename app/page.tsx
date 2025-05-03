import Flipper from "@/components/Flipper";
import Banner from '@/components/Banner'
import About from '@/components/About'

export default function Home() {
    return (
        <Flipper>
            <Banner />
            <About />
        </Flipper>
    );
}
