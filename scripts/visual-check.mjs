import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173'
const outDir = path.resolve('.screens')
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'msedge' })
const errors = []

const pages = [
  { name: 'home', path: '/' },
  { name: 'profile', path: '/perfil' },
  { name: 'services', path: '/servicios' },
  { name: 'contact', path: '/contacto' },
  { name: 'agenda', path: '/agenda' },
  { name: 'privacy', path: '/aviso-de-privacidad' },
  { name: '404', path: '/pagina-inexistente' },
]

for (const viewport of [
  { name: '1440', width: 1440, height: 980 },
  { name: '1024', width: 1024, height: 900 },
  { name: '768', width: 768, height: 900 },
  { name: '390', width: 390, height: 844 },
  { name: '360', width: 360, height: 800 },
]) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
  const page = await context.newPage()
  page.on('pageerror', (error) => errors.push(`[${viewport.name}] pageerror: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[${viewport.name}] console: ${message.text()}`)
  })

  for (const route of pages) {
    if (!['home', 'agenda'].includes(route.name) && viewport.name !== '1440') continue
    await page.goto(baseUrl + route.path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(900)
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
      title: document.title,
    }))
    if (dimensions.scrollWidth > dimensions.clientWidth + 1) {
      errors.push(`[${viewport.name}] ${route.path} overflow: ${dimensions.scrollWidth} > ${dimensions.clientWidth}`)
    }
    await page.screenshot({
      path: path.join(outDir, `${route.name}-${viewport.name}.png`),
      fullPage: true,
    })
    if (route.name === 'home') {
      await page.screenshot({
        path: path.join(outDir, `home-${viewport.name}-fold.png`),
        fullPage: false,
      })
    }
    console.log(`${viewport.name} ${route.path} ${dimensions.scrollWidth}x${dimensions.height} ${dimensions.title}`)
  }

  await context.close()
}

await browser.close()

if (errors.length) {
  console.error('\nISSUES')
  for (const error of errors) console.error(error)
  process.exitCode = 1
} else {
  console.log('\nNo console or overflow issues found.')
}


