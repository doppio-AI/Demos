import { ArrowUpRight, Info, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { ServiceGlyph } from '../components/ui/ServiceGlyph'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { contact, getWhatsAppUrl, services } from '../data/site'
import { usePageMeta } from '../lib/seo'
import './ServicesPage.css'

export function ServicesPage() {
  usePageMeta({
    title: 'Servicios | Ginecología y Obstetricia en Querétaro',
    description:
      'Control prenatal, atención de parto y cesárea, Papanicolaou, colposcopía, endocrinología ginecológica, menopausia y climaterio, y atención relacionada con VPH.',
  })

  return (
    <>
      <PageHero
        eyebrow="Especialidades y servicios"
        title="Atención ginecológica y obstétrica."
        intro="Cada servicio forma parte de una atención integral. Conoce en qué consiste cada área y solicita información para elegir el acompañamiento que necesitas."
      />

      <section className="services-page section" aria-labelledby="services-list-title">
        <div className="container">
          <div className="services-page__head">
            <Reveal>
              <p className="eyebrow">Áreas de atención</p>
              <h2 className="section-title" id="services-list-title">
                Siete servicios, una misma forma de cuidar.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                La valoración médica permite definir el enfoque adecuado para cada persona.
                Esta información es orientativa y no sustituye una consulta.
              </p>
            </Reveal>
          </div>

          <div className="services-page__list">
            {services.map((service, index) => (
              <Reveal key={service.id} className="service-row-wrap" delay={0.03 * index}>
                <article className="service-row">
                  <span className="service-row__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="service-row__title">
                    <span className="service-row__icon" aria-hidden="true">
                      <ServiceGlyph icon={service.icon} size={23} />
                    </span>
                    <h3>{service.title}</h3>
                  </div>
                  <p className="service-row__description">{service.description}</p>
                  <Link
                    className="service-row__link"
                    to="/agenda"
                    state={{ serviceId: service.id }}
                    aria-label={`Solicitar información sobre ${service.title}`}
                  >
                    <span>Solicitar información</span>
                    <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <aside className="services-page__help" aria-labelledby="services-help-title">
              <div>
                <p className="eyebrow">¿No sabes cuál elegir?</p>
                <h2 id="services-help-title">Podemos orientarte.</h2>
                <p>
                  Si tienes dudas sobre qué tipo de consulta solicitar, escribe al
                  consultorio. La orientación inicial no sustituye una valoración médica.
                </p>
              </div>
              <div className="services-page__help-actions">
                <a
                  className="btn btn--light"
                  href={getWhatsAppUrl(
                    'Hola, me gustaría recibir orientación para elegir el tipo de consulta con la Dra. Claudia Magally Ramírez García.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={18} />
                  Escribir por WhatsApp
                </a>
                <a className="btn btn--outline-light" href={contact.phoneHref}>
                  <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
                  {contact.phone}
                </a>
              </div>
            </aside>
          </Reveal>

          <p className="services-page__note">
            <Info size={14} strokeWidth={1.6} aria-hidden="true" />
            No se realizan promesas de resultados. Las indicaciones y la vía de atención se
            determinan después de una valoración médica individual.
          </p>
        </div>
      </section>

      <AppointmentCTA
        eyebrow="Solicita información"
        title="Resuelve tus dudas antes de tu consulta."
        text="Escríbenos o solicita una cita. El consultorio confirmará la disponibilidad y te orientará sobre el siguiente paso."
      />
    </>
  )
}
