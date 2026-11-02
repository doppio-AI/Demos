import { ArrowUpRight, CalendarDays, Info, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contact, getWhatsAppUrl } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import './LocationSection.css'

export function LocationSection() {
  return (
    <section className="location section" id="ubicacion" aria-labelledby="location-title">
      <div className="container">
        <div className="location__head">
          <Reveal>
            <p className="eyebrow">Contacto y ubicación</p>
            <h2 className="section-title" id="location-title">
              Un espacio para tu consulta.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              La atención se brinda en Hospital Star Médica Querétaro. La ubicación exacta
              del consultorio se confirma al agendar tu cita.
            </p>
          </Reveal>
        </div>

        <div className="location__grid">
          <Reveal className="location__panel">
            <p className="location__label">
              <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
              Ubicación de atención
            </p>
            <h3>{contact.hospital}</h3>
            <p className="location__address-note">
              {contact.city}
              <span>Dirección y consultorio se confirman al agendar.</span>
            </p>

            <dl className="location__details">
              <div>
                <dt>Teléfono</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Horarios</dt>
                <dd>Se confirman directamente con el consultorio.</dd>
              </div>
            </dl>

            <div className="location__actions">
              <a className="btn btn--primary" href={contact.phoneHref}>
                <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
                Llamar al consultorio
              </a>
              <a
                className="btn btn--outline"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={17} />
                WhatsApp
              </a>
            </div>

            <Link className="location__book" to="/agenda">
              <CalendarDays size={15} strokeWidth={1.6} aria-hidden="true" />
              Solicitar una cita
              <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </Link>

            <p className="location__disclaimer">
              <Info size={14} strokeWidth={1.6} aria-hidden="true" />
              El consultorio y los horarios se confirman al agendar. El mapa es una
              referencia del hospital, no de un consultorio específico.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="location__map-column">
            <div className="location__map">
              <iframe
                title={`Mapa de ubicación de ${contact.hospital}`}
                src={contact.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="location__map-card">
                <span className="location__map-pin" aria-hidden="true">
                  <MapPin size={17} strokeWidth={1.6} />
                </span>
                <p>
                  <strong>{contact.hospital}</strong>
                  <span>Querétaro, México</span>
                </p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir ubicación en Google Maps"
                >
                  <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="location__map-caption">
              <span>Mapa de referencia</span>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir en Google Maps
                <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
