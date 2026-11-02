import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const browser = await chromium.launch({
  ...(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {}),
})
const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:5173'
const routes = ['/', '/perfil', '/servicios', '/contacto', '/agenda', '/aviso-de-privacidad', '/pagina-inexistente']
const viewports = [
  [320, 568], [390, 844], [667, 375], [844, 390],
  [768, 1024], [1024, 768], [1050, 800], [1440, 900], [2560, 1440],
]
let checks = 0
try {
  for (const [width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of routes) {
      await page.goto(baseUrl + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      assert.equal(await page.locator('h1').count(), 1, `${width} ${route}: heading`)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)
      assert.equal(overflow, false, `${width} ${route}: horizontal overflow`)
      checks++
    }
    if (width < 1050) {
      await page.locator('.menu-toggle').click()
      const panel = page.locator('.mobile-menu__panel')
      await panel.waitFor()
      // Scrolling to the final action must not collapse navigation rows.
      const lastLink = panel.locator('a').last()
      await lastLink.scrollIntoViewIfNeeded()
      const bounds = await lastLink.boundingBox()
      assert.ok(bounds && bounds.y >= 0 && bounds.y + bounds.height <= height + 1, `${width}: menu action unreachable`)
      assert.ok(await panel.locator('.mobile-menu__nav-link').first().evaluate(el => el.getBoundingClientRect().height >= 44), `${width}: compressed navigation`)
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.locator('.mobile-menu').waitFor({ state: 'detached' })
      assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden', 'Resize must unlock scrolling')
    }
    assert.deepEqual(errors, [], `${width}: browser errors`)
    await context.close()
  }
  const page = await browser.newPage({ viewport: { width: 320, height: 568 }, reducedMotion: 'reduce' })
  await page.goto(baseUrl + '/agenda', { waitUntil: 'networkidle' })
  await page.locator('input[name="serviceId"]').first().check({ force: true })
  await page.getByRole('button', { name: 'Continuar' }).click()
  assert.ok(await page.locator('#preferredDate').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 16), 'Date field must avoid mobile focus zoom')
  console.log(`Passed: ${checks} route/viewport checks, short-screen menus, desktop resize and mobile input size.`)
} finally {
  await browser.close()
}
