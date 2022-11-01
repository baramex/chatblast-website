import { pacthUser } from "../../lib/service/profile";
import { handleFieldChange, handleLastnameChange, handleNameChange } from "../../lib/utils/regex";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AlertError } from "../Misc/Alerts";
import { Button } from "../Misc/Button";
import { Label, TextField } from "../Misc/Fields";

export default function ProfileTab({ user, setUser }) {
    const [error, setError] = useState(null);

    return (<>
        <div className="px-5">
            <h1 className="text-2xl font-semibold text-gray-900">Profil</h1>
        </div>
        <div className="px-6 mt-5 max-w-4xl">
            <form onSubmit={e => handleSave(e, setError, setUser)}>
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
                            onChange={handleFieldChange}
                            maxLength="32"
                            defaultValue={user.username}
                        />
                    </div>

                    <div className="col-span-full sm:col-span-2">
                        <TextField
                            label="Prénom"
                            name="firstname"
                            id="firstname"
                            onChange={handleNameChange}
                            maxLength="32"
                            defaultValue={user.name.firstname}
                        />
                    </div>

                    <div className="col-span-full sm:col-span-3">
                        <TextField
                            label="Nom"
                            name="lastname"
                            id="lastname"
                            onChange={handleLastnameChange}
                            maxLength="32"
                            defaultValue={user.name.lastname}
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

async function handleSave(e, setError, setUser) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, button, select");
    elements.forEach(el => el.disabled = true);

    const firstname = e.target.firstname.value.trim();
    const lastname = e.target.lastname.value.trim();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();

    try {
        const user = await pacthUser({ email: { address: email }, firstname, lastname, username });
        setError(null);
        setUser(user);
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
    } finally {
        elements.forEach(el => el.disabled = false);
    }
}