import { useState } from 'react'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { Container } from '../Misc/Container'

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
                    <svg className="absolute bottom-0 right-0 -mb-16 hidden md:block -mr-28" width="280" height="220" fill="none" viewBox="0 0 280 220" aria-hidden="true">
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
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Sujet
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            defaultValue={''}
                                            autoComplete="off"
                                            maxLength={512}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}