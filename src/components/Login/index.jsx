import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { TextField } from '../Misc/Fields'
import { AuthLayout } from '../Misc/AuthLayout'
import { Button } from '../Misc/Button'

export default function Login() {
  return (
    <>
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
        <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Adresse email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
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
          <div>
            <Button
              type="submit"
              variant="solid"
              color="emerald"
              className="w-full"
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
