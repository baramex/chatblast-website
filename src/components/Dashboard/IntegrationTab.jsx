import { fetchIntegrations } from "../../lib/service/integrations";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatDate, formatDay, formatDuration } from "../../lib/utils/date";
import { ShoppingCartIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { fetchSubscriptions } from "../../lib/service/subcriptions";
import { PaypalIcon } from "../Images/Icons";
import { Button } from "../Misc/Button";

export default function IntegrationTab({ addAlert }) {
    const [integrations, setIntegrations] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);

    useEffect(() => {
        (async () => {
            fetchIntegrations().then(setIntegrations).catch(a => addAlert({ type: "error", title: "Impossible de récupérer les intégrations: " + (a.message || "Une erreur est survenue."), ephemeral: true }));
            fetchSubscriptions().then(setSubscriptions).catch(a => addAlert({ type: "error", title: "Impossible de récupérer les souscriptions: " + (a.message || "Une erreur est survenue."), ephemeral: true }));
        })();
    }, []);

    console.log(integrations, subscriptions);
    const remaining = subscriptions?.map(a => a.plan.quantity + a.additionalSites).reduce((a, b) => a + b, 0) - integrations?.length;

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Intégrations</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 px-6 mt-5 flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 grid-rows-[repeat(auto-fill,12rem)] gap-14 w-full lg:w-2/3 2xl:w-3/4">
                {
                    integrations && integrations.map(integration => (
                        <button className="ease-out transition-all hover:-translate-y-0.5 px-5 py-4 text-left outline-none rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-300" key={integration._id}>
                            <div className="h-full flex flex-col">
                                <div className="flex items-center mb-2">
                                    <h3 className="flex-1 text-lg font-medium">{integration.name}</h3>
                                    <span className={clsx("inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium", integration.state === 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800")}>
                                        <svg className={clsx("mr-1.5 h-2 w-2", integration.state === 0 ? "text-red-500" : "text-green-500")} fill="currentColor" viewBox="0 0 8 8">
                                            <circle cx={4} cy={4} r={4} />
                                        </svg>
                                        {integration.state === 0 ? "inactif" : "actif"}
                                    </span>
                                </div>

                                <div className="px-1 flex-1 flex flex-col">
                                    <div className="inset-0 flex items-center mb-2" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>

                                    <div className="flex flex-col flex-1">
                                        <p className="text-sm text-gray-700 flex-1">{integration.options.domain}</p>
                                        <div className="flex items-end text-gray-800 font-light">
                                            <span className="flex-1">{integration.subscription.plan.name}</span>
                                            <span className="text-sm">Créée il y a {formatDuration(integration.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                }
                <button
                    type="button"
                    className="ease-out transition-all hover:-translate-y-0.5 rounded-2xl border-2 border-dashed border-gray-300 p-12 pb-10 hover:border-gray-400 outline-none"
                >
                    <SquaresPlusIcon className="mx-auto h-12 w-12 stroke-1 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600">Créer une nouvelle intégration</span>
                    <span className="mt-1 block text-xs text-gray-500">{remaining} Disponible{remaining > 1 && "s"}</span>
                </button>
            </div>
            <div className="relative flex-1 w-full lg:w-1/3 2xl:w-1/4">
                <div className="rounded-2xl bg-gray-50 w-full px-5 py-4 h-full lg:absolute">
                    <h3 className="font-medium text-lg">Souscriptions</h3>
                    <div className="inset-0 flex items-center m-2 ml-0" aria-hidden="true">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="flex flex-col gap-5 mt-4">
                        {
                            subscriptions && subscriptions.map(subscription => (
                                <details className="group" key={subscription._id}>
                                    <summary className="marker:text-gray-500 border transition-colors border-gray-200 hover:border-gray-300 w-full text-left rounded-lg px-3 py-2 group-open:rounded-b-none outline-none">
                                        <div className="inline">
                                            <p className="inline">{subscription.plan.name}</p>
                                            <span className={clsx("float-right flex items-center rounded-lg px-3 py-1.5 text-xs font-medium", (subscription.state === 0 || !subscription.autorenew) ? "bg-red-100 text-red-800" : subscription.state === 1 ? "bg-green-100 text-green-800" : "bg-stone-300 text-stone-800")}>
                                                <svg className={clsx("mr-1.5 h-2 w-2", !subscription.autorenew ? "text-red-500" : ["text-red-500", "text-green-500", "text-stone-600"][subscription.state])} fill="currentColor" viewBox="0 0 8 8">
                                                    <circle cx={4} cy={4} r={4} />
                                                </svg>
                                                {!subscription.autorenew ? "résilation" : ["arrêté", "actif", "expiré"][subscription.state]}
                                            </span>
                                        </div>
                                        <div className="flex items-end text-gray-900 mt-5">
                                            <p className="flex-1">{subscription.plan.price} €<span className="font-normal text-xs text-gray-800"> /mois</span></p>
                                            <span className={clsx("text-xs", !subscription.autorenew ? "text-red-600" : "text-gray-800")}>{!subscription.autorenew ? formatDuration(subscription.expires) + " restants" : formatDay(subscription.expires)}</span>
                                        </div>
                                    </summary>
                                    <div className="bg-gray-100 p-3 border-b border-x border-gray-200 rounded-b-xl">
                                        <div className="flex gap-1 items-center">
                                            <div className="px-2 py-1 bg-white rounded-xl">
                                                <PaypalIcon className="w-5 inline" />
                                                <span className="text-sm text-gray-800 ml-1">contact@baramex.me</span>
                                            </div>
                                            <div className="flex-1"></div>
                                            <Button
                                                variant="outline"
                                                color={subscription.autorenew ? "red" : "green"}
                                                padding="px-3 py-1"
                                                rounded="rounded-xl"
                                            >{subscription.autorenew ? "Résilier" : "Reprendre"}</Button>
                                        </div>
                                        <div className="flex mt-3 items-center">
                                            <Button
                                                variant="outline"
                                                padding="px-3 py-1"
                                                className="bg-gray-50"
                                                rounded="rounded-xl"
                                            >
                                                Changer d'offre
                                            </Button>
                                            <div className="flex-1"></div>
                                            <span className="text-xs text-gray-800">Payé le {formatDate(new Date("2022-11-01"))}</span>
                                        </div>
                                    </div>
                                </details>
                            ))
                        }
                        <button
                            type="button"
                            className="ease-out transition-colors rounded-lg border-2 border-dashed border-gray-300 py-2 hover:border-gray-400 outline-none w-full text-gray-500 hover:text-gray-600"
                        >
                            <ShoppingCartIcon className="h-6 w-6 inline stroke-1" />
                            <span className="ml-3 text-sm font-medium">Commander</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}