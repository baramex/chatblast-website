import { AuthLayout } from '../Misc/AuthLayout'
import { Button } from '../Misc/Button'
import { TextField } from '../Misc/Fields'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { handleFieldChange, handleLastnameChange, handleNameChange } from '../../lib/utils/regex'

export default function Register() {
    return (
        <>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link to="/" aria-label="Home">
                        <img src={logo} className="h-10 w-auto" />
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Créer un compte
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Déjà inscrit ?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-emerald-600 hover:underline"
                            >
                                Se connecter
                            </Link>.
                        </p>
                    </div>
                </div>
                <form
                    action="#"
                    className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
                >
                    <TextField
                        label="Prénom"
                        id="fistname"
                        name="fistname"
                        type="text"
                        autoComplete="given-name"
                        maxLength="32"
                        onChange={handleNameChange}
                        required
                    />
                    <TextField
                        label="Nom"
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="family-name"
                        maxLength="32"
                        onChange={handleLastnameChange}
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Pseudo"
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        maxLength="32"
                        onChange={handleFieldChange}
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
                        required
                    />
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
