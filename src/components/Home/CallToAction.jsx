import BgCallToAction from '../Backgrounds/BgCallToAction'
import { Button } from '../Misc/Button'
import { Container } from '../Misc/Container'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-emerald-600 py-32"
    >
      <BgCallToAction
        className="absolute top-0 left-1/2 object-cover w-full -translate-x-1/2"
      />
      <img

      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Commencez maintenant
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Ce sont vos visiteurs qui seront heureux. Débutez en beauté avec 7 jours offerts pour prendre en main notre produit.
          </p>
          <Button href="/register" color="white" className="mt-10">
            7 jours offerts
          </Button>
        </div>
      </Container>
    </section>
  )
}
