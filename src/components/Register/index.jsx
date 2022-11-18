import { AuthLayout } from '../Misc/AuthLayout'
import { Button } from '../Misc/Button'
import { TextField } from '../Misc/Fields'
import logo from '../../images/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { fieldPattern, getPasswordErrors, handleFieldInput, handleLastnameInput, handleNameInput, isPassword, lastnamePattern, namePattern, passwordPattern, referralCodePattern } from '../../lib/utils/regex'
import { AlertError } from '../Misc/Alerts'
import { useEffect, useState } from 'react'
import { registerUser } from '../../lib/service/authentification'

export default function Register({ user, setUser }) {
    const [error, setError] = useState(null);
    const history = useHistory();
    const redirect = new URLSearchParams(document.location.search).get("redirect");
    if (redirect && (!redirect.startsWith("/") || redirect.includes("http") || redirect.includes("."))) redirect = "";

    useEffect(() => {
        if (user) history.push("/dashboard/profile");
    }, []);

    if (user) return null;

    return (
        <>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link to="/" aria-label="Home">
                        <img src={logo} className="h-12 w-auto" />
                    </Link>
                    <div className="mt-16">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Créer un compte
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Déjà inscrit ?{' '}
                            <Link
                                to={"/login" + (redirect ? "?redirect=" + encodeURIComponent(redirect) : "")}
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Se connecter
                            </Link>.
                        </p>
                    </div>
                </div>
                <form
                    onSubmit={e => handleRegister(e, setError, setUser, redirect, history)}
                    className="mt-10 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2"
                >
                    <TextField
                        label="Prénom"
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="given-name"
                        maxLength="32"
                        minLength="2"
                        pattern={namePattern}
                        onInput={handleNameInput}
                        required
                    />
                    <TextField
                        label="Nom"
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="family-name"
                        maxLength="32"
                        minLength="2"
                        pattern={lastnamePattern}
                        onInput={handleLastnameInput}
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Nom d'utilisateur"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        maxLength="32"
                        minLength="2"
                        pattern={fieldPattern}
                        onInput={handleFieldInput}
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Adresse email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Mot de passe"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        onInput={(e) => handlePasswordInput(e, setError)}
                        maxLength="32"
                        minLength="6"
                        pattern={passwordPattern}
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Code d'affiliation"
                        id="referralCode"
                        name="referralCode"
                        maxLength="12"
                        minLength="12"
                        pattern={referralCodePattern}
                    />
                    {error && <AlertError className="col-span-full" title={typeof error == "string" ? error : error[0]} list={Array.isArray(error) ? error.slice(1) : undefined} canClose={typeof error == "string"} onClose={() => setError(null)} />}
                    <div className="col-span-full">
                        <Button
                            type="submit"
                            variant="solid"
                            color="emerald"
                            className="w-full"
                        >
                            <span>
                                Créer un compte <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}

function handlePasswordInput(e, setError) {
    const errors = getPasswordErrors(e.target.value);

    if (errors.length == 0) return setError(null);
    setError(["Le mot de passe ne respecte pas ces critères", ...errors]);
}

async function handleRegister(e, setError, setUser, redirect, history) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, button, select");
    elements.forEach(el => el.disabled = true);

    const firstname = e.target.firstname.value.trim();
    const lastname = e.target.lastname.value.trim();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const referralCode = e.target.referralCode.value.trim();

    if (!isPassword(password)) return;

    try {
        const user = await registerUser(email, firstname, lastname, username, password, null, referralCode);
        setError(null);
        setUser(user);

        history.push(redirect || "/dashboard/profile");
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
        elements.forEach(el => el.disabled = false);
    }
}