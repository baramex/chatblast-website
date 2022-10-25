import { Link } from "react-router-dom";

export function NavLink({ href, to, children }) {
  return (
    to ?
      <Link to={to} className="inline-block rounded-lg py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
        {children}
      </Link> :
      <a
        href={href}
        className="inline-block rounded-lg py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        {children}
      </a>
  )
}
