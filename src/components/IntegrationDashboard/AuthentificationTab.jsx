import { updateIntegration } from "../../lib/service/integrations";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";

const authentifications = [
    { id: "anonyme", title: "Anonyme", description: "L'authentification anonyme permet d'identifier directement les visiteurs de votre site, mais leur permette aussi de créer un compte sur ChatBlast afin d'avoir un profil utilisateur." },
    { id: "custom", title: "Customisée", description: "L'authentification customisée permet d'utiliser le profil utilisateur du membre connecté sur votre site pour l'authentifier sur ChatBlast." }
]

function RadioOption({ options, cannot }) {
    return (
        <RadioGroup.Option
            value={options}
            disabled={cannot}
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
                        <RadioGroup.Description as="span" className={clsx("mt-2 flex items-center text-sm", disabled ? "text-gray-400" : "text-gray-500")}>
                            {options.description}
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
                    cannot && <span className="text-gray-600 text-xs absolute -bottom-6 left-0 cursor-auto">Vous devez <button className="text-emerald-600 underline">changer de plan</button> pour y avoir accès.</span>
                }
            </>)
            }
        </RadioGroup.Option >
    );
}

export default function AuthentificationTab({ integration, setData, addAlert }) {
    const [authentification, setAuthentification] = useState(authentifications[integration?.type] || null);

    useEffect(() => {
        if (!authentification && integration) setAuthentification(authentifications[integration?.type]);
    }, [integration]);

    useEffect(() => {
        (async () => {
            if (integration) {
                const index = authentifications.indexOf(authentification);
                if (integration.type !== index) {
                    try {
                        const nintegration = await updateIntegration(integration._id, { type: index });
                        setData(prev => {
                            prev.integrations = prev.integrations.map(a => a._id === integration._id ? nintegration : a);
                            return prev;
                        });
                        addAlert({ type: "success", title: "Le type d'authenfication a été mis à jour.", ephemeral: true });
                    } catch (e) {
                        addAlert({ type: "error", title: "Impossible de mettre à jour l'intégration: " + (e.message || "Une erreur est survenues."), ephemeral: true })
                        setAuthentification(authentifications[integration?.type]);
                    }
                }
            }
        })();
    }, [authentification]);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Authentification</h2>
        </div>
        <div className="px-6 mt-5 max-w-4xl">
            <RadioGroup value={authentification} onChange={setAuthentification} className="mt-6">
                <RadioGroup.Label className="text-base font-medium text-gray-900">Type</RadioGroup.Label>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {authentifications.map((p) => <RadioOption key={p.id} options={p} cannot={!integration?.subscription?.plan?.details.customAuth && p.id === "custom"} />)}
                </div>
            </RadioGroup>
        </div>
    </>)
}