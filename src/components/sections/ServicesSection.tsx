import { ArrowUpRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../data/site'
import { ServiceCard } from '../services/ServiceCard'
import { Reveal } from '../ui/Reveal'
import './ServicesSection.css'

export function ServicesSection() {
  return (
    <section className="services-home section" id="servicios" aria-labelledby="services-title">
      <div className="container">
        <div className="services-home__head">
          <Reveal>
            <p className="eyebrow">Especialidades y servicios</p>
            <h2 className="section-title" id="services-title">
              Atención especializada, explicada con claridad.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="services-home__head-aside">
            <p>
              Siete áreas de atención para acompañarte desde la prevención hasta el
              embarazo, el equilibrio hormonal y las nuevas etapas.
            </p>
            <Link className="text-link" to="/servicios">
              Ver todos los servicios
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              className={`service-entry ${
                index === 0 || index === services.length - 1 ? 'service-entry--wide' : ''
              }`.trim()}
              delay={(index % 3) * 0.06}
            >
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="services-home__foot">
          <p>
            <Info size={15} strokeWidth={1.6} aria-hidden="true" />
            La información de esta sección es orientativa y no sustituye una consulta
            médica.
          </p>
          <Link className="service-card__link services-home__foot-link" to="/agenda">
            Solicitar una cita
            <span className="service-card__link-arrow" aria-hidden="true">
              <ArrowUpRight size={15} strokeWidth={1.7} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
