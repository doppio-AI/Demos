import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { contact, doctor } from '../data/site'
import { usePageMeta } from '../lib/seo'
import './PrivacyPage.css'

const sections = [
  { id: 'responsable', label: 'Responsable' },
  { id: 'datos', label: 'Datos que recabamos' },
  { id: 'finalidades', label: 'Finalidades' },
  { id: 'transferencias', label: 'Transferencias' },
  { id: 'derechos', label: 'Tus derechos' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'cambios', label: 'Cambios al aviso' },
]

export function PrivacyPage() {
  usePageMeta({
    title: 'Aviso de privacidad | Dra. Claudia Magally Ramírez García',
    description:
      'Aviso de privacidad del sitio de la Dra. Claudia Magally Ramírez García. Información sobre el tratamiento de datos personales de contacto y solicitudes de cita.',
  })

  return (
    <>
      <PageHero
        eyebrow="Información legal"
        title="Aviso de privacidad."
        intro="La protección de tus datos personales es parte de una atención respetuosa. Aquí te explicamos qué información se recaba a través de este sitio y cómo se utiliza."
        variant="simple"
      />

      <section className="privacy section" aria-label="Aviso de privacidad">
        <div className="container privacy__layout">
          <aside className="privacy__aside">
            <p className="privacy__aside-label">En esta página</p>
            <nav aria-label="Contenido del aviso de privacidad">
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>0{index + 1}</span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="privacy__aside-note">
              <ShieldCheck size={18} strokeWidth={1.4} aria-hidden="true" />
              <p>
                Este sitio no solicita información clínica a través de sus formularios.
              </p>
            </div>
          </aside>

          <article className="privacy__content">
            <p className="privacy__updated">Última actualización: octubre de 2026</p>

            <section id="responsable" className="privacy__block">
              <span className="privacy__number">01</span>
              <h2>Responsable de los datos personales</h2>
              <p>
                La responsable del tratamiento de los datos personales recabados a través
                de este sitio es la <strong>{doctor.fullName}</strong>, con atención en{' '}
                <strong>{contact.hospital}</strong>, en Santiago de Querétaro, Querétaro.
              </p>
              <p>
                Para cualquier asunto relacionado con este aviso puedes comunicarte al
                teléfono <a href={contact.phoneHref}>{contact.phone}</a> o por WhatsApp al
                mismo número. La dirección exacta del consultorio se proporciona al
                confirmar una cita.
              </p>
            </section>

            <section id="datos" className="privacy__block">
              <span className="privacy__number">02</span>
              <h2>Datos personales que podemos recabar</h2>
              <p>
                A través del formulario de solicitud de cita se recaban únicamente datos
                básicos de contacto e identificación:
              </p>
              <ul>
                <li>Nombre completo.</li>
                <li>Número de teléfono.</li>
                <li>Correo electrónico, únicamente si decides proporcionarlo.</li>
                <li>
                  Tipo de consulta de interés, fecha preferida y preferencia horaria.
                </li>
                <li>El consentimiento otorgado para el tratamiento de tus datos.</li>
              </ul>
              <p>
                El formulario no solicita datos personales sensibles ni información clínica.
                Te pedimos no incluir diagnósticos, resultados de estudios o cualquier otro
                dato de salud en los campos de contacto o en los mensajes iniciales. La
                información clínica se revisa durante la consulta médica.
              </p>
              <p>
                Al escribir por WhatsApp, se comparten también los datos que decidas incluir
                en ese mensaje. Te recomendamos limitar el contenido a datos de contacto y
                coordinación de la cita.
              </p>
            </section>

            <section id="finalidades" className="privacy__block">
              <span className="privacy__number">03</span>
              <h2>Finalidades del tratamiento</h2>
              <p>Tus datos personales se utilizan para:</p>
              <ul>
                <li>Recibir y dar seguimiento a tu solicitud de cita.</li>
                <li>Contactarte para confirmar disponibilidad, fecha y horario.</li>
                <li>Coordinar la atención y comunicaciones relacionadas con tu cita.</li>
                <li>Cumplir con obligaciones legales y administrativas aplicables.</li>
              </ul>
              <p>
                No utilizamos tus datos para publicidad, prospección comercial ni para
                finalidades distintas a las descritas, salvo que exista un consentimiento
                adicional o una obligación legal.
              </p>
            </section>

            <section id="transferencias" className="privacy__block">
              <span className="privacy__number">04</span>
              <h2>Transferencias y servicios de terceros</h2>
              <p>
                No vendemos tus datos personales. Para la operación de este sitio y la
                comunicación contigo pueden intervenir proveedores tecnológicos:
              </p>
              <ul>
                <li>
                  <strong>WhatsApp</strong>, como canal de mensajería, cuando eliges
                  utilizarlo. El tratamiento de la información también se rige por las
                  políticas de Meta.
                </li>
                <li>
                  <strong>Servicios de alojamiento y mapas</strong>, que pueden registrar
                  datos técnicos como la dirección IP al cargar la página o el mapa.
                </li>
              </ul>
              <p>
                Estos proveedores pueden encontrarse fuera de México. Al utilizar sus
                servicios, aceptas sus condiciones y políticas de privacidad. Cuando la ley
                lo requiera, se solicitará tu consentimiento para transferencias adicionales.
              </p>
            </section>

            <section id="derechos" className="privacy__block">
              <span className="privacy__number">05</span>
              <h2>Tus derechos sobre tus datos</h2>
              <p>
                Tienes derecho a acceder a tus datos personales, rectificarlos cuando sean
                inexactos, cancelarlos cuando ya no sean necesarios y oponerte a su
                tratamiento. También puedes limitar el uso o divulgación de tus datos y
                revocar el consentimiento que hayas otorgado.
              </p>
              <p>
                Para ejercer estos derechos, comunícate al teléfono{' '}
                <a href={contact.phoneHref}>{contact.phone}</a>. Indica tu nombre, el
                derecho que deseas ejercer y los datos sobre los que realizas la solicitud.
                Es posible que se solicite información adicional para verificar tu identidad
                y proteger tus datos.
              </p>
              <p>
                La solicitud se atenderá en los plazos previstos por la Ley Federal de
                Protección de Datos Personales en Posesión de los Particulares y su
                reglamento.
              </p>
            </section>

            <section id="seguridad" className="privacy__block">
              <span className="privacy__number">06</span>
              <h2>Seguridad y conservación</h2>
              <p>
                Se aplican medidas administrativas y técnicas razonables para proteger tus
                datos contra acceso, uso o divulgación no autorizados. La información se
                conserva únicamente durante el tiempo necesario para las finalidades
                descritas o para cumplir obligaciones legales.
              </p>
              <p>
                Ningún sistema es completamente infalible. Por ello, te pedimos evitar el
                envío de información clínica sensible por canales que no sean la consulta
                médica.
              </p>
            </section>

            <section id="cambios" className="privacy__block">
              <span className="privacy__number">07</span>
              <h2>Cambios a este aviso</h2>
              <p>
                Este aviso puede actualizarse para reflejar cambios en la operación del
                sitio o en las obligaciones aplicables. La versión vigente será la publicada
                en esta página, con su fecha de actualización.
              </p>
              <p>
                Si tienes dudas sobre este aviso, puedes escribir al consultorio o
                consultarlo antes de enviar una solicitud de cita.
              </p>
            </section>

            <div className="privacy__callout">
              <p>
                <strong>Versión inicial.</strong> Este aviso fue preparado como parte del
                desarrollo del sitio y deberá ser revisado y validado por la responsable
                antes de su publicación definitiva.
              </p>
              <Link className="text-link" to="/contacto">
                Contactar al consultorio
                <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
