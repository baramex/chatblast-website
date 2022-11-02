import { pacthUser } from "../../lib/service/profile";
import { fieldPattern, handleFieldInput, handleLastnameInput, handleNameInput, lastnamePattern, namePattern } from "../../lib/utils/regex";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AlertError } from "../Misc/Alerts";
import { Button } from "../Misc/Button";
import { Label, TextField } from "../Misc/Fields";

export default function ProfileTab({ user, setUser, addAlert }) {
    const [error, setError] = useState(null);

    return (<>
        <div className="px-5">
            <h1 className="text-2xl font-semibold text-gray-900">Profil</h1>
        </div>
        <div className="px-6 mt-5 max-w-4xl">
            <form onSubmit={e => handleSave(e, user, setError, addAlert, setUser)}>
                <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-full sm:col-span-2">
                        <Label>Photo</Label>
                        <div className="mt-1 flex items-center">
                            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <img src={user.avatar} className="object-cover aspect-square inline" alt="avatar" />
                            </span>
                            <Button type="button" variant="outline" rounded="rounded-md" className="ml-5">
                                Modifier
                            </Button>
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-3">
                        <TextField
                            label="Nom d'utilisateur"
                            name="username"
                            id="username"
                            maxLength="32"
                            minLength="2"
                            pattern={fieldPattern}
                            defaultValue={user.username}
                            onInput={handleFieldInput}
                            required
                        />
                    </div>

                    <div className="col-span-full sm:col-span-2">
                        <TextField
                            label="Prénom"
                            name="firstname"
                            id="firstname"
                            maxLength="32"
                            minLength="2"
                            pattern={namePattern}
                            defaultValue={user.name.firstname}
                            onInput={handleNameInput}
                            required
                        />
                    </div>

                    <div className="col-span-full sm:col-span-3">
                        <TextField
                            label="Nom"
                            name="lastname"
                            id="lastname"
                            maxLength="32"
                            minLength="2"
                            pattern={lastnamePattern}
                            defaultValue={user.name.lastname}
                            onInput={handleLastnameInput}
                            required
                        />
                    </div>

                    <div className="col-span-full">
                        <Label>Adresse email</Label>
                        <div className="flex flex-col sm:flex-row gap-7">
                            <TextField
                                name="email"
                                id="email"
                                type="email"
                                className="w-full"
                                defaultValue={user.email.address}
                                required
                            />

                            <Button type="button" variant="outline" color={user.email.isVerified ? "green" : "amber"} rounded="rounded-md" className="w-full sm:w-28" disabled={user.email.isVerified}>
                                {user.email.isVerified ? <><CheckIcon className="mr-2 w-5" /> Vérifiée</> : <><ExclamationCircleIcon className="mr-2 w-5" /> Vérifier</>}
                            </Button>
                        </div>
                    </div>

                    {error && <AlertError className="col-span-full" title={error} onClose={() => setError(null)} />}

                    <div className="mt-5 col-span-full sm:mx-auto">
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

async function handleSave(e, user, setError, addAlert, setUser) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, button, select");
    elements.forEach(el => el.disabled = true);

    const firstname = e.target.firstname.value.trim();
    const lastname = e.target.lastname.value.trim();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();

    try {
        if (firstname !== user.name.firstname || lastname !== user.name.lastname || username !== user.username || email !== user.email.address) {
            const user = await pacthUser({ email: { address: email }, firstname, lastname, username });
            setUser(user);
        }
        addAlert({ type: "success", title: "Profil mis à jour", ephemeral: true });
        setError(null);
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
    } finally {
        elements.forEach(el => el.disabled = false);
    }
}