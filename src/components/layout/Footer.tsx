import { ArrowUpRight, CalendarDays, Heart, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contact, doctor, getWhatsAppUrl, navLinks } from '../../data/site'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import './Footer.css'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <p className="site-footer__eyebrow">Dra. Claudia Magally Ramírez García</p>
            <p className="site-footer__statement">
              Tu salud
              <br />
              es una <span>prioridad.</span>
            </p>
            <p className="site-footer__intro">
              Ginecología y Obstetricia con una atención cercana, clara y respetuosa.
            </p>
            <span className="site-footer__heart" aria-hidden="true">
              <Heart size={16} strokeWidth={1.4} />
            </span>
          </div>

          <div className="site-footer__column">
            <h2 className="site-footer__heading">Navegación</h2>
            <nav className="site-footer__nav" aria-label="Navegación del pie de página">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
              <Link to="/aviso-de-privacidad">Aviso de privacidad</Link>
            </nav>
          </div>

          <div className="site-footer__column site-footer__column--contact">
            <h2 className="site-footer__heading">Contacto</h2>
            <a className="site-footer__contact" href={contact.phoneHref}>
              <Phone size={16} strokeWidth={1.6} aria-hidden="true" />
              <span>{contact.phone}</span>
            </a>
            <a
              className="site-footer__contact"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={17} />
              <span>Escribir por WhatsApp</span>
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <p className="site-footer__contact site-footer__contact--static">
              <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
              <span>{contact.hospital}</span>
            </p>
            <p className="site-footer__contact-detail">{contact.city}</p>
            <Link className="site-footer__book" to="/agenda">
              <CalendarDays size={15} strokeWidth={1.6} aria-hidden="true" />
              Solicitar una cita
            </Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {currentYear} {doctor.fullName}. Todos los derechos reservados.
          </p>
          <p className="site-footer__legal">
            Sitio informativo. No sustituye una consulta médica.{' '}
            <Link to="/aviso-de-privacidad">Aviso de privacidad</Link>
          </p>
        </div>
      </div>

      <span className="site-footer__watermark" aria-hidden="true">
        CM
      </span>
    </footer>
  )
}
