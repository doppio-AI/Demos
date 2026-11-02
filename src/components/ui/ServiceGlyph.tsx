import {
  Baby,
  Flower2,
  HeartHandshake,
  Microscope,
  ScanLine,
  Scale,
  ShieldPlus,
} from 'lucide-react'
import type { ServiceIcon } from '../../data/site'

const icons = {
  baby: Baby,
  birth: HeartHandshake,
  microscope: Microscope,
  scan: ScanLine,
  balance: Scale,
  flower: Flower2,
  shield: ShieldPlus,
} satisfies Record<ServiceIcon, typeof Baby>

type ServiceGlyphProps = {
  icon: ServiceIcon
  size?: number
  strokeWidth?: number
}

export function ServiceGlyph({ icon, size = 24, strokeWidth = 1.4 }: ServiceGlyphProps) {
  const Icon = icons[icon]
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />
}
