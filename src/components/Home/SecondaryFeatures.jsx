import { useId } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '../Misc/Container'
import screenshotInventory from '../../images/screenshots/inventory.png'
import screenshotProfitLoss from '../../images/screenshots/profit-loss.png'

const features = [
    {
        name: 'Authentification',
        summary: "Choississez la rapidité ou l'authenticité.",
        description:
            "L'authentification anonyme permet d'identifier directement les visiteurs de votre site, mais leur permette aussi de créer un compte sur ChatBlast afin d'avoir un profil utilisateur. L'authentification customisée permet d'utiliser le profil utilisateur du membre connecté sur votre site pour l'authentifier sur ChatBlast.",
        image: screenshotProfitLoss,
        icon: function ReportingIcon() {
            let id = useId();
            return (
                <>
                    <defs>
                        <linearGradient
                            id={id}
                            x1="7"
                            x2="36"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset=".194" stopColor="#fff" />
                            <stop offset={1} stopColor="#ffffff00" />
                        </linearGradient>
                    </defs>
                    <path d="M 24.887 17.8722 v 6.9426 c 0 0.3222 -0.1134 0.5958 -0.3384 0.8208 S 24.05 25.9722 23.7278 25.9722 H 12.1592 c -0.3222 0 -0.5958 -0.1134 -0.8208 -0.3384 S 11 25.1352 11 24.8148 V 17.8722 c 0 -0.3222 0.1134 -0.594 0.3384 -0.8208 c 0.225 -0.225 0.4986 -0.3384 0.8208 -0.3384 h 0.3852 V 14.4 c 0 -1.4778 0.531 -2.7486 1.5912 -3.8088 C 15.1958 9.531 16.4648 9 17.9426 9 s 2.7468 0.531 3.8088 1.5912 C 22.8134 11.6514 23.3426 12.9222 23.3426 14.4 v 2.3148 h 0.3852 c 0.3222 0 0.5958 0.1134 0.8208 0.3384 C 24.7736 17.2782 24.887 17.55 24.887 17.8722 z M 14.8592 16.7148 h 6.1704 V 14.4 c 0 -0.8514 -0.3006 -1.5786 -0.9036 -2.1816 S 18.794 11.3148 17.9426 11.3148 c -0.8532 0 -1.5786 0.3006 -2.1816 0.9036 S 14.8592 13.5486 14.8592 14.4 V 16.7148 z M 19.487 19.8 c 0 -0.4248 -0.1512 -0.7884 -0.4518 -1.0908 c -0.3024 -0.3006 -0.666 -0.4518 -1.0908 -0.4518 S 17.1542 18.4086 16.8518 18.7092 C 16.5512 19.0116 16.4 19.3752 16.4 19.8 c 0 0.2988 0.0774 0.567 0.2304 0.8082 c 0.1512 0.2412 0.3564 0.4302 0.6138 0.567 L 16.4126 23.9346 C 16.3712 24.0552 16.3928 24.1686 16.472 24.2712 c 0.081 0.1044 0.1854 0.1566 0.315 0.1566 H 19.1 c 0.1278 0 0.234 -0.0522 0.315 -0.1566 C 19.4942 24.1686 19.514 24.0552 19.4744 23.9346 L 18.6428 21.1752 c 0.2574 -0.1368 0.4608 -0.3258 0.6138 -0.567 S 19.487 20.0988 19.487 19.8 z"
                        fill={`url(#${id})`} />
                </>
            )
        },
    },
    {
        name: 'Statistiques',
        summary:
            'Gardez un oeil sur la chatbox.',
        description:
            'ChatBlast vous donne accès à la liste des membres qui se sont connectés sur votre intégration, le nombre de message, les erreurs éventuelles, et bien plus encore.',
        image: screenshotInventory,
        icon: function InventoryIcon() {
            let id = useId();
            return (
                <>
                    <defs>
                        <linearGradient
                            id={id}
                            x1="11.5"
                            y1={18}
                            x2={36}
                            y2="15.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset=".194" stopColor="#fff" />
                            <stop offset={1} stopColor="#ffffff00" />
                        </linearGradient>
                    </defs>
                    <path
                        d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
                        stroke={`url(#${id})`}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </>
            )
        },
    }
]

function Feature({ feature, isActive, className, ...props }) {
    return (
        <div
            className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
            {...props}
        >
            <div
                className={clsx(
                    'w-9 rounded-lg',
                    isActive ? 'bg-emerald-600' : 'bg-gray-500'
                )}
            >
                <svg aria-hidden="true" className="h-9 w-9" fill="none">
                    <feature.icon />
                </svg>
            </div>
            <h3
                className={clsx(
                    'mt-6 text-sm font-medium',
                    isActive ? 'text-emerald-600' : 'text-gray-600'
                )}
            >
                {feature.name}
            </h3>
            <p className="mt-2 font-display text-xl text-gray-900">
                {feature.summary}
            </p>
            <p className="mt-4 text-sm text-gray-600">{feature.description}</p>
        </div>
    )
}

function FeaturesMobile() {
    return (
        <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {features.map((feature) => (
                <div key={feature.name}>
                    <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
                    <div className="relative mt-10 pb-10">
                        <div className="absolute -inset-x-4 bottom-0 top-8 bg-gray-200 sm:-inset-x-6" />
                        <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-900/5 ring-1 ring-gray-500/10">
                            <img
                                className="w-full"
                                src={feature.image}
                                alt=""
                                sizes="52.75rem"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function FeaturesDesktop() {
    return (
        <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
            {({ selectedIndex }) => (
                <>
                    <Tab.List className="grid grid-cols-[minmax(0,400px)_minmax(0,400px)] justify-center gap-x-8">
                        {features.map((feature, featureIndex) => (
                            <Feature
                                key={feature.name}
                                feature={{
                                    ...feature,
                                    name: (
                                        <Tab className="[&:not(:focus-visible)]:focus:outline-none outline-none">
                                            <span className="absolute inset-0" />
                                            {feature.name}
                                        </Tab>
                                    ),
                                }}
                                isActive={featureIndex === selectedIndex}
                                className="relative"
                            />
                        ))}
                    </Tab.List>
                    <Tab.Panels className="relative mt-20 overflow-hidden rounded-4xl bg-gray-200 px-14 py-16 xl:px-16">
                        <div className="-mx-5 flex">
                            {features.map((feature, featureIndex) => (
                                <Tab.Panel
                                    static
                                    key={feature.name}
                                    className={clsx(
                                        'px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none',
                                        featureIndex !== selectedIndex && 'opacity-60'
                                    )}
                                    style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                                    aria-hidden={featureIndex !== selectedIndex}
                                >
                                    <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-gray-900/5 ring-1 ring-gray-500/10">
                                        <img
                                            className="w-full"
                                            src={feature.image}
                                            alt=""
                                            sizes="52.75rem"
                                        />
                                    </div>
                                </Tab.Panel>
                            ))}
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-gray-900/10" />
                    </Tab.Panels>
                </>
            )}
        </Tab.Group>
    )
}

export function SecondaryFeatures() {
    return (
        <section
            id="secondary-features"
            aria-label="Contrôlez la chatbox à votre goût"
            className="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32"
        >
            <Container>
                <div className="mx-auto max-w-2xl md:text-center">
                    <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl">
                        Contrôlez la chatbox à votre goût.
                    </h2>
                    <p className="mt-4 text-lg tracking-tight text-gray-700">
                        Choississez les aspects pratiques du système de la chatbox et monitorez les statistiques.
                    </p>
                </div>
                <FeaturesMobile />
                <FeaturesDesktop />
            </Container>
        </section>
    )
}
