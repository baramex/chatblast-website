import { verifyIntegrationDomain } from "../../lib/service/vertification";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { domainPattern, handleIntegrationNameInput, integrationNamePattern } from "../../lib/utils/regex";
import { Button } from "../Misc/Button";
import Code from "../Misc/Code";
import { Label, TextField } from "../Misc/Fields";
import { updateIntegration } from "../../lib/service/integrations";

export default function GeneralTab({ integration, setData, addAlert }) {
    const domain = useRef(null);
    const buttonVerif = useRef(null);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Informations générales</h2>
        </div>
        <div className="px-6 mt-5">
            <form onSubmit={e => handleSave(e, integration._id, setData, addAlert)} className="max-w-3xl">
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
                                forwardRef={domain}
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
                                    <li>Ajoutez une entrée <Code>TXT</Code> avec la valeur <Code>chatblast-checkowner={integration?._id}</Code>.</li>
                                    <li><Button forwardRef={buttonVerif} onClick={() => handleDomainVerification(buttonVerif.current, integration, domain.current?.value, setData, addAlert)} type="button" color="emerald" padding="py-1 px-3">Vérifier</Button></li>
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
    </>);
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