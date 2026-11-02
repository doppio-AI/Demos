import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import { PageTransition } from './components/ui/PageTransition'
import { HomePage } from './pages/HomePage'

const ProfilePage = lazy(() =>
  import('./pages/ProfilePage').then((module) => ({ default: module.ProfilePage })),
)
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })),
)
const AppointmentPage = lazy(() =>
  import('./pages/AppointmentPage').then((module) => ({ default: module.AppointmentPage })),
)
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
)

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hash) {
      const target = document.querySelector<HTMLElement>(hash)
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [hash, pathname])

  return null
}

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/perfil', element: <ProfilePage /> },
  { path: '/servicios', element: <ServicesPage /> },
  { path: '/contacto', element: <ContactPage /> },
  { path: '/agenda', element: <AppointmentPage /> },
  { path: '/aviso-de-privacidad', element: <PrivacyPage /> },
  { path: '*', element: <NotFoundPage /> },
]

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <div className="route-loading" role="status" aria-live="polite">
                    <span className="visually-hidden">Cargando página</span>
                  </div>
                }
              >
                <PageTransition>{route.element}</PageTransition>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <ScrollManager />
        <Header />
        <main id="contenido" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileActionBar />
      </div>
    </MotionConfig>
  )
}
