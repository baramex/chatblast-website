import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";
import { About } from "./About";
import { CallToAction } from "./CallToAction";
import Contact from "./Contact";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { PrimaryFeatures } from "./PrimaryFeatures";
import { SecondaryFeatures } from "./SecondaryFeatures";

export default function Home(props) {
    return (
        <>
            <Header {...props} />
            <main>
                <Hero />
                <PrimaryFeatures />
                <SecondaryFeatures />
                <CallToAction />
                <About />
                <Pricing user={props.user} />
                <Contact user={props.user} />
            </main>
            <Footer />
        </>
    )
}
