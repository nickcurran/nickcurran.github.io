import Flipper from "@/components/Flipper";
import About from '@/components/About'
import Banner from "@/components/Banner";

export default function Home() {
    return (
        <Flipper>
            <Banner />
            <About />
        </Flipper>
    );
}
