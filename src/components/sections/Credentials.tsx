import { ShieldCheck } from 'lucide-react'
import { doctor } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import './Credentials.css'

export function Credentials() {
  return (
    <section className="credentials" aria-labelledby="credentials-title">
      <div className="credentials__glow" aria-hidden="true" />
      <div className="credentials__line" aria-hidden="true">
        <svg viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="249" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          <path
            d="M250 370C250 320 249 281 250 237M250 309C220 291 190 297 179 321C207 337 237 331 250 309ZM250 309C280 291 310 297 321 321C293 337 263 331 250 309Z"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container credentials__inner">
        <div className="credentials__head">
          <Reveal>
            <p className="eyebrow eyebrow--light">Información profesional</p>
            <h2 className="section-title" id="credentials-title">
              Credenciales que respaldan su práctica.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="credentials__head-aside">
            <p>
              Los datos profesionales se muestran tal como fueron proporcionados. Su
              publicación está sujeta a validación documental.
            </p>
          </Reveal>
        </div>

        <div className="credentials__grid">
          {doctor.credentials.map((credential, index) => (
            <Reveal key={credential.value} className="credential" delay={index * 0.08}>
              <div className="credential__top">
                <span className="credential__number">0{index + 1}</span>
                <ShieldCheck size={17} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <span className="credential__label">{credential.label}</span>
              <p className="credential__value">{credential.value}</p>
              <span className="credential__line" aria-hidden="true" />
            </Reveal>
          ))}
        </div>

        <div className="credentials__foot">
          <div className="credentials__identity">
            <span>Nombre completo</span>
            <p>{doctor.fullName}</p>
            <small>{doctor.specialty}</small>
          </div>
          <p className="credentials__note">
            La información de este sitio no sustituye la consulta médica ni constituye una
            promesa de resultados. Las credenciales pueden ser verificadas ante las
            instancias correspondientes.
          </p>
        </div>
      </div>
    </section>
  )
}
