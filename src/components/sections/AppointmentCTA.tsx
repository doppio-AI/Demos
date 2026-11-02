import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getWhatsAppUrl } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import './AppointmentCTA.css'

type AppointmentCTAProps = {
  eyebrow?: string
  title?: string
  text?: string
}

export function AppointmentCTA({
  eyebrow = 'Agenda tu consulta',
  title = 'El primer paso puede ser una conversación.',
  text = 'Solicita una cita y el consultorio te contactará para confirmar la disponibilidad, la fecha y los detalles de tu atención.',
}: AppointmentCTAProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="appointment-cta" aria-labelledby="appointment-cta-title">
      <div className="appointment-cta__texture" aria-hidden="true" />
      <div className="container appointment-cta__inner">
        <Reveal className="appointment-cta__copy">
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h2 id="appointment-cta-title">{title}</h2>
          <p>{text}</p>
          <div className="appointment-cta__actions">
            <Link className="btn btn--light" to="/agenda">
              <CalendarDays size={17} strokeWidth={1.6} aria-hidden="true" />
              Solicitar una cita
            </Link>
            <a
              className="btn btn--outline-light"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              Escribir por WhatsApp
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
          <p className="appointment-cta__note">
            La solicitud no confirma la cita hasta recibir respuesta del consultorio.
          </p>
        </Reveal>

        <motion.div
          className="appointment-cta__art"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: [0, 1.5, 0], y: [0, -7, 0] }}
          transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
        >
          <svg viewBox="0 0 340 360" fill="none">
            <circle cx="182" cy="169" r="137" stroke="currentColor" strokeWidth="0.8" opacity="0.24" />
            <circle cx="182" cy="169" r="105" stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
            <path
              d="M183 52C234 53 276 93 278 145C280 198 243 240 192 242C140 243 95 207 93 155C91 105 129 65 183 52Z"
              fill="currentColor"
              opacity="0.07"
            />
            <path
              d="M182 282C182 240 181 217 182 187"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M182 239C153 224 127 230 117 251C142 265 170 259 182 239ZM182 239C211 224 237 230 247 251C222 265 194 259 182 239Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              opacity="0.75"
            />
            <path
              d="M182 186C162 171 158 143 173 125C184 112 196 111 207 120C221 106 242 111 251 127C261 145 249 170 230 181C217 189 196 190 182 186Z"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
            <path
              d="M171 224C160 238 159 254 168 266C181 257 186 242 181 227"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M51 80L53 89L62 91L53 93L51 102L49 93L40 91L49 89L51 80Z"
              fill="currentColor"
              opacity="0.55"
            />
            <path
              d="M289 273L291 281L299 283L291 285L289 293L287 285L279 283L287 281L289 273Z"
              fill="currentColor"
              opacity="0.5"
            />
            <circle cx="299" cy="83" r="4" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
