import { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
    BanknotesIcon,
    Bars3BottomLeftIcon,
    ComputerDesktopIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import logo from '../../images/logo.png';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Profil', href: '/dashboard/profile', icon: UserIcon },
    { name: 'Intégrations', href: '/dashboard/integrations', icon: ComputerDesktopIcon },
    { name: 'Factures', href: '/dashboard/invoices', icon: BanknotesIcon }
];
const userNavigation = [
    { name: 'Votre profil', href: '/dashboard/profile' },
    { name: 'Se déconnecter', href: '#' },
];

export default function Dashboard({ user, setUser, Tab }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
        else if (!Tab) navigate("/dashboard/profile");
    }, []);

    if (!user || !Tab) return null;

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
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
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
                                    <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                        <nav className="space-y-1 px-2">
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
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0"></div>
                        </div>
                    </Dialog>
                </Transition.Root>

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
                            <nav className="flex-1 space-y-1 px-2 pb-4">
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
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="md:pl-64">
                    <div className="mx-auto flex flex-col md:px-8">
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
                                <div className="flex flex-1"></div>
                                <div className="ml-4 flex items-center md:ml-6">

                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none">
                                                <span className="sr-only">Ouvrir le menu utilisateur</span>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user?.avatar}
                                                    alt="avatar"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                to={item.href}
                                                                className={clsx(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block py-2 px-4 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <main className="flex-1">
                            <div className="py-6">
                                <Tab user={user} setUser={setUser} />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}