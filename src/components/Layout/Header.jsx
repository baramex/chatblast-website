import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { PlayIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

import { Button } from '../Misc/Button'
import { Container } from '../Misc/Container'
import logo from '../../images/logo.png'
import { NavLink } from '../Misc/NavLink'
import { Link } from 'react-router-dom'
import { UserMenu } from '../Misc/Menus'

function MobileNavLink({ href, children }) {
    return (
        <Popover.Button as={Link} href={href} className="block w-full p-2">
            {children}
        </Popover.Button>
    )
}

function MobileNavIcon({ open }) {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 overflow-visible stroke-gray-700"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx(
                    'origin-center transition',
                    open && 'scale-90 opacity-0'
                )}
            />
            <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx(
                    'origin-center transition',
                    !open && 'scale-90 opacity-0'
                )}
            />
        </svg>
    )
}

function MobileNavigation() {
    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                {({ open }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-gray-300/50" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-gray-900 shadow-xl ring-1 ring-gray-900/5"
                    >
                        <MobileNavLink href="#features">Fonctionnalités</MobileNavLink>
                        <MobileNavLink href="#about">A propos</MobileNavLink>
                        <MobileNavLink href="#pricing">Tarifs</MobileNavLink>
                        <hr className="m-2 border-gray-300/40" />
                        <MobileNavLink href="/login">Se connecter</MobileNavLink>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    )
}

export function Header({ user, setUser, addAlert }) {
    return (
        <header className="py-10">
            <Container>
                <nav className="relative flex justify-between">
                    <div className="flex items-center md:gap-x-12">
                        <Link to="#" aria-label="Home">
                            <img src={logo} className="h-10 w-auto" />
                        </Link>
                        <div className="hidden md:flex md:gap-x-6">
                            <NavLink href="#features">Fonctionnalités</NavLink>
                            <NavLink href="#about">A propos</NavLink>
                            <NavLink href="#pricing">Tarifs</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-8">
                        {!user &&
                            <div className="hidden md:block">
                                <NavLink to="/login">Se connecter</NavLink>
                            </div>
                        }
                        {
                            user ?
                                <UserMenu user={user} setUser={setUser} addAlert={addAlert} />
                                :
                                <Button href="#pricing" color="emerald">
                                    <PlayIcon width="18" />
                                    <span className='ml-1'>
                                        Démarrer
                                    </span>
                                </Button>
                        }
                        <div className="-mr-1 md:hidden">
                            <MobileNavigation />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}
