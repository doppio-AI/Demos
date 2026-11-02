import { CalendarDays } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { getWhatsAppUrl } from '../../data/site'
import { useEffect } from 'react'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import './MobileActionBar.css'

export function MobileActionBar() {
  const { pathname } = useLocation()
  const hidden = pathname === '/agenda'

  useEffect(() => {
    document.body.classList.toggle('has-mobile-actions', !hidden)
    return () => document.body.classList.remove('has-mobile-actions')
  }, [hidden])

  if (hidden) return null

  return (
    <div className="mobile-action-bar">
      <div className="mobile-action-bar__inner">
        <Link className="mobile-action-bar__book" to="/agenda">
          <CalendarDays size={17} strokeWidth={1.7} aria-hidden="true" />
          Agendar cita
        </Link>
        <a
          className="mobile-action-bar__whatsapp"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
        >
          <WhatsAppIcon size={19} />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
