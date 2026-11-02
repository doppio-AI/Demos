import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/site'
import { ServiceGlyph } from '../ui/ServiceGlyph'
import './ServiceCard.css'

type ServiceCardProps = {
  service: Service
  index: number
  detailed?: boolean
}

export function ServiceCard({ service, index, detailed = false }: ServiceCardProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className={`service-card service-card--tone-${index + 1} ${detailed ? 'service-card--detailed' : ''}`.trim()}>
      <span className="service-card__number" aria-hidden="true">
        {number}
      </span>

      <div className="service-card__doodle" aria-hidden="true">
        <svg viewBox="0 0 210 210" fill="none">
          <path
            d="M106 202C104 165 109 142 101 110"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M103 152C78 141 59 147 51 164C72 175 93 168 103 152Z"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <path
            d="M103 178C126 163 148 168 156 184C134 197 113 191 103 178Z"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <path
            d="M102 110C71 104 54 78 63 52C81 33 103 38 109 57C122 37 145 37 157 56C168 77 151 102 119 110"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <path
            d="M112 76C112 65 122 58 132 64C137 57 148 61 148 72C148 84 130 95 130 95C130 95 112 85 112 76Z"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.7"
          />
          <circle cx="172" cy="50" r="3" fill="currentColor" opacity="0.4" />
          <path
            d="M43 88L45 96L53 98L45 100L43 108L41 100L33 98L41 96L43 88Z"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="service-card__top">
        <span className="service-card__icon" aria-hidden="true">
          <ServiceGlyph icon={service.icon} size={25} />
        </span>
      </div>

      <div className="service-card__body">
        <h3>{service.title}</h3>
        <p>{detailed ? service.description : service.summary}</p>
      </div>

      <Link
        className="service-card__link"
        to="/agenda"
        state={{ serviceId: service.id }}
        aria-label={`Solicitar información sobre ${service.title}`}
      >
        Solicitar información
        <span className="service-card__link-arrow" aria-hidden="true">
          <ArrowUpRight size={15} strokeWidth={1.7} />
        </span>
      </Link>
    </article>
  )
}
