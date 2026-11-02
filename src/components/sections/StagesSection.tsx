import { ArrowUpRight, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { stages } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import './StagesSection.css'

export function StagesSection() {
  return (
    <section className="stages section" aria-labelledby="stages-title">
      <span className="stages__blob" aria-hidden="true" />
      <div className="container">
        <div className="stages__head">
          <Reveal>
            <p className="eyebrow">Acompañamiento en cada etapa</p>
            <h2 className="section-title" id="stages-title">
              La salud femenina no es lineal.
              <span> Tu cuidado tampoco.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="stages__head-aside">
            <p>
              Prevención, embarazo, equilibrio hormonal y nuevas etapas. Una misma mirada
              integral para momentos distintos de tu vida.
            </p>
            <Link className="text-link" to="/servicios">
              Explorar los servicios
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="stages__grid">
          {stages.map((stage, index) => (
            <Reveal key={stage.number} className="stage-wrap" delay={index * 0.08}>
              <article className="stage">
                <div className="stage__top">
                  <span className="stage__number">{stage.number}</span>
                  <span className="stage__dot" aria-hidden="true" />
                </div>
                <h3>{stage.label}</h3>
                <p>{stage.text}</p>
                <span className="stage__stem" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <figure className="stages__quote">
            <Quote className="stages__quote-icon" size={28} strokeWidth={1.15} aria-hidden="true" />
            <blockquote>
              Cada etapa merece una atención distinta, con el mismo cuidado y la misma
              cercanía.
            </blockquote>
            <figcaption>Tu salud es una prioridad.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
