import { formatDate } from "../../lib/utils/date";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { PaypalIcon, PaypalLabel } from "../Images/Icons";
import { ContactForm } from "./Forms";
import { NumberPlusMinusField } from "./Fields";

function RadioOption({ plan }) {
    return (<RadioGroup.Option
        value={plan}
        className={({ checked }) =>
            clsx(
                checked ? 'border-emerald-500' : 'border-gray-300',
                'relative transition-colors group hover:border-gray-400 flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
            )
        }
    >
        {({ checked }) => (
            <>
                <span className="flex flex-1">
                    <span className="flex flex-col">
                        <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                            {plan.title}
                        </RadioGroup.Label>
                        <ul className="list-disc text-gray-500 text-sm flex-1 mt-1 pl-4">
                            {plan.features.map((feature, index) => (
                                <li key={index}>
                                    <RadioGroup.Description as="span">
                                        {feature}
                                    </RadioGroup.Description>
                                </li>
                            ))}
                        </ul>
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
                        "absolute group-hover:border-gray-400 right-3 top-0 -translate-y-1/2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
                        checked ? "bg-emerald-500 text-white" : "border-gray-300 border text-gray-800 bg-white",
                    )}>
                        {plan.badge}
                    </span>
                }
            </>
        )}
    </RadioGroup.Option>);
}

function CheckboxOption({ options, onChecked }) {
    const [checked, setChecked] = useState(false);

    return (<div>
        <input name={options.id} id={options.id} checked={checked} onChange={e => { setChecked(e.target.checked); onChecked(e.target.checked); }} className="peer hidden" type="checkbox" />
        <label className={
            clsx(
                'relative h-full hover:border-gray-400 border-gray-300 peer-checked:border-emerald-500 flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
            )
        } htmlFor={options.id}>
            <span className="flex flex-1">
                <div>
                    <span className="flex h-full flex-col">
                        <span className="block text-sm font-medium text-gray-900">
                            {options.title}
                        </span>
                        <span className="mt-1 flex flex-1 text-sm text-gray-500">
                            {options.description}
                        </span>
                        <span className="mt-6 text-sm font-medium text-gray-900">
                            + {options.price} € <span className="text-xs text-gray-700">/mois</span>
                        </span>
                    </span>
                </div>
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
        </label>
    </div>);
}

const plans = [
    { id: "starter", title: "Plan Starter", features: ["1-1000 visiteurs uniques / mois"], price: 7.95 },
    { id: "classic", title: "Plan Classic", features: ["1000-10'000 visiteurs uniques / mois"], price: 12.95, badge: "7 jours gratuits" },
    { id: "advanced", title: "Plan Avancé", features: ["10'000-100'000 visiteurs uniques / mois", "Authentification Custom"], price: 18.95, badge: "7 jours gratuits" },
    { id: "custom", title: "Plan Customisé", features: ["Créez votre plan personnalisé pour les plus grands projets."], price: "??" },
]

const modules = [
    { id: "customisation", title: "Customisation", description: "Customisez vos intégrations en y changeant la couleur et en adaptant la manière d'apparition.", price: 3.95 },
    { id: "analytics", title: "Analyses", description: "Ayez accès aux données receuillis par ChatBlast sur votre intégration: le nombre de comptes, les messages, les ouvertures et pleins d'autres statistiques.", price: 2.95 }
]

export default function CheckoutModal({ open, user, defaultPlan = "classic", onClose }) {
    const [plan, setPlan] = useState(plans.find(a => a.id === defaultPlan));
    const [modulesChecked, setModulesChecked] = useState([]);
    const [additionalSites, setAdditionalSites] = useState(0);

    const priceHT = (plan.price + modulesChecked.reduce((a, b) => a + b.price, 0)) * (additionalSites + 1);
    const taxes = priceHT * 0.2;
    const priceTTC = priceHT + taxes;

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
                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4">
                                    {plans.map((p) => <RadioOption key={p.id} plan={p} />)}
                                </div>
                                <p className="text-xs text-gray-600 mt-2 ml-1">Période d'essaie <u>sans engagement</u> et uniquement pour la première commande.</p>

                                {plan.id !== "custom" &&
                                    <div className="mt-5 ml-1 text-sm">
                                        <label htmlFor="additional-sites" className="mr-3 text-sm font-medium text-gray-700">Sites additionnels</label>
                                        <NumberPlusMinusField defaultValue={additionalSites} onChange={setAdditionalSites} className="inline-block" id="additional-sites" max={5} />
                                        {additionalSites ? <p className="text-xs inline text-gray-600 ml-2">+ {(additionalSites * plan.price).toFixed(2)} € /mois</p> : null}
                                    </div>
                                }
                            </RadioGroup>
                            <div className="inset-0 flex items-center col-span-full my-9" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            {plan.id === "custom" ? <ContactForm user={user} /> : <>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Modules</label>
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 md:grid-cols-2 gap-x-12">
                                        {modules.map((module) => <CheckboxOption onChecked={a => setModulesChecked(b => a ? [...b, module] : b.filter(c => c.id !== module.id))} key={module.id} options={module} />)}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2 ml-1">Besoin d'autre chose ? <a className="underline" onClick={onClose} href="#contact">Nous contacter</a>.</p>
                                </div>
                                <div className="inset-0 flex items-center col-span-full my-9" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Résumé</label>
                                    <dl className="mt-4 text-sm grid md:grid-cols-2 gap-x-12 gap-y-4 [&_dd]:font-medium px-2">
                                        <div className="flex items-center justify-between">
                                            <dt>Début de l'abonnement</dt>
                                            <dd>{formatDate(Date.now() + (plan.badge ? 1000 * 60 * 60 * 24 * 7 : 0))}</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt>Prix HT de l'abonnement</dt>
                                            <dd>{(priceHT).toFixed(2)} €</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt>Taxes (20%)</dt>
                                            <dd>{(taxes).toFixed(2)} €</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt>Prix total TTC <span className="text-xs text-gray-700">/mois</span></dt>
                                            <dd>{(priceTTC).toFixed(2)} €</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="flex flex-col gap-1 items-center mt-8">
                                    <Button
                                        color="gold"
                                        rounded="rounded-md"
                                        className="w-full sm:w-96">
                                        <PaypalLabel className="w-20" />
                                    </Button>
                                    <div>
                                        <span className="inline-block align-bottom text-xs text-gray-500 italic">Optimisé par</span><PaypalLabel className="ml-1.5 h-5 inline-block" />
                                    </div>
                                </div>
                            </>}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>);
}