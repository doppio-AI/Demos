import { useEffect } from 'react'
import { siteUrl } from '../data/site'

type PageMeta = {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export function usePageMeta({
  title,
  description,
  image = '/og-image.png',
  noIndex = false,
}: PageMeta) {
  useEffect(() => {
    const origin = siteUrl || window.location.origin
    const absoluteImage = image.startsWith('http') ? image : `${origin}${image}`
    const canonicalUrl = `${siteUrl || window.location.origin}${window.location.pathname}`

    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', absoluteImage)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', absoluteImage)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
    setMeta('property', 'og:url', canonicalUrl)
  }, [description, image, noIndex, title])
}
