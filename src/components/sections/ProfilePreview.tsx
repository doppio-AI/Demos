import { ArrowUpRight, Heart, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { doctor } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import './ProfilePreview.css'

export function ProfilePreview() {
  return (
    <section className="profile-preview section" aria-labelledby="profile-preview-title">
      <div className="container profile-preview__inner">
        <Reveal className="profile-preview__visual">
          <div className="profile-preview__poster">
            <div className="profile-preview__poster-top">
              <span>Perfil profesional</span>
              <Heart size={15} strokeWidth={1.3} aria-hidden="true" />
            </div>

            <span className="profile-preview__monogram" aria-hidden="true">
              {doctor.initials}
            </span>

            <svg
              className="profile-preview__flower"
              viewBox="0 0 360 360"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M180 338C180 295 177 259 180 222"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M180 284C148 267 119 273 108 296C135 312 166 306 180 284ZM180 284C212 267 241 273 252 296C225 312 194 306 180 284Z"
                stroke="currentColor"
                strokeWidth="0.9"
                strokeLinejoin="round"
                opacity="0.7"
              />
              <path
                d="M180 222C140 218 109 193 108 158C107 126 131 102 159 108C170 84 198 74 221 88C244 74 273 89 280 115C306 122 320 148 309 172C323 198 302 226 273 226C261 248 230 257 208 241C192 256 167 250 157 231C141 236 125 230 119 218"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
                opacity="0.62"
              />
              <path
                d="M157 151C157 128 176 109 200 109C224 109 243 128 243 151C243 180 200 207 200 207C200 207 157 180 157 151Z"
                fill="currentColor"
                opacity="0.06"
                stroke="currentColor"
                strokeWidth="0.9"
              />
              <path
                d="M200 168C200 158 190 153 185 159C178 152 168 158 168 168C168 178 179 186 200 197C221 186 232 178 232 168C232 158 222 152 215 159C210 153 200 158 200 168Z"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.7"
              />
              <circle cx="282" cy="63" r="3.5" fill="currentColor" opacity="0.35" />
              <path
                d="M70 75L72 83L80 85L72 87L70 95L68 87L60 85L68 83L70 75Z"
                fill="currentColor"
                opacity="0.35"
              />
            </svg>

            <span className="profile-preview__vertical" aria-hidden="true">
              Ginecología &amp; Obstetricia
            </span>

            <div className="profile-preview__caption">
              <span>Dra.</span>
              <strong>Claudia Magally</strong>
              <small>Ramírez García</small>
            </div>
          </div>

          <div className="profile-preview__note">
            <span className="profile-preview__note-icon" aria-hidden="true">
              <Heart size={14} strokeWidth={1.4} />
            </span>
            <p>
              Cuidado que se siente
              <span>cercano y profesional.</span>
            </p>
          </div>
        </Reveal>

        <div className="profile-preview__copy">
          <Reveal>
            <p className="eyebrow">La doctora</p>
            <h2 className="profile-preview__name" id="profile-preview-title">
              Dra. Claudia Magally
              <span>Ramírez García</span>
            </h2>
            <p className="profile-preview__specialty">
              {doctor.specialty}
              <span aria-hidden="true">·</span>
              Querétaro
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="profile-preview__intro">{doctor.profileIntro}</p>
          </Reveal>

          <Reveal delay={0.13}>
            <ul className="profile-preview__areas">
              {doctor.areas.slice(1).map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="profile-preview__credentials">
              {doctor.credentials.map((credential) => (
                <div key={credential.value}>
                  <dt>{credential.shortLabel}</dt>
                  <dd>{credential.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="profile-preview__actions">
              <Link className="btn btn--primary" to="/perfil">
                Conocer su perfil completo
                <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <Link className="text-link" to="/agenda">
                Agendar una consulta
              </Link>
            </div>
            <p className="profile-preview__status">
              <Info size={13} strokeWidth={1.6} aria-hidden="true" />
              Texto de presentación provisional, pendiente de aprobación.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
