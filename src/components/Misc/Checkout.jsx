import { formatDate } from "../../lib/utils/date";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, useState } from "react";

function RadioOption({ plan }) {
    return (<RadioGroup.Option
        key={plan.id}
        value={plan}
        className={({ checked, active }) =>
            clsx(
                active ? "border-gray-400" : "",
                checked ? 'border-emerald-500' : 'border-gray-300',
                active && checked ? "ring-1 ring-emerald-500" : "",
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
            )
        }
    >
        {({ checked, active }) => (
            <>
                <span className="flex flex-1">
                    <span className="flex flex-col">
                        <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                            {plan.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description as="span" className="mt-1 flex flex-1 text-sm text-gray-500">
                            {plan.description}
                        </RadioGroup.Description>
                        <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                            {plan.price} € <span className="text-xs text-gray-700">/mois</span>
                        </RadioGroup.Description>
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
                {
                    plan.badge && <span className={clsx(
                        "absolute right-3 top-0 -translate-y-1/2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
                        checked ? "bg-emerald-500 text-white" : "border-gray-300 border text-gray-800 bg-white",
                        active ? "border-gray-400" : ""
                    )}>
                        {plan.badge}
                    </span>
                }
            </>
        )}
    </RadioGroup.Option>);
}

const plans = [
    { id: "starter", title: "Plan Starter", description: "1-1000 visiteurs uniques / mois", price: 7.95 },
    { id: "classic", title: "Plan Classic", description: "1000-10'000 visiteurs uniques / mois", price: 12.95, badge: "7 jours gratuits" },
    { id: "advanced", title: "Plan Avancé", description: "+10'000 visiteurs uniques / mois", price: 18.95, badge: "7 jours gratuits" },
    { id: "company", title: "Plan Entreprise", description: "3 sites inclus (type avancé)", price: 40.95 },
]

export default function CheckoutModal({ open, defaultPlan = "classic", onClose }) {
    const [plan, setPlan] = useState(plans.find(a => a.id === defaultPlan));

    return (<Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white p-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl mx-8">
                            <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 text-center">
                                Souscrire à un abonnement
                            </Dialog.Title>
                            <RadioGroup value={plan} onChange={setPlan} className="mt-6">
                                <RadioGroup.Label className="text-base font-medium text-gray-900">Sélectionner le plan</RadioGroup.Label>
                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
                                    {plans.map((plan) => <RadioOption key={plan.id} plan={plan} />)}
                                </div>
                                <p className="text-xs text-gray-600 mt-2 ml-1">Période d'essaie uniquement pour la première commande.</p>
                            </RadioGroup>
                            <div className="inset-0 flex items-center col-span-full my-10" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div>
                                <label className="text-base font-medium text-gray-900">Résumé</label>
                                <dl className="mt-4 text-sm grid sm:grid-cols-2 gap-x-12 gap-y-4 [&_dd]:font-medium px-2">
                                    <div className="flex items-center justify-between">
                                        <dt>Début de l'abonnement</dt>
                                        <dd>{formatDate(Date.now() + (plan.badge ? 1000 * 60 * 60 * 24 * 7 : 0))}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt>Prix HT de l'abonnement</dt>
                                        <dd>{(plan.price).toFixed(2)} €</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt>Taxes (20%)</dt>
                                        <dd>{((plan.price) * 20 / 100).toFixed(2)} €</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt>Prix total TTC</dt>
                                        <dd>{(( plan.price) * 120 / 100).toFixed(2)} €</dd>
                                    </div>
                                </dl>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>);
}