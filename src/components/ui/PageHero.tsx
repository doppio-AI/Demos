import './PageHero.css'

type PageHeroProps = {
  eyebrow: string
  title: string
  intro: string
  children?: React.ReactNode
  variant?: 'default' | 'simple'
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  variant = 'default',
}: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${variant}`}>
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__intro">{intro}</p>
          {children ? <div className="page-hero__actions">{children}</div> : null}
        </div>

        {variant === 'default' ? (
          <div className="page-hero__art" aria-hidden="true">
            <span className="page-hero__orb page-hero__orb--one" />
            <span className="page-hero__orb page-hero__orb--two" />
            <svg
              className="page-hero__flower"
              viewBox="0 0 280 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M139 299C139 247 137 210 145 162"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M145 215C119 203 92 209 84 230C110 241 137 235 145 215Z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M142 246C168 232 194 238 202 259C176 270 150 265 142 246Z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M140 162C101 162 67 137 67 103C67 69 94 44 124 51C133 31 154 18 176 25C202 13 232 32 234 61C263 66 279 90 271 116C286 143 266 171 240 171C230 195 199 204 178 188C163 202 140 194 131 177C117 180 103 176 95 166C79 170 65 157 65 140"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
                opacity="0.65"
              />
              <path
                d="M115 105C115 84 132 66 154 66C176 66 193 84 193 105C193 131 154 156 154 156C154 156 115 131 115 105Z"
                fill="currentColor"
                opacity="0.08"
              />
              <path
                d="M115 105C115 84 132 66 154 66C176 66 193 84 193 105C193 131 154 156 154 156C154 156 115 131 115 105Z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M154 121C154 113 146 109 142 113C137 108 129 112 129 120C129 128 138 135 154 143C170 135 179 128 179 120C179 112 171 108 166 113C162 109 154 113 154 121Z"
                fill="currentColor"
                opacity="0.18"
              />
              <circle cx="238" cy="43" r="5" fill="currentColor" opacity="0.3" />
              <circle cx="45" cy="235" r="3" fill="currentColor" opacity="0.28" />
              <path
                d="M52 67L54 75L62 77L54 79L52 87L50 79L42 77L50 75L52 67Z"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </section>
  )
}
