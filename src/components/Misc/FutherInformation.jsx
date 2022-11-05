import { pacthUser } from "../../lib/service/profile";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Button } from "./Button";
import { TextField } from "./Fields";
import { fieldPattern, handleLastnameInput, handleNameInput, isLastname, isName, lastnamePattern, namePattern } from "../../lib/utils/regex";
import { AlertError } from "./Alerts";
import { logoutUser } from "../../lib/service/authentification";

export default function FutherInformationModal({ open, onSaved, email, firstname, lastname }) {
    const [error, setError] = useState(null);

    return (
        <Transition.Root show={open} as={Fragment} onClose={() => { }}>
            <Dialog as="div" className="relative z-10">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur transition-opacity" />
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                        <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Informations complémentaires
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form
                                                onSubmit={(e) => handleSave(e, setError, onSaved)}
                                                className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
                                            >
                                                {(!firstname || !lastname) && <>
                                                    <TextField
                                                        label="Prénom"
                                                        id="fistname"
                                                        name="fistname"
                                                        type="text"
                                                        maxLength="32"
                                                        minLength="2"
                                                        autoComplete="given-name"
                                                        pattern={namePattern}
                                                        onInput={handleNameInput}
                                                        required
                                                    />
                                                    <TextField
                                                        label="Nom"
                                                        id="lastname"
                                                        name="lastname"
                                                        type="text"
                                                        maxLength="32"
                                                        minLength="2"
                                                        autoComplete="family-name"
                                                        pattern={lastnamePattern}
                                                        onInput={handleLastnameInput}
                                                        required
                                                    />
                                                </>
                                                }
                                                {!email &&
                                                    < TextField
                                                        className="col-span-full"
                                                        label="Adresse email"
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        required
                                                    />
                                                }
                                                {error && <AlertError className="mb-5 col-span-full" title={error} onClose={() => setError(null)} />}
                                                <div className="col-span-full mt-3 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        color="red"
                                                        className="w-full"
                                                        rounded="rounded-md"
                                                        onClick={() => handleLogout(onSaved)}
                                                    >
                                                        <span>
                                                            Se déconnecter
                                                        </span>
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        name="submit"
                                                        variant="solid"
                                                        color="emerald"
                                                        className="w-full"
                                                        rounded="rounded-md"
                                                    >
                                                        <span>
                                                            Enregistrer
                                                        </span>
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

async function handleSave(e, setError, onSaved) {
    e.preventDefault();

    const email = e.target.email?.value;
    const firstname = e.target.fistname?.value;
    const lastname = e.target.lastname?.value;

    if (firstname && !isName(firstname)) return setError("Le prénom n'est pas valide.");
    if (lastname && !isLastname(lastname)) return setError("Le nom n'est pas valide.");

    const elements = e.target.querySelectorAll("input, textarea, button, select");
    elements.forEach(el => el.disabled = true);
    try {
        const newUser = await pacthUser({ email: { address: email }, name: { firstname, lastname } });
        setError(null);
        onSaved(newUser);
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
        elements.forEach(el => el.disabled = false);
    }
}

async function handleLogout(onSaved) {
    await logoutUser().catch(() => { });
    onSaved(null);
    window.location.href = "/";
}