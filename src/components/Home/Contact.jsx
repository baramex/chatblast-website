import { Container } from '../Misc/Container'
import { ContactForm } from '../Misc/Forms'

export default function Contact({ user }) {
    return (
        <section
            id="contact"
            aria-label="Contactez-nous"
            className="bg-gray-50 py-20 sm:py-32"
        >
            <Container>
                <div className="relative mx-auto max-w-2xl">
                    <svg className="absolute top-0 left-0 -mt-14 hidden md:block -ml-20" width="280" height="220" fill="none" viewBox="0 0 280 220" aria-hidden="true">
                        <rect width="280" height="220" fill="url(#1)" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 -mb-16 hidden md:block -mr-16" width="280" height="220" fill="none" viewBox="0 0 280 220" aria-hidden="true">
                        <rect width="280" height="220" fill="url(#2)" />
                    </svg>

                    <div className="relative bg-gray-50 py-6 px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contactez-nous</h2>
                            <p className="mt-4 text-lg leading-6 text-gray-500">
                                Une question ou une proposition ? Nous sommes là pour vous aider.
                            </p>
                        </div>
                        <div className="mt-12">
                            <ContactForm user={user} />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}