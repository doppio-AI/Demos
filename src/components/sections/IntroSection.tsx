import { Heart } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import './IntroSection.css'

export function IntroSection() {
  return (
    <section className="intro section" aria-labelledby="intro-title">
      <div className="intro__texture" aria-hidden="true" />
      <div className="container intro__grid">
        <Reveal className="intro__heading">
          <p className="eyebrow">Una mirada integral</p>
          <h2 className="section-title" id="intro-title">
            Cuidar de ti también es <span>sentirte escuchada.</span>
          </h2>
        </Reveal>

        <div className="intro__body">
          <Reveal delay={0.08}>
            <p className="intro__lead">
              La salud ginecológica merece tiempo, información y confianza. Mi práctica
              parte de una idea sencilla: la atención médica debe sentirse humana.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="intro__copy">
              Escuchar tus preguntas, explicar cada paso y acompañarte en la decisión son
              parte del cuidado. Desde la prevención hasta el embarazo, la menopausia y el
              equilibrio hormonal, cada consulta se adapta a lo que necesitas en este
              momento.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="intro__signature">
              <span className="intro__monogram" aria-hidden="true">
                CM
              </span>
              <div>
                <p>Dra. Claudia Magally</p>
                <span>Ginecología y Obstetricia</span>
              </div>
              <Heart
                className="intro__signature-heart"
                size={18}
                strokeWidth={1.3}
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container intro__strip">
        <Reveal>
          <p>
            <span>Prevención</span>
            <i aria-hidden="true" />
            <span>Embarazo</span>
            <i aria-hidden="true" />
            <span>Hormonas</span>
            <i aria-hidden="true" />
            <span>Nuevas etapas</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
