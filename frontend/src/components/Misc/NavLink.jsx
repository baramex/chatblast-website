export function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      {children}
    </a>
  )
}
