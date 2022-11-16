import clsx from "clsx";

export default function Tooltip({ children, text, className, ...props }) {
    return <>
        <div className={clsx("group relative", className)} {...props}>
            {children}
            <div role="tooltip" className="w-max max-w-xs top-full left-1/2 -translate-x-1/2 absolute invisible z-10 py-2 px-3 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-md opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                {text}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    </>;
}