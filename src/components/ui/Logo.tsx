import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import './Logo.css'

type LogoProps = {
  light?: boolean
  onClick?: () => void
}

export function Logo({ light = false, onClick }: LogoProps) {
  return (
    <Link
      className={`brand ${light ? 'brand--light' : ''}`.trim()}
      to="/"
      title="Ir al inicio"
      onClick={onClick}
    >
      <BrandMark className="brand__mark" size={44} />
      <span className="brand__text">
        <span className="brand__name">Dra. Claudia Magally</span>
        <span className="brand__desc">Ginecología &amp; Obstetricia</span>
      </span>
    </Link>
  )
}
