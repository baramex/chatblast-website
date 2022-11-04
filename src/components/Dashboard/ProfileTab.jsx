import { pacthUser, verifEmailSend } from "../../lib/service/profile";
import { fieldPattern, getPasswordErrors, handleFieldInput, handleLastnameInput, handleNameInput, lastnamePattern, namePattern, passwordPattern } from "../../lib/utils/regex";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AlertError } from "../Misc/Alerts";
import { Button } from "../Misc/Button";
import { Label, TextField } from "../Misc/Fields";
import { uploadAvatar } from "../../lib/service/authentification";
import { convertImageToDataURL } from "../../lib/utils/file";

export default function ProfileTab({ user, setUser, addAlert }) {
    const [error, setError] = useState(null);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Profil</h2>
        </div>
        <div className="px-6 mt-5 max-w-5xl">
            <form onSubmit={e => handleSave(e, user, setError, addAlert, setUser)}>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-full sm:col-span-2">
                        <Label>Photo</Label>
                        <div className="mt-1 flex items-center gap-5">
                            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                <img src={user.avatar} className="object-cover aspect-square inline" alt="avatar" />
                            </span>
                            <input id="avatar" name="avatar" type="file" accept=".png,.jpg,.jpeg" onInput={e => handleAvatarChange(e, setError, addAlert, setUser)} hidden />
                            <label htmlFor="avatar">
                                <Button type="button" variant="outline" rounded="rounded-md" as="div">
                                    Modifier
                                </Button>
                            </label>
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-4">
                        <TextField
                            label="Nom d'utilisateur"
                            name="username"
                            id="username"
                            maxLength="32"
                            minLength="2"
                            pattern={fieldPattern}
                            defaultValue={user.username}
                            title="Votre pseudo doit contenir au moins 2 caractères."
                            onInput={handleFieldInput}
                            required
                        />
                    </div>

                    <div className="col-span-full sm:col-span-3">
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

                    <div className="col-span-full sm:col-span-2">
                        <TextField
                            label="Mot de passe"
                            name="password"
                            id="password"
                            type="password"
                            onChange={(e) => handlePasswordChange(e, setError)}
                            maxLength="32"
                            minLength="6"
                            pattern={passwordPattern}
                        />
                    </div>

                    <div className="col-span-full sm:col-span-4">
                        <Label id="email">Adresse email</Label>
                        <div className="flex flex-col sm:flex-row gap-7">
                            <TextField
                                name="email"
                                id="email"
                                type="email"
                                className="w-full"
                                defaultValue={user.email.address}
                                required
                            />

                            <Button type="button" variant="outline" color={user.email.isVerified ? "green" : "amber"} rounded="rounded-md" className="w-full sm:w-28" onClick={user.email.isVerified ? null : e => handleSendMail(e, setError, addAlert)} disabled={user.email.isVerified}>
                                {user.email.isVerified ? <><CheckIcon className="mr-2 w-5" /> Vérifiée</> : <><ExclamationCircleIcon className="mr-2 w-5" /> Vérifier</>}
                            </Button>
                        </div>
                    </div>

                    <div className="inset-0 flex items-center col-span-full mt-5 hidden sm:block" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>

                    {error && <AlertError className="col-span-full" title={typeof error == "string" ? error : error[0]} list={Array.isArray(error) ? error.slice(1) : undefined} canClose={typeof error == "string"} onClose={() => setError(null)} />}

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

function handlePasswordChange(e, setError) {
    if(!e.target.value) return setError(null);
    const errors = getPasswordErrors(e.target.value);

    if (errors.length == 0) return setError(null);
    setError(["Le mot de passe ne respecte pas ces critères", ...errors]);
}

async function handleSave(e, user, setError, addAlert, setUser) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, select");
    elements.forEach(el => el.disabled = true);

    const firstname = e.target.firstname.value.trim();
    const lastname = e.target.lastname.value.trim();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
        if (firstname !== user.name.firstname || lastname !== user.name.lastname || username !== user.username || email !== user.email.address || password) {
            const user = await pacthUser({ email: { address: email }, firstname, lastname, username, password });
            setUser(a => ({ ...a, ...user }));
        }
        e.target.password.value = "";
        addAlert({ type: "success", title: "Profil mis à jour.", ephemeral: true });
        setError(null);
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
    } finally {
        elements.forEach(el => el.disabled = false);
    }
}

async function handleAvatarChange(e, setError, addAlert, setUser) {
    const file = e.target.files[0];
    if (file) {
        if (file.size >= 500_000) {
            e.preventDefault();
            return setError("Votre photo de profil est trop lourde, 0.5 Mo max.");
        }
        if (!["png", "jpeg", "jpg"].map(a => "image/" + a).includes(file.type)) {
            e.preventDefault();
            return setError("L'image doit être au format PNG, JPEG ou JPG.");
        }

        try {
            await uploadAvatar(file);
            const data = await convertImageToDataURL(file);
            setUser(a => ({ ...a, avatar: data }));
            addAlert({ type: "success", title: "Photo de profil enregistrée.", ephemeral: true });
            setError(null);
        } catch (error) {
            setError(error.message || "Une erreur est survenue.");
            e.preventDefault();
        }
    }
}

async function handleSendMail(e, setError, addAlert) {
    e.disabled = true;
    try {
        await verifEmailSend();
        addAlert({ type: "success", title: "Un email de vérification vous a été envoyé.", ephemeral: true });
        setError(null);
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
    } finally {
        e.disabled = false;
    }
}