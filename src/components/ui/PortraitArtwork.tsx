import { useId } from 'react'
import { doctor } from '../../data/site'
import './PortraitArtwork.css'

type PortraitArtworkProps = {
  className?: string
  priority?: boolean
}

export function PortraitArtwork({ className = '', priority = false }: PortraitArtworkProps) {
  const uid = useId().replace(/:/g, '')
  const hasPhoto = Boolean(doctor.photo)

  return (
    <div className={`portrait-art ${className}`.trim()}>
      <div className="portrait-art__frame">
        {hasPhoto ? (
          <img
            className="portrait-art__photo"
            src={doctor.photo ?? undefined}
            alt={`Retrato de la ${doctor.fullName}`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        ) : (
          <svg
            className="portrait-art__canvas"
            viewBox="0 0 560 720"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id={`${uid}-bg`} x1="80" y1="0" x2="490" y2="720" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9E3E8" />
                <stop offset="0.46" stopColor="#FFF6F3" />
                <stop offset="1" stopColor="#EFE7F2" />
              </linearGradient>
              <radialGradient id={`${uid}-glow`} cx="0" cy="0" r="1" gradientTransform="translate(399 193) rotate(115) scale(278 222)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`${uid}-petal`} x1="209" y1="146" x2="364" y2="401" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8A1B5" stopOpacity="0.34" />
                <stop offset="1" stopColor="#D77BA4" stopOpacity="0.04" />
              </linearGradient>
              <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="34" />
              </filter>
            </defs>

            <rect width="560" height="720" fill={`url(#${uid}-bg)`} />
            <rect width="560" height="720" fill={`url(#${uid}-glow)`} />

            <circle cx="461" cy="153" r="137" fill="#EAE4F2" opacity="0.6" />
            <circle cx="72" cy="558" r="155" fill="#F7DDE4" opacity="0.74" filter={`url(#${uid}-blur)`} />
            <path
              d="M-31 416C54 349 94 323 147 303C236 270 321 314 385 371C427 409 453 457 463 518"
              stroke="#B85C84"
              strokeWidth="0.9"
              opacity="0.22"
            />
            <path
              d="M609 319C548 286 489 271 433 276C362 281 315 327 276 379"
              stroke="#29284F"
              strokeWidth="0.8"
              opacity="0.15"
            />

            <g opacity="0.8">
              <path
                d="M183 92C211 65 247 76 254 103C262 133 239 159 211 165C187 170 165 156 160 133C154 108 163 108 183 92Z"
                fill="#F7DDE4"
                opacity="0.55"
              />
              <path
                d="M206 119C206 108 216 101 225 106C231 99 242 103 243 113C244 126 225 139 225 139C225 139 206 128 206 119Z"
                stroke="#AD4D77"
                strokeWidth="1.2"
                strokeLinejoin="round"
                opacity="0.7"
              />
            </g>

            <g className="portrait-art__stem">
              <path
                d="M286 705C276 629 303 563 279 486C260 425 263 382 287 328"
                stroke="#9C5272"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M281 538C243 507 201 510 180 541C211 566 258 565 281 538Z"
                fill="#F7DDE4"
                fillOpacity="0.55"
                stroke="#B85C84"
                strokeWidth="1.15"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <path
                d="M280 589C315 552 360 546 387 572C361 602 314 610 280 589Z"
                fill="#F7DDE4"
                fillOpacity="0.45"
                stroke="#B85C84"
                strokeWidth="1.15"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <path
                d="M286 659C259 640 229 645 217 665C240 680 270 676 286 659Z"
                stroke="#B85C84"
                strokeWidth="1.1"
                opacity="0.6"
              />
            </g>

            <g transform="translate(291 281)">
              {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map((rotation, index) => (
                <path
                  key={`outer-${rotation}`}
                  d="M0 7C-36 -16 -54 -65 -32 -101C-11 -135 30 -137 51 -105C72 -72 48 -20 0 7Z"
                  transform={`rotate(${rotation})`}
                  fill={index % 2 === 0 ? `url(#${uid}-petal)` : 'none'}
                  stroke="#AD4D77"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                  opacity="0.74"
                />
              ))}

              {[25.7, 77.1, 128.5, 179.9, 231.3].map((rotation) => (
                <path
                  key={`inner-${rotation}`}
                  d="M0 4C-22 -13 -32 -49 -17 -72C-3 -93 24 -90 35 -67C46 -44 27 -10 0 4Z"
                  transform={`rotate(${rotation}) scale(0.6)`}
                  fill="#FFF9F8"
                  fillOpacity="0.22"
                  stroke="#AD4D77"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                  opacity="0.62"
                />
              ))}

              <circle cx="0" cy="0" r="23" fill="#F7DDE4" fillOpacity="0.75" stroke="#AD4D77" strokeWidth="1.1" />
              <circle cx="0" cy="0" r="12" fill="none" stroke="#AD4D77" strokeWidth="1" opacity="0.55" />
              {[0, 72, 144, 216, 288].map((rotation) => (
                <circle
                  key={`dot-${rotation}`}
                  cx="0"
                  cy="-17"
                  r="1.8"
                  fill="#AD4D77"
                  transform={`rotate(${rotation})`}
                  opacity="0.7"
                />
              ))}
            </g>

            <g opacity="0.65">
              <path
                d="M423 357C423 347 431 339 440 344C445 337 456 341 456 351C456 364 440 374 440 374C440 374 423 365 423 357Z"
                stroke="#AD4D77"
                strokeWidth="1.1"
                strokeLinejoin="round"
                fill="#FFF9F8"
                fillOpacity="0.3"
              />
              <path
                d="M100 357C100 348 108 341 116 345C121 339 131 343 131 352C131 364 116 373 116 373C116 373 100 364 100 357Z"
                stroke="#AD4D77"
                strokeWidth="1.05"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            <g stroke="#AD4D77" strokeWidth="1" opacity="0.55">
              <path d="M119 261L121 270L130 272L121 274L119 283L117 274L108 272L117 270L119 261Z" fill="#FFF9F8" fillOpacity="0.7" strokeLinejoin="round" />
              <path d="M456 455L458 463L466 465L458 467L456 475L454 467L446 465L454 463L456 455Z" fill="#FFF9F8" fillOpacity="0.7" strokeLinejoin="round" />
              <circle cx="472" cy="242" r="3.2" fill="#AD4D77" stroke="none" />
              <circle cx="143" cy="464" r="2.2" fill="#AD4D77" stroke="none" />
            </g>

            <path
              d="M65 88C95 57 133 55 158 76"
              stroke="#29284F"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.18"
            />
            <path
              d="M496 565C521 591 529 621 518 650"
              stroke="#29284F"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.16"
            />
          </svg>
        )}

        <div className="portrait-art__wash" aria-hidden="true" />
        <span className="portrait-art__vertical" aria-hidden="true">
          Querétaro · México
        </span>

        <div className="portrait-art__plate">
          <span className="portrait-art__plate-eyebrow">Ginecología &amp; Obstetricia</span>
          <span className="portrait-art__plate-name">{doctor.shortName.replace('Dra. ', 'Dra. ')}</span>
          <span className="portrait-art__plate-last">{doctor.lastName}</span>
        </div>
      </div>
    </div>
  )
}
