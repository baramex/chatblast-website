import { useState } from 'react'
import { Container } from '../Misc/Container'
import { Button } from '../Misc/Button'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { TextAreaField, TextField } from '../Misc/Fields'

export default function Contact() {
    const [agreed, setAgreed] = useState(false)

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
                            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Adresse email"
                                    type='email'
                                    autoComplete="email"
                                    className='sm:col-span-2'
                                    required
                                />
                                <TextField
                                    id="subject"
                                    name="subject"
                                    label="Sujet"
                                    type='text'
                                    autoComplete="off"
                                    className='sm:col-span-2'
                                    required
                                />
                                <TextAreaField
                                    id="message"
                                    label="Message"
                                    name="message"
                                    rows={4}
                                    className="sm:col-span-2"
                                    defaultValue={''}
                                    autoComplete="off"
                                    maxLength={512}
                                    required
                                />
                                <div className="sm:col-span-2">
                                    <Button
                                        type="submit"
                                        variant="solid"
                                        color="emerald"
                                        className="w-full py-3.5"
                                    >
                                        Envoyer <EnvelopeIcon className='ml-2 stroke-2 stroke-current' width="20" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}