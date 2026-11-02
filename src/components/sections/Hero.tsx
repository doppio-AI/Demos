import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight, CalendarDays, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contact, doctor } from '../../data/site'
import { PortraitArtwork } from '../ui/PortraitArtwork'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__orb hero__orb--one" />
        <span className="hero__orb hero__orb--two" />
        <svg className="hero__arc" viewBox="0 0 700 700" fill="none">
          <circle cx="350" cy="350" r="348" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="350" cy="350" r="310" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        </svg>
        <span className="hero__side-note">Cuidado femenino · Querétaro</span>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.p
            className="eyebrow hero__eyebrow"
            variants={fadeUp}
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            Ginecología &amp; Obstetricia · Querétaro
          </motion.p>

          <motion.h1
            className="hero__title"
            id="hero-title"
            variants={fadeUp}
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Tu salud</span>
            <span>es una</span>
            <span className="hero__title-emphasis">
              prioridad.
              <svg viewBox="0 0 330 20" fill="none" aria-hidden="true">
                <path
                  d="M4 13C83 5 191 4 326 9"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            className="hero__lede"
            variants={fadeUp}
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
            transition={{ duration: 0.75, delay: 0.23, ease: [0.22, 1, 0.36, 1] }}
          >
            Un espacio para cuidar tu salud femenina con atención cercana, información
            clara y acompañamiento médico en cada etapa de tu vida.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fadeUp}
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
            transition={{ duration: 0.75, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link className="btn btn--primary" to="/agenda">
              <CalendarDays size={17} strokeWidth={1.7} aria-hidden="true" />
              Solicitar una cita
            </Link>
            <Link className="text-link" to="/perfil">
              Conocer a la doctora
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.p
            className="hero__note"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <span className="hero__note-dot" aria-hidden="true" />
            La solicitud de cita se confirma directamente con el consultorio.
          </motion.p>

        </div>

        <div className="hero__visual">
          <motion.div
            className="hero__art"
            initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <PortraitArtwork priority />
          </motion.div>

          <motion.div
            className="hero__badge"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={
              reduceMotion
                ? undefined
                : { opacity: 1, y: [0, -6, 0] }
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.7 },
              y: { duration: 7, delay: 1.2, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <span className="hero__badge-icon" aria-hidden="true">
              <Heart size={16} strokeWidth={1.5} />
            </span>
            <span>
              <strong>Atención que acompaña</strong>
              <small>Escucha, claridad y cuidado</small>
            </span>
          </motion.div>

        </div>

        <motion.div
          className="hero__details"
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          transition={{ duration: 0.75, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="hero__areas" aria-label="Áreas de atención">
            {doctor.areas.slice(1).map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>

          <div className="hero__facts">
            <div className="hero__fact">
              <span>{doctor.credentials[0].value}</span>
              <small>Cédula profesional</small>
            </div>
            <span className="hero__fact-divider" aria-hidden="true" />
            <div className="hero__fact">
              <span>{doctor.credentials[1].value}</span>
              <small>Cédula de especialidad</small>
            </div>
            <span className="hero__fact-divider" aria-hidden="true" />
            <div className="hero__fact hero__fact--hospital">
              <span>{contact.hospital}</span>
              <small>Ubicación de atención</small>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container hero__scroll-hint" aria-hidden="true">
        <span>Conoce más</span>
        <ArrowDown size={14} strokeWidth={1.5} />
      </div>
    </section>
  )
}
