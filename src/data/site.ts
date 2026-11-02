export type ServiceIcon =
  | 'baby'
  | 'birth'
  | 'microscope'
  | 'scan'
  | 'balance'
  | 'flower'
  | 'shield'

export type Service = {
  id: string
  title: string
  summary: string
  description: string
  icon: ServiceIcon
}

export const doctor = {
  fullName: 'Dra. Claudia Magally Ramírez García',
  shortName: 'Dra. Claudia Magally',
  lastName: 'Ramírez García',
  initials: 'CM',
  specialty: 'Ginecología y Obstetricia',
  areas: [
    'Ginecología y Obstetricia',
    'Colposcopia',
    'Endocrinología Ginecológica',
    'Menopausia y Climaterio',
  ],
  credentials: [
    {
      label: 'Cédula profesional',
      value: '11704457',
      shortLabel: 'Céd. profesional',
    },
    {
      label: 'Cédula de especialidad',
      value: '14272223',
      shortLabel: 'Céd. especialidad',
    },
    {
      label: 'Registro COFEPRIS',
      value: '2522012002A00115',
      shortLabel: 'COFEPRIS',
    },
  ],
  hospital: 'Hospital Star Médica Querétaro',
  profileIntro:
    'La Dra. Claudia Magally Ramírez García es médica especialista en Ginecología y Obstetricia. Su práctica se centra en la salud femenina desde una perspectiva clínica, cercana y respetuosa, con atención en prevención, embarazo, colposcopia, endocrinología ginecológica y las distintas etapas de la menopausia y el climaterio.',
  profileStatus:
    'Texto de presentación provisional, elaborado a partir de la información profesional proporcionada. Queda pendiente la versión aprobada por la doctora.',
  photo: null as string | null,
}

export const contact = {
  phone: '961 129 5167',
  phoneHref: 'tel:+529611295167',
  whatsappNumber: '529611295167',
  whatsappDisplay: '+52 961 129 5167',
  email: null as string | null,
  hospital: 'Hospital Star Médica Querétaro',
  city: 'Santiago de Querétaro, Querétaro',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Hospital+Star+M%C3%A9dica+Quer%C3%A9taro',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Hospital%20Star%20M%C3%A9dica%20Quer%C3%A9taro&output=embed',
  scheduleNote:
    'Los horarios y la ubicación exacta del consultorio se confirman directamente al agendar.',
}

export const services: Service[] = [
  {
    id: 'control-prenatal',
    title: 'Control prenatal',
    summary: 'Acompañamiento y seguimiento médico durante el embarazo.',
    description:
      'Seguimiento médico del embarazo con evaluaciones periódicas y orientación para cada etapa, de acuerdo con las necesidades de cada paciente.',
    icon: 'baby',
  },
  {
    id: 'parto-cesarea',
    title: 'Atención de parto y cesárea',
    summary: 'Atención obstétrica y acompañamiento del nacimiento.',
    description:
      'Atención obstétrica y acompañamiento del nacimiento. La vía de nacimiento se determina de forma individualizada, con base en la valoración médica de cada caso.',
    icon: 'birth',
  },
  {
    id: 'papanicolaou',
    title: 'Papanicolaou',
    summary: 'Estudio de detección y evaluación de alteraciones cervicales.',
    description:
      'Estudio de detección y evaluación de alteraciones cervicales, realizado como parte del cuidado preventivo de la salud ginecológica.',
    icon: 'microscope',
  },
  {
    id: 'colposcopia',
    title: 'Colposcopia',
    summary: 'Evaluación especializada del cuello uterino.',
    description:
      'Evaluación especializada del cuello uterino mediante colposcopía, cuando la valoración médica lo indica.',
    icon: 'scan',
  },
  {
    id: 'endocrinologia-ginecologica',
    title: 'Endocrinología ginecológica',
    summary: 'Atención de condiciones relacionadas con el equilibrio hormonal femenino.',
    description:
      'Atención de condiciones relacionadas con el equilibrio hormonal femenino, con una valoración médica individual y orientación sobre las opciones de manejo.',
    icon: 'balance',
  },
  {
    id: 'menopausia-climaterio',
    title: 'Menopausia y climaterio',
    summary: 'Acompañamiento durante la transición menopáusica.',
    description:
      'Acompañamiento y atención durante las diferentes etapas de la transición menopáusica, con seguimiento cercano y orientación médica.',
    icon: 'flower',
  },
  {
    id: 'vph',
    title: 'VPH',
    summary: 'Evaluación, orientación y atención relacionada con el VPH.',
    description:
      'Evaluación, orientación y atención relacionada con el virus del papiloma humano, con información clara y seguimiento según cada caso.',
    icon: 'shield',
  },
]

export const stages = [
  {
    number: '01',
    label: 'Prevención y detección',
    text: 'Papanicolaou, colposcopía y VPH: cuidar hoy también es prevenir.',
  },
  {
    number: '02',
    label: 'Embarazo y nacimiento',
    text: 'Seguimiento médico y acompañamiento a lo largo del embarazo.',
  },
  {
    number: '03',
    label: 'Equilibrio hormonal',
    text: 'Una mirada integral a las condiciones hormonales femeninas.',
  },
  {
    number: '04',
    label: 'Menopausia y climaterio',
    text: 'Acompañamiento en una nueva etapa de tu salud.',
  },
]

export const principles = [
  {
    number: '01',
    title: 'Escuchar primero',
    text: 'Cada consulta comienza por dar espacio a tus preguntas, tus dudas y lo que te preocupa.',
  },
  {
    number: '02',
    title: 'Explicar con claridad',
    text: 'Información médica comprensible para que puedas participar en las decisiones sobre tu salud.',
  },
  {
    number: '03',
    title: 'Acompañar de cerca',
    text: 'Un seguimiento cercano y respetuoso, de acuerdo con las necesidades de cada etapa.',
  },
]

export const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Perfil', to: '/perfil' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Contacto', to: '/contacto' },
]

export const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

export const defaultWhatsAppMessage =
  'Hola, me gustaría solicitar información sobre una consulta con la Dra. Claudia Magally Ramírez García.'

export function getWhatsAppUrl(message = defaultWhatsAppMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}
