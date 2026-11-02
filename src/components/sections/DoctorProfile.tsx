import { CalendarDays, Info, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { contact, doctor } from '../../data/site'
import { PortraitArtwork } from '../ui/PortraitArtwork'
import { Reveal } from '../ui/Reveal'
import './DoctorProfile.css'

export function DoctorProfile() {
  return (
    <section className="doctor-profile" aria-labelledby="doctor-profile-title">
      <div className="doctor-profile__orb" aria-hidden="true" />
      <div className="container doctor-profile__grid">
        <div className="doctor-profile__copy">
          <Reveal>
            <p className="eyebrow">Perfil profesional</p>
            <h1 className="doctor-profile__title" id="doctor-profile-title">
              Dra. Claudia Magally
              <span>Ramírez García</span>
            </h1>
            <p className="doctor-profile__specialty">{doctor.specialty}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="doctor-profile__intro">{doctor.profileIntro}</p>
          </Reveal>

          <Reveal delay={0.13}>
            <ul className="doctor-profile__areas">
              {doctor.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="doctor-profile__credentials">
              {doctor.credentials.map((credential) => (
                <div key={credential.value}>
                  <dt>{credential.label}</dt>
                  <dd>{credential.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="doctor-profile__actions">
              <Link className="btn btn--primary" to="/agenda">
                <CalendarDays size={17} strokeWidth={1.7} aria-hidden="true" />
                Solicitar una cita
              </Link>
              <Link className="text-link" to="/servicios">
                Ver servicios
              </Link>
            </div>
            <p className="doctor-profile__location">
              <MapPin size={14} strokeWidth={1.6} aria-hidden="true" />
              {contact.hospital}
            </p>
            <p className="doctor-profile__status">
              <Info size={13} strokeWidth={1.6} aria-hidden="true" />
              {doctor.profileStatus}
            </p>
          </Reveal>
        </div>

        <Reveal className="doctor-profile__visual" delay={0.1}>
          <PortraitArtwork priority />
        </Reveal>
      </div>
    </section>
  )
}
