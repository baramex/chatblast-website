import { updateIntegration } from "../../lib/service/integrations";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { keyPattern, urlPattern } from "../../lib/utils/regex";
import { SelectField, TextField } from "../Misc/Fields";
import Code from "../Misc/Code";
import { Button } from "../Misc/Button";
import useBeforeUnload from "../../lib/hooks/useBeforeUnload";
import { AlertError } from "../Misc/Alerts";

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
    const [error, setError] = useState(null);
    const form = useRef(null);

    useEffect(() => {
        if (!authentification && integration) setAuthentification(authentifications[integration?.type]);
    }, [integration]);

    useEffect(() => {
        (async () => {
            if (integration) {
                const index = authentifications.indexOf(authentification);
                if (integration.type !== index && index !== -1) {
                    try {
                        const nintegration = await updateIntegration(integration._id, { type: index });
                        setData(prev => {
                            prev.integrations = prev.integrations.map(a => a._id === integration._id ? nintegration : a);
                            return prev;
                        });
                        addAlert({ type: "success", title: "Le type d'authenfication a été mis à jour.", ephemeral: true });
                    } catch (e) {
                        if (index === 1) {
                            addAlert({ type: "warning", title: "Effectuez les modifications puis enregistrez.", ephemeral: true });
                            setError(e.message || "Une erreur est survenue.");

                            Array.from(form.current?.querySelectorAll("input, select")).reverse().forEach(a => a.reportValidity());
                        }
                        else {
                            addAlert({ type: "error", title: "Impossible de mettre à jour l'intégration: " + (e.message || "Une erreur est survenues."), ephemeral: true })
                            setAuthentification(authentifications[integration?.type]);
                        }
                    }
                }
            }
        })();
    }, [authentification]);

    useBeforeUnload({
        message: "Voulez-vous vraiment quitter cette page ? Les modifications non enregistrées seront perdues.",
        when: () => (form.current ? Array.from(form.current.querySelectorAll("input,select")).some(a => a.hasAttribute("changed")) : false) || integration?.type !== authentifications.indexOf(authentification)
    });

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Authentification</h2>
        </div>
        <div className="px-6 mt-5 max-w-4xl">
            <RadioGroup value={authentification} onChange={setAuthentification}>
                <RadioGroup.Label className="text-base font-medium text-gray-900">Type</RadioGroup.Label>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {authentifications.map((p) => <RadioOption key={p.id} options={p} cannot={!integration?.subscription?.plan?.details.customAuth && p.id === "custom"} />)}
                </div>
            </RadioGroup>
            {
                authentification?.id === "custom" && <div className="mt-6">
                    <h3 className="font-medium text-xl text-gray-900">Configuration route api utilisateur</h3>
                    <form ref={form} onSubmit={e => handleSave(e, integration._id, setData, addAlert, setError)} className="mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <TextField
                                label="Route API"
                                name="route"
                                id="route"
                                tooltip="La route API est l'URL de votre API qui permet de récupérer les informations d'un utilisateur à partir de son token d'accès (méthode GET). Elle sera utilisée par l'API de ChatBlast lors des connexions de client à la chatbox avec un token provenant de votre site. La réponse doit être négative (400-499) si un token est invalide, et doit éviter de renvoyer des codes 429. Protocol HTTPS imposé et doit provenir du même domaine que celui vérifié."
                                maxLength="128"
                                pattern={urlPattern}
                                showChanged={true}
                                defaultValue={integration?.options.customAuth?.route}
                                placeholder="https://api.example.com/user/@me"
                                required
                            />
                            <TextField
                                label="Clé API"
                                name="apiKey"
                                id="apiKey"
                                maxLength="128"
                                optinal="si nécessaire"
                                showChanged={true}
                                tooltip={<>Si votre API est restreinte par une clé. Elle sera transmise en query <Code>key</Code> de la requête.</>}
                                defaultValue={integration?.options.customAuth?.apiKey}
                            />
                            <SelectField
                                label="Emplacement du token"
                                name="tokenPlace"
                                id="tokenPlace"
                                tooltip="L'endroit où sera inséré le token dans la requête."
                                defaultValue={integration?.options.customAuth?.token.place.toString()}
                                showChanged={true}
                                required
                            >
                                <option value={0}>En autorisation dans le header</option>
                                <option value={1}>Dans la query</option>
                            </SelectField>
                            <TextField
                                label="Nom de la clé du token"
                                name="tokenKey"
                                id="tokenKey"
                                maxLength="64"
                                pattern={keyPattern}
                                placeholder="token"
                                showChanged={true}
                                tooltip="La clé du token pour la query, ou le type de token pour l'autorisation (Authorization)."
                                defaultValue={integration?.options.customAuth?.token.key}
                                required
                            />

                            <div className="inset-0 flex items-center col-span-full mt-5 hidden sm:block" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>

                            {error && <AlertError className="col-span-full" title={error} onClose={() => setError(null)} />}

                            <div className="col-span-full sm:mx-auto mt-3 sm:mt-0">
                                <Button
                                    color="emerald"
                                    type="submit"
                                    className="w-full sm:w-40"
                                >
                                    Enregistrer
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    </>)
}

async function handleSave(e, integrationId, setData, addAlert, setError) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, select, button:not([disabled])");
    elements.forEach(el => el.disabled = true);

    try {
        const data = await updateIntegration(integrationId, {
            type: 1,
            options: {
                customAuth: {
                    route: e.target.route.value,
                    apiKey: e.target.apiKey.value,
                    token: {
                        place: Number(e.target.tokenPlace.value),
                        key: e.target.tokenKey.value
                    }
                }
            }
        });

        setData(prev => {
            prev.integrations = prev.integrations.map(a => a._id === integrationId ? data : a);
            return prev;
        });

        addAlert({ type: "success", title: "Les informations ont été mises à jour.", ephemeral: true });
        setError(null);
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
    }
    finally {
        elements.forEach(el => el.disabled = false);
    }
}