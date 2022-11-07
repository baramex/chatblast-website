import { logoutUser } from "../../lib/service/authentification";
import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, RectangleGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

export const userNavigation = [
    [{ Icon: UserIcon, name: 'Votre profil', href: '/dashboard/profile' }, { Icon: RectangleGroupIcon, name: "Dashboard", href: "/dashboard/integrations" }],
    [{ Icon: ArrowLeftOnRectangleIcon, name: 'Se déconnecter', onClick: handleLogout, color: "text-red-600", iconColor: "text-red-600", colorHover: "text-red-700", iconColorHover: "group-hover:text-red-700" }],
];

export function UserMenu({ user, setUser, addAlert, customNavigation }) {
    const navigate = useNavigate();

    return (<Menu as="div" className="relative ml-3">
        <div>
            <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none">
                <span className="sr-only">Ouvrir le menu utilisateur</span>
                <img
                    className="h-10 w-10 object-cover aspect-square rounded-full"
                    src={user.avatar}
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {(customNavigation || userNavigation).map((items, i) => (
                    <div className='py-1' key={i}>
                        {items.map(item => (
                            <Menu.Item key={item.name}>
                                {({ active }) => (
                                    item.href ?
                                        <Link
                                            to={item.href}
                                            className={clsx(
                                                active ? 'bg-gray-100' : item.color || 'text-gray-700',
                                                active ? item.colorHover || "text-gray-800" : "",
                                                'group flex items-center px-4 py-2 text-sm',
                                                item.className
                                            )}
                                        >
                                            {<item.Icon className={clsx("mr-3 h-5 w-5", item.iconColor || "text-gray-600", item.iconColorHover || "group-hover:text-gray-700")} aria-hidden="true" />}
                                            {item.name}
                                        </Link> :
                                        <button
                                            onClick={e => item.onClick(e, setUser, addAlert, navigate)}
                                            className={clsx(
                                                active ? 'bg-gray-100' : item.color || 'text-gray-700',
                                                active ? item.colorHover || "text-gray-800" : "",
                                                'group flex items-center px-4 py-2 text-sm w-full',
                                                item.className
                                            )}
                                        >
                                            {<item.Icon className={clsx("mr-3 h-5 w-5", item.iconColor || "text-gray-600", item.iconColorHover || "group-hover:text-gray-700")} aria-hidden="true" />}
                                            {item.name}
                                        </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                ))}
            </Menu.Items>
        </Transition>
    </Menu>);
}

async function handleLogout(e, setUser, addAlert, navigate) {
    try {
        await logoutUser();
        setUser(null);
        addAlert({ type: "success", title: "Déconnecté.", ephemeral: true });
        navigate("/");
    } catch (error) {
        addAlert({ type: "error", title: "Erreur lors de la déconnexion: " + (error.message || "Une erreur est survenue."), ephemeral: true });
    }
}