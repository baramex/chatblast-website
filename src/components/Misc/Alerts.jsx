import { XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export function AlertError({ title, list, className, canClose = true, onClose }) {
    return (
        <div className={clsx("rounded-md bg-red-50 p-4", className)}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{title}</p>
                    {list &&
                        <div className="mt-2 text-sm text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                                {list.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    }
                </div>
                {canClose &&
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                className="inline-flex rounded-md bg-red-50 p-1 text-red-500 hover:bg-red-100 focus:outline-none"
                                {...(onClose && { onClick: onClose })}
                            >
                                <span className="sr-only">Fermer</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}