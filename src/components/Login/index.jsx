import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../Misc/Fields';
import { AuthLayout } from '../Misc/AuthLayout';
import { Button } from '../Misc/Button';
import { loginUser } from '../../lib/service/authentification';
import { useEffect, useState } from 'react';
import { AlertError } from '../Misc/Alerts';

export default function Login({ user, setUser }) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const redirect = new URLSearchParams(document.location.search).get("redirect");
    if (redirect && (!redirect.startsWith("/") || redirect.includes("http") || redirect.includes("."))) redirect = "";

    useEffect(() => {
        if (user) navigate(redirect || "/dashboard/profile");
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
                            Se contecter
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Vous n'avez pas de compte ?{' '}
                            <Link
                                to={"/register" + (redirect ? "?redirect=" + encodeURIComponent(redirect) : "")}
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Créer un compte
                            </Link>.
                        </p>
                    </div>
                </div>
                <form onSubmit={(e) => handleLogin(e, setError, setUser, redirect, navigate)} className="mt-10 grid grid-cols-1 gap-y-8">
                    <TextField
                        label="Adresse email ou pseudo"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                    />
                    <TextField
                        label="Mot de passe"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    {error && <AlertError title={error} onClose={() => setError(null)} />}
                    <div>
                        <Button
                            type="submit"
                            name="submit"
                            variant="solid"
                            color="emerald"
                            className="w-full"
                            rounded="rounded-md"
                        >
                            <span>
                                Se connecter <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}

async function handleLogin(e, setError, setUser, redirect, navigate) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, textarea, button, select");
    elements.forEach(el => el.disabled = true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
        const user = await loginUser(username, password);
        setError(null);
        setUser(user);

        navigate(redirect || "/dashboard/profile");
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
        elements.forEach(el => el.disabled = false);
    }
}