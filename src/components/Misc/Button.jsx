import clsx from 'clsx'
import { Link } from 'react-router-dom'

const baseStyles = {
    solid:
        'transition-colors group inline-flex items-center justify-center py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
    outline:
        'transition-colors group inline-flex ring-1 items-center justify-center py-2 px-4 text-sm focus:outline-none',
}

const variantStyles = {
    solid: {
        slate:
            'bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-900',
        emerald: 'bg-emerald-600 text-white hover:text-gray-100 disabled:bg-emerald-300 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-emerald-500 active:bg-emerald-800 active:text-emerald-100 focus-visible:outline-emerald-600',
        white:
            'bg-white text-gray-900 hover:bg-emerald-50 active:bg-emerald-200 active:text-gray-600 focus-visible:outline-white',
    },
    outline: {
        slate:
            'ring-gray-200 text-gray-700 hover:text-gray-900 hover:ring-gray-300 active:bg-gray-100 active:text-gray-600 focus-visible:outline-emerald-600 focus-visible:ring-gray-300',
        white:
            'ring-gray-700 text-white hover:ring-gray-500 active:ring-gray-700 active:text-gray-400 focus-visible:outline-white',
        red: "ring-red-500 text-red-600 hover:ring-red-600 active:ring-red-700 active:text-red-700 outline-none focus-visible:ring-red-600",
    },
}

export function Button({
    variant = 'solid',
    color = 'slate',
    rounded = "rounded-full",
    className,
    href,
    to,
    ...props
}) {
    className = clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        rounded,
        className
    )

    return href ? (
        <a href={href} className={className} {...props} />
    ) : to ?
        <Link to={to} className={className} {...props} /> :
        (
            <button className={className} {...props} />
        )
}
