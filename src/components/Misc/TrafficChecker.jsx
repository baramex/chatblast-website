import { fetchWebsiteTraffic } from "../../lib/service/misc";
import { Dialog, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Button } from "./Button";
import { TextField } from "./Fields";
import { domainPattern } from "../../lib/utils/regex";

export default function TrafficChecker({ open, addAlert, onClose }) {
    const [traffic, setTraffic] = useState(undefined);
    const [domain, setDomain] = useState(undefined);

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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white p-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl mx-8">
                            <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 text-center">
                                Tester le trafic d'un site web
                            </Dialog.Title>
                            <form onSubmit={e => handleSubmit(e, setDomain, setTraffic, addAlert)}>
                                <TextField
                                    id="domain"
                                    label="Nom de domaine"
                                    className="mt-4"
                                    pattern={domainPattern}
                                    required
                                />
                                {(traffic !== undefined && domain !== undefined) ? <p className="text-emerald-600 text-sm mt-2"><strong className="font-semibold">{domain}</strong> a approximativement {traffic} visiteurs uniques par mois.</p> : null}
                                <div className="flex justify-center mt-4">
                                    <Button color="emerald" name="submit" type="submit"><PlayIcon className="w-4 mr-2" /> Lancer le test</Button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog >
    </Transition.Root >);
}

async function handleSubmit(e, setDomain, setTraffic, addAlert) {
    e.preventDefault();
    e.target.submit.disabled = true;

    try {
        const res = await fetchWebsiteTraffic(e.target.domain.value);
        setDomain(e.target.domain.value);
        setTraffic(res.monthlyVisitors);
    } catch (error) {
        addAlert({
            type: "error",
            title: error.message || "Une erreur est survenue.",
            ephemeral: true
        });
    } finally {
        e.target.submit.disabled = false;
    }
}