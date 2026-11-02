import { ArrowUpRight, CalendarDays, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'
import { LocationSection } from '../components/sections/LocationSection'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { contact, getWhatsAppUrl } from '../data/site'
import { usePageMeta } from '../lib/seo'
import './ContactPage.css'

export function ContactPage() {
  usePageMeta({
    title: 'Contacto y ubicación | Dra. Claudia Magally Ramírez García',
    description:
      'Contacta a la Dra. Claudia Magally Ramírez García por teléfono o WhatsApp. Atención en Hospital Star Médica Querétaro. Solicita una cita de ginecología u obstetricia.',
  })

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu salud."
        intro="Puedes comunicarte por teléfono o WhatsApp para solicitar información y agendar una consulta. El consultorio confirmará la disponibilidad directamente contigo."
      >
        <Link className="btn btn--primary" to="/agenda">
          <CalendarDays size={17} strokeWidth={1.7} aria-hidden="true" />
          Solicitar una cita
        </Link>
        <a className="btn btn--outline" href={contact.phoneHref}>
          <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
          {contact.phone}
        </a>
      </PageHero>

      <section className="contact-channels section" aria-labelledby="contact-channels-title">
        <div className="container">
          <div className="contact-channels__head">
            <Reveal>
              <p className="eyebrow">Canales de atención</p>
              <h2 className="section-title" id="contact-channels-title">
                Elige cómo comunicarte.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Para una solicitud de cita, incluye tu nombre y el tipo de consulta que te
                interesa. La confirmación se realiza directamente con el consultorio.
              </p>
            </Reveal>
          </div>

          <div className="contact-channels__grid">
            <Reveal className="contact-channel-wrap">
              <a
                className="contact-channel contact-channel--featured"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel__icon" aria-hidden="true">
                  <WhatsAppIcon size={25} />
                </span>
                <span className="contact-channel__eyebrow">Canal directo</span>
                <h3>WhatsApp</h3>
                <p>
                  Escribe al consultorio para solicitar información o iniciar una solicitud
                  de cita.
                </p>
                <span className="contact-channel__value">{contact.whatsappDisplay}</span>
                <span className="contact-channel__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.6} />
                </span>
              </a>
            </Reveal>

            <Reveal className="contact-channel-wrap" delay={0.08}>
              <a className="contact-channel" href={contact.phoneHref}>
                <span className="contact-channel__icon" aria-hidden="true">
                  <Phone size={23} strokeWidth={1.5} />
                </span>
                <span className="contact-channel__eyebrow">Llamada telefónica</span>
                <h3>Teléfono</h3>
                <p>
                  Llama directamente para resolver dudas sobre la consulta y su
                  disponibilidad.
                </p>
                <span className="contact-channel__value">{contact.phone}</span>
                <span className="contact-channel__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.6} />
                </span>
              </a>
            </Reveal>

            <Reveal className="contact-channel-wrap" delay={0.16}>
              <a
                className="contact-channel contact-channel--lavender"
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-channel__icon" aria-hidden="true">
                  <MapPin size={23} strokeWidth={1.5} />
                </span>
                <span className="contact-channel__eyebrow">Ubicación de atención</span>
                <h3>Hospital Star Médica Querétaro</h3>
                <p>
                  Consulta la referencia del hospital. La ubicación exacta del consultorio
                  se confirma al agendar.
                </p>
                <span className="contact-channel__value">Ver ubicación</span>
                <span className="contact-channel__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.6} />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="contact-channels__note">
              <ShieldCheck size={19} strokeWidth={1.4} aria-hidden="true" />
              <p>
                Por tu privacidad, evita compartir información clínica sensible por mensaje.
                La valoración médica se realiza en consulta. Consulta el{' '}
                <Link to="/aviso-de-privacidad">aviso de privacidad</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <LocationSection />

      <AppointmentCTA
        eyebrow="Solicitud de cita"
        title="Agenda tu consulta cuando estés lista."
        text="Completa una solicitud breve y continúa la conversación por WhatsApp para confirmar la disponibilidad."
      />
    </>
  )
}
