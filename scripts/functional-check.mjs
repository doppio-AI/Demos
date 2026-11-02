import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173'
const browser = await chromium.launch({ channel: 'msedge' })
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})

await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const h1 = await page.locator('h1').first().innerText()
if (h1.replace(/\s+/g, ' ') !== 'Tu salud es una prioridad.') {
  errors.push(`Unexpected hero H1: ${JSON.stringify(h1)}`)
}

for (const credential of ['11704457', '14272223', '2522012002A00115']) {
  if ((await page.locator(`text=${credential}`).count()) === 0) {
    errors.push(`Credential missing from home: ${credential}`)
  }
}

await page.locator('.service-card__link').first().click()
await page.waitForURL('**/agenda')
const preselected = await page.locator('input[name="serviceId"][value="control-prenatal"]').isChecked()
if (!preselected) errors.push('Service preselection from home did not work.')

await page.getByRole('button', { name: 'Continuar' }).click()

const date = new Date()
date.setDate(date.getDate() + 5)
const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
await page.locator('#preferredDate').fill(dateString)
await page.locator('input[name="preferredPeriod"][value="tarde"]').check({ force: true })
await page.getByRole('button', { name: 'Continuar' }).click()

await page.getByRole('button', { name: 'Revisar solicitud' }).click()
if ((await page.locator('.appointment-form__error-summary').count()) === 0) {
  errors.push('Expected form validation error on step 3.')
}

await page.locator('#fullName').fill('Maria Lopez Hernandez')
await page.locator('#phone').fill('9611234567')
await page.locator('#email').fill('maria@example.com')
await page.locator('input[name="consent"]').check()
await page.getByRole('button', { name: 'Revisar solicitud' }).click()

await page.locator('.appointment-review').waitFor()
await page.evaluate(() => {
  window.__openedUrl = ''
  window.open = (url) => {
    window.__openedUrl = String(url)
    return null
  }
})
await page.getByRole('button', { name: 'Enviar solicitud por WhatsApp' }).click()
await page.locator('.appointment-success h2').waitFor()

const openedUrl = await page.evaluate(() => window.__openedUrl)
if (!openedUrl.startsWith('https://wa.me/529611295167?text=')) {
  errors.push(`Unexpected WhatsApp URL: ${openedUrl}`)
}
const decoded = decodeURIComponent(new URL(openedUrl).searchParams.get('text') ?? '')
for (const expected of ['Maria Lopez Hernandez', '9611234567', 'Control prenatal', 'Por la tarde']) {
  if (!decoded.includes(expected)) errors.push(`WhatsApp message missing ${expected}`)
}
if (!decoded.includes('pendiente de confirmaci')) {
  errors.push('WhatsApp message does not state confirmation is pending.')
}
const statusText = await page.locator('.appointment-success__status strong').innerText()
if (!/pendiente de confirmaci/i.test(statusText)) {
  errors.push('Pending confirmation status is not visible.')
}

await page.screenshot({ path: '.screens/appointment-success.png', fullPage: true })

// Accessibility scans
const axeResults = []
for (const route of ['/', '/perfil', '/servicios', '/contacto', '/agenda', '/aviso-de-privacidad']) {
  await page.goto(baseUrl + route, { waitUntil: 'networkidle' })
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact ?? ''),
  )
  axeResults.push({ route, violations: results.violations, serious })
  console.log(`AXE ${route}: ${results.violations.length} total, ${serious.length} serious/critical`)
  for (const violation of results.violations) {
    console.log(` - [${violation.impact}] ${violation.id}: ${violation.help} (${violation.nodes.length})`)
  }
}

// Mobile menu
const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
})
const mobile = await mobileContext.newPage()
await mobile.goto(baseUrl, { waitUntil: 'networkidle' })
await mobile.locator('.menu-toggle').click()
if (!(await mobile.locator('.mobile-menu').isVisible())) {
  errors.push('Mobile menu did not open.')
}
await mobile.keyboard.press('Escape')
await mobile.waitForTimeout(700)
if (await mobile.locator('.mobile-menu').isVisible()) {
  errors.push('Mobile menu did not close with Escape.')
}
await mobile.locator('.menu-toggle').click()
await mobile.locator('.mobile-menu__nav-link').nth(2).click()
await mobile.waitForTimeout(700)
if (await mobile.locator('.mobile-menu').isVisible()) {
  errors.push('Mobile menu did not close after navigation.')
}
if (!mobile.url().endsWith('/servicios')) {
  errors.push(`Mobile menu navigation failed: ${mobile.url()}`)
}
const bodyOverflow = await mobile.evaluate(() => getComputedStyle(document.body).overflow)
if (bodyOverflow === 'hidden') {
  errors.push('Body scroll stayed locked after closing the mobile menu.')
}
await mobile.close()

await browser.close()

if (errors.length) {
  console.error('\nFUNCTIONAL ISSUES')
  for (const error of errors) console.error(error)
  process.exitCode = 1
} else {
  console.log('\nFunctional checks passed.')
}

const seriousAxe = axeResults.flatMap(({ route, serious }) =>
  serious.map((v) => `${route}: ${v.id} - ${v.help}`),
)
if (seriousAxe.length) {
  console.error('\nSERIOUS AXE ISSUES')
  for (const issue of seriousAxe) console.error(issue)
  process.exitCode = 1
}
