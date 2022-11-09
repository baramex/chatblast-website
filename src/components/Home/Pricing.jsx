import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'

import { Button } from '../Misc/Button'
import CheckoutModal from '../Misc/Checkout'
import { Container } from '../Misc/Container'

function SwirlyDoodle({ className }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 281 40"
            className={className}
            preserveAspectRatio="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
            />
        </svg>
    )
}

function Plan({ name, price, description, href, to, onClick, button, features, excludes, featured = false }) {
    return (
        <section
            className={clsx(
                'flex flex-col rounded-3xl px-6 sm:px-8',
                featured ? 'order-first bg-emerald-600 py-8 lg:order-none shadow-lg shadow-emerald-900/50' : 'py-8 shadow-lg'
            )}
        >
            <h3 className="mt-5 font-display text-lg text-white">{name}</h3>
            <p
                className={clsx(
                    'mt-2 text-base',
                    featured ? 'text-white' : 'text-gray-400'
                )}
            >
                {description}
            </p>
            <p className="order-first font-display text-white">
                <span className="text-5xl font-light tracking-tight">{price}</span>
                <span className="ml-1 text-lg text-gray-100">/mois</span>
            </p>
            <ul
                role="list"
                className={clsx(
                    'order-last mt-10 flex flex-col gap-y-3 text-sm',
                    featured ? 'text-white' : 'text-gray-200'
                )}
            >
                {features.map((feature) => (
                    <li key={feature} className="flex">
                        <CheckCircleIcon className={clsx(featured ? 'text-white' : 'text-gray-400', "h-6 w-6 flex-none stroke-current")} />
                        <span className="ml-4">{feature}</span>
                    </li>
                ))}
            </ul>
            {excludes &&
                <ul
                    role="list"
                    className={clsx(
                        'order-last mt-5 flex flex-col gap-y-3 text-sm',
                        featured ? 'text-white' : 'text-red-100'
                    )}
                >
                    {excludes.map((exclude) => (
                        <li key={exclude} className="flex">
                            <XCircleIcon className={clsx(featured ? 'text-white' : 'text-red-100', "h-6 w-6 flex-none stroke-current")} />
                            <span className="ml-4">{exclude}</span>
                        </li>
                    ))}
                </ul>
            }
            <Button
                href={href}
                to={to}
                onClick={onClick}
                variant={featured ? 'solid' : 'outline'}
                color="white"
                className="mt-8"
                aria-label={button || `Commencez avec le plan ${name} pour ${price}/mois`}
            >
                {button || "Commencer"}
            </Button>
        </section>
    )
}

export function Pricing(props) {
    const [showCheckout, setShowCheckout] = useState(true);

    return (<>
        <CheckoutModal {...props} open={showCheckout} onClose={() => setShowCheckout(false)} />
        <section
            id="pricing"
            aria-label="Tarifs"
            className="bg-gray-900 py-20 sm:py-32"
        >
            <Container maxWidth="max-w-[115rem]">
                <div className="md:text-center">
                    <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                        <span className="relative whitespace-nowrap">
                            <SwirlyDoodle className="absolute top-1/2 left-0 h-[1em] w-full fill-emerald-400" />
                            <span className="relative">Prix adaptés</span>
                        </span>{' '}
                        à la taille de votre projet
                    </h2>
                    <p className="my-4 text-lg text-gray-400">
                        Peu importe le trafic qu'a votre site, nous avons un plan pour vous.
                    </p>
                    <Button className="mt-4" color='emerald'>Tester le trafic de mon site</Button>
                </div>
                <div className="mt-12 flex flex-wrap justify-center [&>*]:flex-[0_0_100%] md:[&>*]:flex-[0_0_calc(50%-20px)] xl:[&>*]:flex-[0_0_calc(25%-30px)] max-w-2xl gap-y-10 mx-auto md:max-w-none xl:mx-0 gap-x-10">
                    <Plan
                        name="Starter"
                        price="7,95 €"
                        description="Bien pour tester le produit sur un petit site avec peu de trafic."
                        to="/register"
                        features={[
                            'Badge profil client',
                            'Pour 1 site',
                            "De 0 à 1000 visiteurs uniques par mois",
                            'Authentification anonyme'
                        ]}
                        excludes={["Authentification custom"]}
                    />
                    <Plan
                        featured
                        name="Classic"
                        price="12,95 €"
                        description="Parfait pour un site en croissance."
                        to="/register"
                        features={[
                            "Essai gratuit de 7 jours",
                            'Badge profil client',
                            'Pour 1 site',
                            "De 1000 à 10'000 visiteurs uniques par mois",
                            'Authentification anonyme',
                        ]}
                        excludes={["Authentification custom"]}
                    />
                    <Plan
                        name="Avancé"
                        price="18,95 €"
                        description="Pour un gros projet et un site à fort trafic."
                        to="/register"
                        features={[
                            "Essai gratuit de 7 jours",
                            'Badge profil client',
                            'Pour 1 site',
                            "10'000-100'000 visiteurs uniques par mois",
                            'Authentification anonyme et/ou custom',
                        ]}
                    /><Plan
                        name="Custom"
                        price="?? €"
                        description="Créez votre plan personnalisé pour les plus grands projets."
                        href="#contact"
                        button="Contactez-nous"
                        features={[
                            'Badge profil personnalisé',
                            'Pour ?? sites',
                            "Trafic ??"
                        ]}
                    />
                </div>
            </Container>
        </section>
    </>)
}
