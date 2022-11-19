import { formatDate } from "../../lib/utils/date";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Button } from "./Button";
import { PaypalLabel } from "../Images/Icons";
import { ContactForm } from "./Forms";
import { NumberPlusMinusField, TextField } from "./Fields";
import { dataSetter, fetchData } from "../../lib/service";
import { fetchSubscriptions, subscribe } from "../../lib/service/subcriptions";

function RadioOption({ plan, firstSubscription }) {
    return (
        <RadioGroup.Option
            value={plan}
            className={({ checked }) =>
                clsx(
                    checked ? 'border-emerald-500' : 'border-gray-300',
                    'relative transition-colors group hover:border-gray-400 flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                )
            }
        >
            {({ checked }) => (<>
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
                    plan.badge && firstSubscription && <span className={clsx(
                        "absolute group-hover:border-gray-400 right-3 top-0 -translate-y-1/2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
                        checked ? "bg-emerald-500 text-white" : "border-gray-300 border text-gray-800 bg-white",
                    )}>
                        {plan.badge}
                    </span>
                }
            </>)
            }
        </RadioGroup.Option >
    );
}

function CheckboxOption({ options, defaultChecked, onChecked, site = false }) {
    const [checked, setChecked] = useState(defaultChecked);

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
                            + {options.price} € <span className="text-xs text-gray-700">/mois</span>{site && <span className="text-gray-600 text-[.7rem] ml-0.5">/site</span>}
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
    { _id: "635548d6a6fbf6ce987ec5c7", id: "classic", title: "Plan Classic", features: ["1000-10'000 visiteurs uniques / mois"], price: 12.95, badge: "7 jours gratuits" },
    { id: "advanced", title: "Plan Avancé", features: ["10'000-50'000 visiteurs uniques / mois", "Authentification Custom"], price: 18.95, badge: "7 jours gratuits" },
    { id: "custom", title: "Plan Customisé", features: ["Créez votre plan personnalisé pour les plus grands projets."], price: "??" },
]

const modules = [
    { id: "customisation", title: "Customisation", description: "Customisez vos intégrations en y changeant la couleur et en adaptant la manière d'apparition.", price: 3.95 },
    { id: "analytics", title: "Analyses", description: "Ayez accès aux données receuillis par ChatBlast sur votre intégration: le nombre de comptes, les messages, les ouvertures et pleins d'autres statistiques.", price: 2.95 }
]

export default function CheckoutModal({ open, user, data, setData, addAlert, defaultPlan = "classic", onClose }) {
    const [plan, setPlan] = useState(plans.find(a => a.id === defaultPlan));
    const [modulesChecked, setModulesChecked] = useState([]);
    const [additionalSites, setAdditionalSites] = useState(0);

    useEffect(() => {
        if (user && !data.subscriptions) fetchData(addAlert, dataSetter(setData, "subscriptions"), fetchSubscriptions);
    }, [user]);

    useEffect(() => {
        if (open && plan?.id !== defaultPlan && defaultPlan && plans.find(a => a.id === defaultPlan)) setPlan(plans.find(a => a.id === defaultPlan));
    }, [open]);

    const firstSubscription = data.subscriptions && data.subscriptions.length === 0;

    const modulesPrice = modulesChecked.reduce((a, b) => a + b.price, 0);

    const subtotalPlan = plan?.price * (additionalSites + 1);
    const subtotalModules = modulesPrice * (additionalSites + 1);

    const priceHT = subtotalPlan + subtotalModules;
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

            <div className="fixed inset-0 overflow-y-auto">
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
                                    {plans.map((p) => <RadioOption key={p.id} plan={p} firstSubscription={firstSubscription} />)}
                                </div>
                                <p className="text-xs text-gray-600 mt-2 ml-1">Période d'essaie {firstSubscription && <><u>sans engagement</u> et</>} uniquement pour la première commande.</p>

                                {plan?.id !== "custom" && <div className="flex flex-wrap gap-5 items-center mt-6">
                                    <div className="ml-1 text-sm">
                                        <label htmlFor="additionalSites" className="mr-3 text-sm font-medium text-gray-700">Sites additionnels</label>
                                        <NumberPlusMinusField name="additonalSites" defaultValue={additionalSites} onChange={setAdditionalSites} className="inline-block" id="additionalSites" max={5} />
                                    </div>
                                    <p className="text-sm text-gray-800">Sous total: {additionalSites ? <span className="text-xs text-gray-700">{plan.price.toFixed(2)} x {additionalSites + 1} =</span> : null} <span className="font-medium">{subtotalPlan.toFixed(2)} €</span></p>
                                </div>
                                }
                            </RadioGroup>
                            <div className="inset-0 flex items-center col-span-full mt-6 mb-9" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            {plan?.id === "custom" ? <ContactForm user={user} /> : <>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Modules</label>
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 md:grid-cols-2 gap-x-12">
                                        {modules.map((module) => <CheckboxOption site={!!additionalSites} defaultChecked={modulesChecked.includes(module)} onChecked={a => setModulesChecked(b => a ? [...b, module] : b.filter(c => c.id !== module.id))} key={module.id} options={module} />)}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2 ml-1">Besoin d'autre chose ? <a className="underline" onClick={onClose} href="#contact">Nous contacter</a>.</p>
                                </div>
                                <p className="text-sm text-gray-800 mt-6">Sous total: {additionalSites ? <span className="text-xs text-gray-700">{modulesPrice.toFixed(2)} x {additionalSites + 1} =</span> : null} <span className="font-medium">{subtotalModules.toFixed(2)} €</span></p>
                                <div className="inset-0 flex items-center col-span-full mt-6 mb-9" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div>
                                    <label className="text-base font-medium text-gray-900">Résumé</label>
                                    <dl className="mt-4 text-sm grid md:grid-cols-2 gap-x-12 gap-y-4 [&_dd]:font-medium px-2">
                                        <div className="flex items-center justify-between">
                                            <dt>Sous total HT</dt>
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
                                        <div className="flex items-center justify-between">
                                            <dt>Début de l'abonnement</dt>
                                            <dd>{formatDate(Date.now() + (plan?.badge ? 1000 * 60 * 60 * 24 * 7 : 0))}</dd>
                                        </div>
                                    </dl>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-7 gap-8">
                                        {firstSubscription &&
                                            <div className="px-2 lg:flex items-center gap-6">
                                                <label htmlFor="affiliateCode" className="block mb-3 lg:mb-0 text-sm font-medium text-gray-700">
                                                    Code d'affiliation
                                                </label>
                                                <TextField
                                                    id="affiliateCode"
                                                    disabled={user?.affiliateCode}
                                                    defaultValue={user?.affiliateCode}
                                                />
                                            </div>
                                        }
                                        <div className="px-2 lg:flex items-center gap-6">
                                            <label htmlFor="coupon" className="block mb-3 lg:mb-0 text-sm font-medium text-gray-700">
                                                Code promo
                                            </label>
                                            <TextField
                                                id="coupon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <form className="flex flex-col gap-1 items-center mt-8" onSubmit={e => handleSubmit(e, plan, modulesChecked, additionalSites, addAlert)}>
                                    <Button
                                        color="gold"
                                        rounded="rounded-md"
                                        className="w-full sm:w-96"
                                        type="submit"
                                        name="submit">
                                        <PaypalLabel className="w-20" />
                                    </Button>
                                    <div>
                                        <span className="inline-block align-bottom text-xs text-gray-500 italic">Optimisé par</span><PaypalLabel className="ml-1.5 h-5 inline-block" />
                                    </div>
                                </form>
                            </>}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog >
    </Transition.Root >);
}

async function handleSubmit(e, plan, modules, additionalSites, addAlert) {
    e.preventDefault();
    e.target.submit.disabled = true;

    try {
        const subscription = await subscribe(plan._id, modules.map(a => a._id), additionalSites);
        window.open(subscription.approveUrl, "_blank", "popup");
    } catch (error) {
        addAlert({ type: "error", title: error.message || "Une erreur est survenue.", ephemeral: true });
        e.target.submit.disabled = false;
    }
}