import { Container } from '../Misc/Container'

export function About() {
  return (
    <section
      id="about"
      aria-label="About us"
      className="bg-gray-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-4xl relative">
          <h2 className="font-display text-3xl tracking-tight text-gray-900 text-center sm:text-left sm:text-4xl">
            À propos de nous
          </h2>

          <svg className="absolute top-0 right-0 -mt-3 -mr-44 hidden sm:block md:-mr-28" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
            <defs>
              <pattern id="1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-emerald-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="360" height="270" fill="url(#1)" />
          </svg>
          <svg className="absolute bottom-0 left-0 -mb-44 -ml-32 hidden sm:block md:-ml-12" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
            <defs>
              <pattern id="2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-emerald-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="360" height="270" fill="url(#2)" />
          </svg>

          <div className='relative'>
            <p className="mt-6 text-left text-lg tracking-wide leading-loose text-gray-600 bg-gray-50 p-6">
              À la base, en juin 2022 (v1.0.0), le projet était juste une messagerie en ligne, avec tout le monde sur le même flux.
              L'origine de ce dernier était un projet d'entrainement pour mon ami (vipex) et moi, le frontend était simplement en traditionnel html/css (bootstrap)/js.
              L'anonymat était la valeur dominante: les comptes et les messages étaient éphémères, pas de mot de passe pour le compte, juste un nom d'utilisateur, les messages étaient reçu directement par socket, pas de base de donnée.
              C'est uniquement à partir de la 2e version que les comptes et messages persistants sont apparus.
              Et ensuite j'ai continué le projet seul pour la v2.1, où j'ai refait entièrement le code avec react js.<br /><br />

              À partir de septembre 2022 (v2.2.4), après une mise à jour design (v2.2), l'idée de faire un système d'intégration est venue.
              Ensuite durant ce temps, le changement de bootstrap vers tailwindcss a été fait pour le css.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
