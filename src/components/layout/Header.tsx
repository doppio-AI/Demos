import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { CalendarDays, Heart, Menu, Phone } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { contact, navLinks } from '../../data/site'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'
import './Header.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1050px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <p className="topbar__note">
            <Heart size={11} strokeWidth={1.8} aria-hidden="true" />
            <span className="topbar__note-full">Atención ginecológica y obstétrica en Querétaro</span>
            <span className="topbar__note-short">Ginecología &amp; Obstetricia · Querétaro</span>
          </p>
          <div className="topbar__links">
            <span className="topbar__hospital">{contact.hospital}</span>
            <span className="topbar__divider" aria-hidden="true" />
            <a className="topbar__phone" href={contact.phoneHref}>
              <Phone size={11} strokeWidth={1.8} aria-hidden="true" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`.trim()}>
        <div className="container site-header__inner">
          <Logo />

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `desktop-nav__link ${isActive ? 'is-active' : ''}`.trim()
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="header-phone" href={contact.phoneHref}>
              <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
              <span>{contact.phone}</span>
            </a>
            <Link className="btn btn--primary btn--sm header-cta" to="/agenda">
              <CalendarDays size={16} strokeWidth={1.7} aria-hidden="true" />
              <span>Agendar cita</span>
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu key="mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  )
}
