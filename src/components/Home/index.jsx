import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";
import { CallToAction } from "./CallToAction";
import { Faqs } from "./Faqs";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";
import { PrimaryFeatures } from "./PrimaryFeatures";
import { SecondaryFeatures } from "./SecondaryFeatures";
import { Testimonials } from "./Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
