import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    BanknotesIcon,
    Bars3BottomLeftIcon,
    ComputerDesktopIcon,
    HomeIcon,
    LifebuoyIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import logo from '../../images/logo.png';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { UserMenu, userNavigation } from '../Misc/Menus';

const navigation = [
    { name: 'Profil', href: '/dashboard/profile', icon: UserIcon },
    { name: 'Intégrations', href: '/dashboard/integrations', icon: ComputerDesktopIcon },
    { name: 'Factures', href: '/dashboard/invoices', icon: BanknotesIcon }
];

export default function Dashboard({ Tab, ...props }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!props.user) history.push("/login");
        else if (!Tab) history.push("/dashboard/profile");
    }, []);

    if (!props.user || !Tab) return null;

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Fermer le menu</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <Link to="/">
                                            <img
                                                className="h-12 w-12"
                                                src={logo}
                                                alt="ChatBlast"
                                            />
                                        </Link>
                                    </div>
                                    <div className="mt-5 flex-1 overflow-y-auto">
                                        <nav className="h-full flex flex-col">
                                            <div className='px-2 space-y-1'>
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className={clsx(
                                                            item.href === document.location.pathname
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                            'group rounded-md py-2 px-2 flex items-center text-base font-medium'
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={clsx(
                                                                item.href === document.location.pathname ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                                'mr-4 flex-shrink-0 h-6 w-6'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className='flex-1'></div>
                                            <Link
                                                to={"/dashboard/support"}
                                                className='bg-gray-50 border-t border-gray-200 hover:bg-gray-100 text-gray-700 group rounded-md py-3 px-3 flex items-center text-sm font-medium'
                                            >
                                                <LifebuoyIcon
                                                    className='text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                                                    aria-hidden="true"
                                                />
                                                Support
                                            </Link>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0"></div>
                        </div>
                    </Dialog>
                </Transition.Root >

                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <Link to="/">
                                <img
                                    className="h-12 w-12"
                                    src={logo}
                                    alt="ChatBlast"
                                />
                            </Link>
                        </div>
                        <div className="mt-5 flex flex-grow flex-col">
                            <nav className="flex-1 flex flex-col">
                                <div className='px-2 space-y-1'>
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={clsx(
                                                item.href === document.location.pathname ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                                            )}
                                        >
                                            <item.icon
                                                className={clsx(
                                                    item.href === document.location.pathname ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className='flex-1'></div>
                                <Link
                                    to={"/dashboard/support"}
                                    className='bg-gray-50 border-t border-gray-200 hover:bg-gray-100 text-gray-700 group rounded-md py-3 px-3 flex items-center text-sm font-medium'
                                >
                                    <LifebuoyIcon
                                        className='text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                                        aria-hidden="true"
                                    />
                                    Support
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="md:pl-64">
                    <div className="mx-auto flex flex-col md:px-8 min-h-screen">
                        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
                            <button
                                type="button"
                                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Ouvrir le menu</span>
                                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <div className="flex flex-1 justify-between px-4 md:px-0">
                                <div className="flex flex-1 items-center">
                                    <h1 className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-700 tracking-wider">
                                        DASHBOARD
                                    </h1>
                                </div>
                                <div className="ml-4 flex items-center md:ml-6">
                                    <UserMenu user={props.user} setUser={props.setUser} addAlert={props.addAlert} customNavigation={[[{ Icon: HomeIcon, name: "Accueil", href: "/" }], ...userNavigation]} />
                                </div>
                            </div>
                        </div>

                        <main className="flex-1 py-6 flex flex-col">
                            <Tab {...props} />
                        </main>
                    </div>
                </div>
            </div >
        </>
    );
}