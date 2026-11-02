type BrandMarkProps = {
  className?: string
  size?: number
}

export function BrandMark({ className, size = 44 }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.1" />
      <circle
        cx="24"
        cy="24"
        r="21.25"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <path
        d="M24 34.25C23.4 32.8 13.75 27.1 13.75 20.35C13.75 16.55 16.65 13.75 20.15 13.75C21.9 13.75 23.25 14.6 24 15.75C24.75 14.6 26.1 13.75 27.85 13.75C31.35 13.75 34.25 16.55 34.25 20.35C34.25 27.1 24.6 32.8 24 34.25Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M24 34.25C23.4 32.8 13.75 27.1 13.75 20.35C13.75 16.55 16.65 13.75 20.15 13.75C21.9 13.75 23.25 14.6 24 15.75C24.75 14.6 26.1 13.75 27.85 13.75C31.35 13.75 34.25 16.55 34.25 20.35C34.25 27.1 24.6 32.8 24 34.25Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M24 34.5C24.15 37.1 24.65 39.3 26.2 41"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M24.5 38.3C27 36.9 29.4 37.4 30.1 39.2C27.8 40.4 25.6 40.1 24.5 38.3Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M35.2 10.7L35.8 12.9L38 13.5L35.8 14.1L35.2 16.3L34.6 14.1L32.4 13.5L34.6 12.9L35.2 10.7Z"
        fill="currentColor"
      />
    </svg>
  )
}
