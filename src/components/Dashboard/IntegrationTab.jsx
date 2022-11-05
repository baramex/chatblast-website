import { fetchIntegrations } from "../../lib/service/integrations";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatDuration } from "../../lib/utils/date";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

export default function IntegrationTab() {
    const [integrations, setIntegrations] = useState([]);

    useEffect(() => {
        (async () => {
            const inte = await fetchIntegrations();
            setIntegrations(inte);
        })();
    }, []);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Intégrations</h2>
        </div>
        <div className="px-6 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
            {
                integrations.map(integration => (
                    <button className="ease-out transition-all hover:-translate-y-0.5 px-5 py-4 text-left outline-none rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-300" key={integration._id}>
                        <div className="flex items-center mb-2">
                            <p className="flex-1 text-lg font-medium">{integration.name}</p>
                            <span className={clsx("inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium", integration.state === 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800")}>
                                <svg className={clsx("mr-1.5 h-2 w-2", integration.state === 0 ? "text-red-500" : "text-green-500")} fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx={4} cy={4} r={4} />
                                </svg>
                                {integration.state === 0 ? "inactif" : "actif"}
                            </span>
                        </div>

                        <div className="px-1">
                            <div className="inset-0 flex items-center mb-2" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>

                            <p className="text-sm text-gray-700">{integration.options.domain}</p>
                            <div className="mt-11 flex text-gray-800 font-light">
                                <span className="flex-1">Plan avancé</span>
                                <span className="text-sm">Créée il y a {formatDuration(integration.date)}</span>
                            </div>
                        </div>
                    </button>
                ))
            }
            <button
                type="button"
                className="ease-out transition-all hover:-translate-y-0.5 rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 outline-none"
            >
                <SquaresPlusIcon className="mx-auto h-12 w-12 stroke-1 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-600">Créer une nouvelle intégration</span>
            </button>
        </div>
    </>);
}