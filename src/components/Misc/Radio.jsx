import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";

export function RadioOptionRect({ options }) {
    return (
        <RadioGroup.Option
            value={options}
            className={({ checked, disabled }) =>
                clsx(
                    checked ? 'border-emerald-500' : !disabled && 'border-gray-300',
                    disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed" : "bg-white hover:border-gray-400 cursor-pointer",
                    'relative transition-colors group flex rounded-lg border p-5 shadow-sm focus:outline-none'
                )
            }
        >
            {({ checked, disabled }) => (<>
                <span className="flex flex-1">
                    <span className="flex flex-col">
                        <RadioGroup.Label as="span" className={clsx("block text-md font-medium", disabled ? "text-gray-500" : "text-gray-900")}>
                            {options.title}
                        </RadioGroup.Label>
                        <div className="mt-1">
                            <options.Icon className="float-left mr-4 mt-2" />
                            <RadioGroup.Description as="span" className={clsx("text-sm", disabled ? "text-gray-400" : "text-gray-500")}>
                                {options.description}
                            </RadioGroup.Description>
                        </div>
                    </span>
                </span>
                <CheckCircleIcon
                    className={clsx(!checked ? 'invisible' : '', 'h-5 w-5 text-emerald-600')}
                    aria-hidden="true"
                />
                <span
                    className={clsx(
                        checked ? 'border-emerald-500' : 'border-transparent',
                        'pointer-events-none absolute border-2 -inset-px rounded-lg'
                    )}
                    aria-hidden="true"
                />
            </>)
            }
        </RadioGroup.Option >
    );
}

export function RadioOptionCustom({ value, children, className, checkedClassName }) {
    return (
        <RadioGroup.Option
            value={value}
            className={({ checked }) => clsx(checked && (checkedClassName || "ring-2 ring-emerald-500 ring-offset-2"), className || "bg-white border-gray-300 border rounded-3xl p-3.5", "outline-none cursor-pointer")}
        >
            {children}
        </RadioGroup.Option >
    );
}