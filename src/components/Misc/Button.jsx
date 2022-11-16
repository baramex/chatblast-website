import clsx from 'clsx'
import { Link } from 'react-router-dom'

const baseStyles = {
    solid:
        'transition-colors group inline-flex items-center justify-center text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
    outline:
        'transition-colors group inline-flex border items-center justify-center text-sm focus:outline-none shadow-sm',
}

const variantStyles = {
    solid: {
        slate:
            'bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-900',
        emerald: 'bg-emerald-600 text-white hover:text-gray-100 disabled:bg-emerald-300 disabled:text-gray-100 disabled:cursor-not-allowed hover:bg-emerald-500 active:bg-emerald-800 active:text-emerald-100 focus-visible:outline-emerald-600',
        green: 'bg-green-500 text-white hover:text-gray-100 disabled:bg-green-300 disabled:text-green-50 disabled:cursor-not-allowed hover:bg-green-400 active:bg-green-700 active:text-green-100 focus-visible:outline-green-600',
        red: 'bg-red-600 text-white hover:text-gray-100 disabled:bg-red-300 disabled:text-red-50 disabled:cursor-not-allowed hover:bg-red-500 active:bg-red-800 active:text-red-100 focus-visible:outline-red-600',
        amber: 'bg-amber-300 text-amber-700 disabled:bg-amber-100 disabled:text-amber-500 disabled:cursor-not-allowed hover:bg-amber-400 active:bg-amber-500 active:text-amber-800 focus-visible:outline-amber-300',
        gold: 'bg-gold text-gray-900 transition disabled:brightness-[85%] disabled:cursor-not-allowed hover:brightness-95 focus-visible:outline-gold',
        white:
            'bg-white text-gray-900 hover:bg-emerald-50 active:bg-emerald-200 active:text-gray-600 focus-visible:outline-white',
    },
    outline: {
        slate: 'border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed active:bg-gray-50 active:text-gray-600 focus-visible:outline-emerald-600 focus-visible:border-gray-300',
        white:
            'border-gray-700 text-white hover:border-gray-500 active:border-gray-700 active:text-gray-400 focus-visible:outline-white',
        red: "border-red-500 text-red-600 disabled:text-red-400 hover:bg-red-50 disabled:border-red-300 disabled:bg-red-50 disabled:cursor-not-allowed hover:border-red-600 active:border-red-700 active:text-red-700 outline-none focus-visible:border-red-600",
        amber: "border-amber-500 text-amber-600 disabled:text-amber-500 disabled:border-amber-400 disabled:bg-amber-50 disabled:cursor-not-allowed bg-amber-50 hover:border-amber-600 active:border-amber-600 active:bg-amber-100 active:text-amber-700 outline-none focus-visible:border-amber-500",
        green: "border-green-500 text-green-600 disabled:text-green-400 disabled:border-green-300 disabled:bg-green-50 disabled:cursor-not-allowed hover:border-green-600 active:border-green-600 active:bg-green-50 active:text-green-700 outline-none focus-visible:border-green-500",
    },
}

export function Button({
    variant = 'solid',
    color = 'slate',
    rounded = "rounded-full",
    className,
    href,
    to,
    as,
    padding = "px-4 py-2",
    forwardRef,
    ...props
}) {
    className = clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        rounded,
        padding,
        className
    )

    return href ? (
        <a href={href} className={className} {...props} />
    ) : to ?
        <Link to={to} className={className} ref={forwardRef} {...props} /> : as == "div" ?
            <div role="button" className={className} ref={forwardRef} {...props} /> :
            <button className={className} ref={forwardRef} {...props} />
}
