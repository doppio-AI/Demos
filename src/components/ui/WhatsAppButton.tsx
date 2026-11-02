import { ArrowUp } from 'lucide-react'
import { getWhatsAppUrl } from '../../data/site'
import { WhatsAppIcon } from './WhatsAppIcon'
import './WhatsAppButton.css'

export function WhatsAppButton() {
  return (
    <div className="whatsapp-float">
      <a
        className="whatsapp-float__button"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp a la Dra. Claudia Magally"
      >
        <WhatsAppIcon size={22} />
      </a>
      <a className="whatsapp-float__back" href="#top" aria-label="Volver al inicio de la página">
        <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
      </a>
    </div>
  )
}
