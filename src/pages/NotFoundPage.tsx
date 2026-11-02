import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { BrandMark } from '../components/ui/BrandMark'
import { usePageMeta } from '../lib/seo'
import './NotFoundPage.css'

export function NotFoundPage() {
  usePageMeta({
    title: 'Página no encontrada | Dra. Claudia Magally Ramírez García',
    description: 'La página que buscas no está disponible. Regresa al inicio del sitio.',
    noIndex: true,
  })

  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <div className="not-found__art" aria-hidden="true">
          <span className="not-found__number">404</span>
          <BrandMark className="not-found__mark" size={96} />
        </div>
        <div className="not-found__copy">
          <p className="eyebrow">Página no encontrada</p>
          <h1>Esta página no está disponible.</h1>
          <p>
            Es posible que el enlace haya cambiado o que la dirección esté incompleta.
            Puedes volver al inicio o comunicarte con el consultorio.
          </p>
          <div className="not-found__actions">
            <Link className="btn btn--primary" to="/">
              <Home size={16} strokeWidth={1.7} aria-hidden="true" />
              Volver al inicio
            </Link>
            <Link className="text-link" to="/contacto">
              <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
              Ir a contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
