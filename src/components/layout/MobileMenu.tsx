import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CalendarDays, Phone, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { contact, navLinks } from '../../data/site'
import { Logo } from '../ui/Logo'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import './MobileMenu.css'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocus.current = document.activeElement as HTMLElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 50)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus.current?.focus()
    }
  }, [onClose, open])

  return createPortal(
    <motion.div
      className="mobile-menu"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      id="mobile-navigation"
    >
      <motion.div
        className="mobile-menu__panel"
        ref={panelRef}
        initial={reduceMotion ? false : { x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mobile-menu__top">
          <Logo onClick={onClose} />
          <button
            ref={closeRef}
            type="button"
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Cerrar menú de navegación"
          >
            <X size={23} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-menu__nav" aria-label="Navegación móvil">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `mobile-menu__nav-link ${isActive ? 'is-active' : ''}`.trim()
              }
            >
              <span className="mobile-menu__nav-index">0{index + 1}</span>
              <span>{link.label}</span>
              <ArrowUpRight size={23} strokeWidth={1.4} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>

        <div className="mobile-menu__quote">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 20.5C11.5 19.1 4 13.7 4 8.6C4 5.7 6.2 3.5 8.9 3.5C10.3 3.5 11.4 4.2 12 5.2C12.6 4.2 13.7 3.5 15.1 3.5C17.8 3.5 20 5.7 20 8.6C20 13.7 12.5 19.1 12 20.5Z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </svg>
          <p>Tu salud es una prioridad.</p>
          <span>Atención ginecológica y obstétrica en Querétaro.</span>
        </div>

        <div className="mobile-menu__actions">
          <Link to="/agenda" className="btn btn--primary btn--block" onClick={onClose}>
            <CalendarDays size={17} strokeWidth={1.7} aria-hidden="true" />
            Solicitar una cita
          </Link>
          <div className="mobile-menu__contact-row">
            <a href={contact.phoneHref} className="mobile-menu__contact">
              <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
              {contact.phone}
            </a>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              className="mobile-menu__contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={17} />
              WhatsApp
            </a>
          </div>
          <p className="mobile-menu__note">
            {contact.hospital}
            <br />
            La ubicación exacta se confirma al agendar.
          </p>
        </div>

        <svg
          className="mobile-menu__flower"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M100 186C100 144 100 124 100 96M100 134C77 119 57 125 48 144C69 157 91 152 100 134ZM101 158C125 141 149 147 158 166C135 179 112 174 101 158Z"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M100 94C74 89 52 68 58 44C64 20 88 13 101 32C117 13 141 22 146 44C151 67 129 89 100 94Z"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="101" cy="53" r="11" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
