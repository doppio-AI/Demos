import { Credentials } from '../components/sections/Credentials'
import { DoctorProfile } from '../components/sections/DoctorProfile'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'
import { principles } from '../data/site'
import { usePageMeta } from '../lib/seo'
import { Reveal } from '../components/ui/Reveal'
import './ProfilePage.css'

export function ProfilePage() {
  usePageMeta({
    title: 'Perfil profesional | Dra. Claudia Magally Ramírez García',
    description:
      'Conoce el perfil profesional de la Dra. Claudia Magally Ramírez García, especialista en Ginecología y Obstetricia en Querétaro. Cédulas profesionales y registro COFEPRIS.',
  })

  return (
    <>
      <DoctorProfile />

      <section className="profile-approach section" aria-labelledby="approach-title">
        <div className="container">
          <div className="profile-approach__head">
            <Reveal>
              <p className="eyebrow">Mi forma de acompañar</p>
              <h2 className="section-title" id="approach-title">
                Ciencia, claridad y cercanía
                <span> en cada consulta.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                La atención médica no se trata solo de diagnosticar. También de escuchar,
                explicar y acompañar las decisiones que forman parte de tu salud.
              </p>
            </Reveal>
          </div>

          <div className="profile-approach__grid">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} className="principle" delay={index * 0.08}>
                <span className="principle__number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="profile-approach__statement">
              <span className="profile-approach__mark" aria-hidden="true">
                “
              </span>
              <p>
                Antes que un diagnóstico, hay una persona. Antes que una indicación, una
                conversación.
              </p>
              <span className="profile-approach__caption">Enfoque de atención</span>
            </div>
          </Reveal>
        </div>
      </section>

      <Credentials />
      <AppointmentCTA
        eyebrow="Conoce su enfoque"
        title="Tu salud, en una conversación sin prisas."
        text="Solicita una cita para conocer la disponibilidad del consultorio y recibir orientación sobre el siguiente paso."
      />
    </>
  )
}
