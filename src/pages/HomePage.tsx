import { Credentials } from '../components/sections/Credentials'
import { Hero } from '../components/sections/Hero'
import { IntroSection } from '../components/sections/IntroSection'
import { LocationSection } from '../components/sections/LocationSection'
import { ProfilePreview } from '../components/sections/ProfilePreview'
import { ServicesSection } from '../components/sections/ServicesSection'
import { StagesSection } from '../components/sections/StagesSection'
import { AppointmentCTA } from '../components/sections/AppointmentCTA'
import { usePageMeta } from '../lib/seo'

export function HomePage() {
  usePageMeta({
    title: 'Dra. Claudia Magally Ramírez García | Ginecóloga en Querétaro',
    description:
      'Ginecología y Obstetricia en Querétaro. Atención en control prenatal, colposcopia, endocrinología ginecológica, menopausia y climaterio. Solicita una cita con la Dra. Claudia Magally Ramírez García.',
  })

  return (
    <>
      <Hero />
      <IntroSection />
      <StagesSection />
      <ServicesSection />
      <ProfilePreview />
      <Credentials />
      <LocationSection />
      <AppointmentCTA />
    </>
  )
}
