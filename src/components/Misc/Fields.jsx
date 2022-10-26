import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx'
import { useState } from 'react';

const formClasses =
    'block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 focus:ring-0 sm:text-sm'

function Label({ id, children }) {
    return (
        <label
            htmlFor={id}
            className="mb-3 block text-sm font-medium text-gray-700"
        >
            {children}
        </label>
    )
}

export function TextField({
    id,
    label,
    type = 'text',
    className = '',
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            {type == "password" ?
                <div className='relative overflow-hidden group'>
                    <input id={id} type={showPassword ? "text" : "password"} {...props} className={clsx(formClasses, "peer")} />
                    <input id={"show-" + id} name='show' checked={showPassword} onChange={e => setShowPassword(e.target.checked)} className='hidden' type="checkbox" />
                    <label htmlFor={"show-" + id} className={clsx('transition-transform absolute flex items-center mr-3 right-0 top-0 h-full peer-focus:translate-y-0 hover:translate-y-0 cursor-pointer', showPassword ? "translate-y-0" : "-translate-y-full")}>
                        <EyeIcon className={clsx('stroke-gray-500 stroke-1 hover:stroke-emerald-500', showPassword ? "hidden" : "")} width="22" />
                        <EyeSlashIcon className={clsx('stroke-1 stroke-gray-500 hover:stroke-emerald-500', !showPassword ? "hidden" : "")} width="22" />
                    </label>
                </div>
                :
                <input id={id} type={type} {...props} className={formClasses} />
            }
        </div >
    )
}

export function TextAreaField({
    id,
    label,
    className = '',
    ...props
}) {
    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            <textarea id={id} {...props} className={clsx(formClasses, "min-h-[60px]")} />
        </div>
    );
};

export function SelectField({ id, label, className = '', ...props }) {
    return (
        <div className={className}>
            {label && <Label id={id}>{label}</Label>}
            <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
        </div>
    )
}
