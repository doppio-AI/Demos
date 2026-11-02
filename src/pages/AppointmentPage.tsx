import { ShieldCheck, Sparkles } from 'lucide-react'
import { AppointmentForm } from '../components/forms/AppointmentForm'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { contact, getWhatsAppUrl } from '../data/site'
import { usePageMeta } from '../lib/seo'
import './AppointmentPage.css'

const steps = [
  'Tipo de consulta',
  'Fecha y preferencia',
  'Datos de contacto',
  'Revisión y envío',
]

export function AppointmentPage() {
  usePageMeta({
    title: 'Solicitar una cita | Dra. Claudia Magally Ramírez García',
    description:
      'Solicita una cita de ginecología u obstetricia con la Dra. Claudia Magally Ramírez García. Completa una solicitud breve y confirma la disponibilidad por WhatsApp.',
  })

  return (
    <section className="appointment-page">
      <div className="container">
        <div className="appointment-page__head">
          <Reveal>
            <p className="eyebrow">Agenda tu consulta</p>
            <h1>Una cita para cuidarte.</h1>
            <p>
              Completa estos pasos para preparar tu solicitud. No se muestra disponibilidad
              en tiempo real: el consultorio confirmará contigo la fecha y el horario.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="appointment-page__head-aside">
            <span className="appointment-page__tag">
              <ShieldCheck size={16} strokeWidth={1.5} aria-hidden="true" />
              Solicitud en línea
            </span>
            <p>
              La cita no queda confirmada hasta que el consultorio responda por WhatsApp o
              teléfono.
            </p>
          </Reveal>
        </div>

        <div className="appointment-page__layout">
          <aside className="appointment-page__aside" aria-label="Resumen del proceso">
            <div className="appointment-page__aside-top">
              <p className="appointment-page__aside-eyebrow">Tu solicitud</p>
              <h2>Cuatro pasos, sin complicaciones.</h2>
              <ol className="appointment-page__steps">
                {steps.map((label, index) => (
                  <li key={label}>
                    <span>0{index + 1}</span>
                    {label}
                  </li>
                ))}
              </ol>
            </div>

            <div className="appointment-page__aside-note">
              <Sparkles size={17} strokeWidth={1.4} aria-hidden="true" />
              <p>
                Tus datos se utilizan únicamente para dar seguimiento a esta solicitud.
              </p>
            </div>

            <div className="appointment-page__aside-contact">
              <p>¿Prefieres hablar directamente?</p>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={17} />
                Escribir por WhatsApp
              </a>
            </div>
          </aside>

          <Reveal className="appointment-page__form-wrap">
            <AppointmentForm />
          </Reveal>
        </div>

        <p className="appointment-page__footnote">
          La información de esta página es informativa y no sustituye una consulta médica.
          No se realizan promesas de resultados.
        </p>
      </div>
    </section>
  )
}
