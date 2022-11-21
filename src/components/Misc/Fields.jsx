import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx'
import { useEffect, useState } from 'react';
import Tooltip from './Tooltip';

const formClasses =
    'block w-full bg-white [[changed_&]]:border-blue-400 focus:[[changed_&]]:border-blue-500 [&:not([empty])]:invalid:border-red-500 [&:not([empty])]:invalid:focus:border-red-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 appearance-none shadow-sm rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-0 sm:text-sm'

export function Label({ id, children, optinal, tooltip }) {
    return (
        <label
            htmlFor={id}
            className={clsx("mb-3 block text-sm font-medium text-gray-700", tooltip ? "flex items-center" : "")}
        >
            {children}
            {optinal && <span className='text-xs text-gray-500 ml-2'>({optinal})</span>}
            {tooltip && <Tooltip className="inline ml-2 cursor-help" text={tooltip}><QuestionMarkCircleIcon className='w-[1.4rem] text-gray-400 inline' /></Tooltip>}
        </label>
    )
}

function Field({ Element, defaultValue = "", className, showChanged, forwardRef, ...props }) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (!value && defaultValue) setValue(defaultValue);
    }, [defaultValue]);

    return (
        <Element empty={!value ? "true" : undefined} ref={forwardRef} value={value} changed={defaultValue || showChanged ? value === defaultValue ? undefined : "true" : undefined} onChange={e => setValue(e.target.value)} {...props} className={clsx(formClasses, className)} />
    );
}

export function TextField({
    id,
    label,
    type = 'text',
    className = '',
    optinal,
    tooltip,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={className}>
            {label && <Label id={id} optinal={optinal} tooltip={tooltip}>{label}</Label>}
            {type == "password" ?
                <div className='relative overflow-hidden group'>
                    <Field Element="input" id={id} type={showPassword ? "text" : "password"} {...props} className="peer pr-10" />
                    <input id={"show-" + id} name='show' checked={showPassword} onChange={e => setShowPassword(e.target.checked)} className='hidden' type="checkbox" />
                    <label htmlFor={"show-" + id} className={clsx('transition-transform absolute flex items-center mr-3 right-0 top-0 h-full peer-focus:translate-y-0 hover:translate-y-0 cursor-pointer', showPassword ? "translate-y-0" : "-translate-y-full")}>
                        <EyeIcon className={clsx('stroke-gray-500 stroke-1 hover:stroke-emerald-500', showPassword ? "hidden" : "")} width="22" />
                        <EyeSlashIcon className={clsx('stroke-1 stroke-gray-500 hover:stroke-emerald-500', !showPassword ? "hidden" : "")} width="22" />
                    </label>
                </div>
                :
                <Field Element="input" id={id} type={type} {...props} />
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
            <Field Element="textarea" id={id} {...props} className="min-h-[60px]" />
        </div>
    );
};

export function SelectField({ id, label, className = '', tooltip, ...props }) {
    return (
        <div className={className}>
            {label && <Label id={id} tooltip={tooltip}>{label}</Label>}
            <Field Element="select" id={id} {...props} className="pr-8" />
        </div>
    )
}

export function NumberPlusMinusField({ id, label, onChange, defaultValue, className = "", min = 0, max, ...props }) {
    const [value, setValue] = useState(defaultValue || min);

    useEffect(() => {
        onChange && onChange(value);
    }, [value]);

    return (
        <div className={clsx("text-gray-900", className)}>
            {label && <Label id={id}>{label}</Label>}
            <div className='flex text-xs'>
                <input type="button" value="-" className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-md px-3 cursor-pointer outline-none" onClick={() => setValue(b => (b - 1 >= min && b - 1 <= (max || Infinity)) ? Number(b) - 1 : b)} data-field="quantity" />
                <input id={id} type="number" value={value} onChange={e => e.target.value >= min && e.target.value <= (max || Infinity) && setValue(e.target.value)} step="1" min={min} max={max} name="quantity" className="border-gray-200 text-center text-sm w-10 py-1 focus:ring-0 focus:border-emerald-500" {...props} />
                <input type="button" value="+" className="bg-gray-100 border border-gray-200 border-l-0 rounded-r-md px-3 cursor-pointer outline-none" data-field="quantity" onClick={() => setValue(b => (b + 1 >= min && b + 1 <= (max || Infinity)) ? Number(b) + 1 : b)} />
            </div>
        </div>
    );
}