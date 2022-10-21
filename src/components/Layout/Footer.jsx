import { DiscordIcon } from '../Misc/Icons';
import { NavLink } from '../Misc/NavLink';

function NavigationIcon({ name, href, Icon }) {
  return (
    <a key={name} href={href} target="_blank" className="text-gray-400 hover:text-gray-500">
      <span className="sr-only">{name}</span>
      <Icon className="h-5" aria-hidden="true" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <NavLink href="#features">Fonctionnalités</NavLink>
          <NavLink href="#about">A propos</NavLink>
          <NavLink href="#pricing">Tarifs</NavLink>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <NavigationIcon name="Discord" href="https://discord.gg/invite/HzQ6Hk3HQU" Icon={DiscordIcon} />
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">Copyright &copy; 2022 ChatBlast. All rights reserved.</p>
      </div>
    </footer>
  )
}
