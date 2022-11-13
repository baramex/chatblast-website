import { verifyIntegrationDomain } from "../../lib/service/vertification";
import { CheckIcon, ClockIcon, MinusCircleIcon, PlayIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { domainPattern, handleIntegrationNameInput, integrationNamePattern } from "../../lib/utils/regex";
import { Button } from "../Misc/Button";
import Code from "../Misc/Code";
import { Label, TextField } from "../Misc/Fields";
import { updateIntegration } from "../../lib/service/integrations";
import useBeforeUnload from "../../lib/hooks/useBeforeUnload";

export default function GeneralTab({ integration, setData, addAlert }) {
    const form = useRef(null);

    useBeforeUnload({
        message: "Voulez-vous vraiment quitter cette page ? Les modifications non enregistrées seront perdues.",
        when: () => form.current ? Array.from(form.current.querySelectorAll("input")).some(a => a.hasAttribute("changed")) : false
    });

    const domain = integration?.options.domain.value;
    const checkowner = domain ? new Array(domain.length).fill(0).map((a, i) => domain.charCodeAt(i)).reduce((a, b) => a + b, 0) + integration._id : undefined;

    return (<div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="col-span-2">
            <div className="px-5">
                <h2 className="text-2xl font-semibold text-gray-900">Informations générales</h2>
            </div>
            <div className="px-6 mt-5">
                <div className="max-w-3xl">
                    <form ref={form} onSubmit={e => handleSave(e, integration._id, setData, addAlert)}>
                        <div className="grid grid-cols-4 gap-6">
                            <div className="col-span-full sm:col-span-3">
                                <TextField
                                    label="Nom d'application"
                                    name="name"
                                    id="name"
                                    maxLength="32"
                                    minLength="2"
                                    pattern={integrationNamePattern}
                                    defaultValue={integration?.name}
                                    onInput={handleIntegrationNameInput}
                                    required
                                />
                            </div>

                            <div className="col-span-full sm:col-span-1">
                                <Label>Status</Label>
                                <Button
                                    color={integration?.state === 0 ? "red" : "green"}
                                    variant="outline"
                                    rounded="rounded-md"
                                    className="w-full"
                                    padding="px-3 py-2.5"
                                    type="button"
                                    disabled>
                                    {integration?.state === 0 ? <>Désactivé</> : <><CheckIcon className="mr-2 w-5" /> Activé</>}
                                </Button>
                            </div>

                            <div className="col-span-full">
                                <Label>Nom de domaine</Label>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <TextField
                                        name="domain"
                                        id="domain"
                                        className="flex-1"
                                        maxLength="128"
                                        pattern={domainPattern}
                                        defaultValue={integration?.options.domain.value}
                                        title="Le nom de domaine doit être sous la forme de example.com."
                                        required
                                    />
                                    <Button
                                        color={integration?.options.domain.isVerified ? "green" : "amber"}
                                        variant="outline"
                                        rounded="rounded-md"
                                        padding="px-5 py-2.5"
                                        type="button"
                                        disabled>
                                        {integration?.options.domain.isVerified ? <><CheckIcon className="mr-2 w-5" /> Vérifié</> : <><ClockIcon className="mr-2 w-5" /> Vérification en attente</>}
                                    </Button>
                                </div>
                                {!integration?.options.domain.isVerified &&
                                    <div className="mt-3 mx-2">
                                        <p className="text-gray-800 font-medium">Vérification DNS</p>
                                        <ol className="text-gray-700 text-sm list-decimal px-7 mt-1">
                                            <li>Rendez-vous sur le site fournisseur de votre domain (ex: OVH, GoDaddy...).</li>
                                            <li>Allez dans la partie <i>zone DNS</i>.</li>
                                            <li>Ajoutez une entrée <Code>TXT</Code> avec la valeur <Code>chatblast-checkowner={checkowner}</Code>.</li>
                                            <li><Button onClick={() => handleDomainVerification(form.current.verifDNS, integration, form.current.domain?.value, setData, addAlert)} name="verifDNS" type="button" color="emerald" padding="py-1 px-3">Vérifier</Button></li>
                                        </ol>
                                    </div>
                                }
                            </div>

                            <div className="inset-0 flex items-center col-span-full mt-5 hidden sm:block" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>

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
            </div>
        </div>
        <div className="col-span-2 row-start-2">
            <div className="px-5">
                <h2 className="text-2xl font-semibold text-gray-900">Actions</h2>
            </div>
            <div className="mt-5 w-full sm:max-w-lg grid grid-cols-1 sm:grid-cols-2 py-3 px-6 gap-x-8 gap-y-3">
                <Button
                    color="green"
                    disabled={!integration?.options.domain.isVerified || integration?.state === 1}>
                    <PlayIcon className="w-5 mr-1" /> Activer
                </Button>
                <Button
                    color="red"
                    disabled={integration?.state === 0}>
                    <XCircleIcon className="w-5 mr-2" /> Désactiver
                </Button>
            </div>
        </div>
        <div className="row-span-2">
            <div className="px-5">
                <h2 className="text-2xl font-semibold text-gray-900">Souscription</h2>
            </div>
            <div className="px-6 mt-5">
                <div className="flex justify-between items-center">
                    <span className="text-gray-800">{integration?.subscription?.plan?.name}</span>
                    <Button variant="outline">Changer d'offre</Button>
                </div>
                <div className="mt-5">
                    <h3 className="text-lg">Modules complémentaires</h3>
                    <div className="mt-3 flex flex-col gap-4 px-1">
                        {
                            integration?.subscription?.modules?.map(module => (
                                <div className="rounded-lg border-gray-200 border bg-gray-50 p-3" key={module.name}>
                                    <div className="flex justify-between items-center">
                                        <p>{module.name}</p>
                                        <button><MinusCircleIcon className="w-6 text-red-500 hover:text-red-600 active:fill-red-50" /></button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 px-1">{module.description}</p>
                                    <div className="flex justify-end mt-1">
                                        <span className="text-gray-800 text-sm">{module.price.toFixed(2)} €</span>
                                    </div>
                                </div>
                            ))
                        }
                        <button className="ease-out transition-colors rounded-lg border-2 border-dashed border-gray-300 py-2 hover:border-gray-400 outline-none w-full text-gray-500 hover:text-gray-600">
                            <PlusCircleIcon className="w-6 mr-1 stroke-1 inline" />
                            <span className="ml-3 text-sm font-medium">Ajouter un module</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

async function handleSave(e, integrationId, setData, addAlert) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, select, button:not([disabled])");
    elements.forEach(el => el.disabled = true);

    try {
        const data = await updateIntegration(integrationId, {
            name: e.target.name.value,
            options: {
                domain: {
                    value: e.target.domain.value,
                }
            }
        });

        setData(prev => {
            prev.integrations = prev.integrations.map(a => a._id === integrationId ? data : a);
            return prev;
        });

        addAlert({ type: "success", title: "Les informations ont été mises à jour.", ephemeral: true });
    } catch (error) {
        addAlert({ title: error.message, type: "error", ephemeral: true });
    }
    finally {
        elements.forEach(el => el.disabled = false);
    }
}

async function handleDomainVerification(button, integration, domain, setData, addAlert) {
    if (domain !== integration?.options.domain.value) return addAlert({ type: "warning", title: "Enregistrez les modifications avant de vérifier le domaine.", ephemeral: true });

    button.disabled = true;

    try {
        await verifyIntegrationDomain(integration._id);
        setData(prev => {
            prev.integrations = prev.integrations.map(a => {
                if (a._id === integration._id) a.options.domain.isVerified = true;
                return a;
            });
            return prev;
        });
        addAlert({ type: "success", title: "Le domaine a été vérifié.", ephemeral: true });
    } catch (error) {
        addAlert({ title: error.message, type: "error", ephemeral: true });
    } finally {
        button.disabled = false;
    }
}