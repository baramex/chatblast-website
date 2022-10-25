import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../Misc/Fields';
import { AuthLayout } from '../Misc/AuthLayout';
import { Button } from '../Misc/Button';
import { isLogged, loginUser } from '../../lib/service/authentification';
import { useEffect, useState } from 'react';
import { AlertError } from '../Misc/Alerts';
import { fetchUser, isComplete } from '../../lib/service/profile';
import FutherInformationModal from './FutherInformation';

export default function Login({ user, setUser }) {
    const [error, setError] = useState(null);
    const [furtherInformation, setFutherInformation] = useState(false); // TODO: put this (with useEffect) in app, and create compo page: navigate in all cases after login + add logout button on modal
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (isLogged()) {
                if (!user) {
                    const tuser = await fetchUser().catch(console.error);
                    if (tuser) {
                        user = tuser;
                        setUser(tuser);
                    }
                    else return;
                }

                if (!isComplete(user)) setFutherInformation(true);
                else navigate("/dashboard");
            }
        })();
    }, []);

    return (
        <>
            <FutherInformationModal open={furtherInformation} email={user?.email?.address} firstname={user?.name?.firstname} lastname={user?.name?.lastname} onSaved={(nuser) => { setFutherInformation(false); setUser(nuser); navigate("/dashboard") }} />
            <AuthLayout>
                <div className="flex flex-col">
                    <Link to="/" aria-label="Home">
                        <img src={logo} className="h-10 w-auto" />
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Se contecter
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Vous n'avez pas de compte ?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Créer un compte
                            </Link>.
                        </p>
                    </div>
                </div>
                <form onSubmit={(e) => handleLogin(e, setError, setFutherInformation, setUser, navigate)} className="mt-10 grid grid-cols-1 gap-y-8">
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
                    {error && <AlertError title={error} onClose={a => setError("")} />}
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

async function handleLogin(e, setError, setFutherInformation, setUser, navigate) {
    e.preventDefault();

    e.target.submit.disabled = true;
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
        const user = await loginUser(username, password);
        setError(null);
        setUser(user);

        if (!isComplete(user)) {
            setFutherInformation(true);
        }
        else navigate("/dashboard");
    } catch (error) {
        setError(error.message || "Une erreur est survenue.");
        e.target.submit.disabled = false;
    }
}