import { test, expect, Page } from '@playwright/test'

test.describe('Maps', () => {
  test.beforeEach(({ page }) => page.goto('/build/index.html?lang=fi&tab=maps'))

  test.describe('World map', () => {
    test('renders', async ({ page }) => {
      await expect(page.locator('#toc-geo-world')).toHaveText('Maailmankartta')
      await expect(page.locator('#map-container')).toBeVisible()
      await expect(page.locator('#map-container img.leaflet-tile-loaded')).toHaveCount(12)
    })

    test('is zoomable', async ({ page }) => {
      await expectZoomable(page, '#map-container')
    })

    test('is draggable', async ({ page }) => {
      await expectDraggable(page, '#map-container')
    })

    test('supports debug mode by opening another layer into map', async ({ page }) => {
      await expectDebugMode(page, '#map-container')
    })
  })

  test.describe('Terrain map', () => {
    test('renders', async ({ page }) => {
      await expect(page.locator('#toc-geo-fi')).toHaveText('Suomen yleis- ja maastokartta')
      await expect(page.locator('#terrain-container')).toBeVisible()
      await expect(page.locator('#terrain-container img.leaflet-tile-loaded')).toHaveCount(6)
    })

    test('is zoomable', async ({ page }) => {
      await expectZoomable(page, '#terrain-container')
    })

    test('is draggable', async ({ page }) => {
      await expectDraggable(page, '#terrain-container')
    })

    test('supports debug mode by opening another layer into map', async ({ page }) => {
      await expectDebugMode(page, '#terrain-container')
    })
  })
})

async function expectDebugMode(page: Page, containerSelector: string) {
  await page.locator(containerSelector).click()
  await expect(page.locator(`${containerSelector} .leaflet-layer`)).toHaveCount(1)
  await page.keyboard.down('Shift')
  await page.keyboard.press('D')
  await page.keyboard.up('Shift')
  await expect(page.locator(`${containerSelector} .leaflet-layer`)).toHaveCount(2)
}

async function expectZoomable(page: Page, containerSelector: string) {
  await expect(page.locator(`${containerSelector} .leaflet-proxy`)).toHaveAttribute('style', /scale\(1\)/)
  await page.locator(containerSelector).getByTitle('Zoom in').click()
  // TODO: Better way to wait transform
  await page.waitForTimeout(500)
  await expect(page.locator(`${containerSelector} .leaflet-proxy`)).toHaveAttribute('style', /scale\(2\)/)
  await page.locator(containerSelector).getByTitle('Zoom out').click()
  await page.waitForTimeout(500)
  await expect(page.locator(`${containerSelector} .leaflet-proxy`)).toHaveAttribute('style', /scale\(1\)/)
}

async function expectDraggable(page: Page, containerSelector: string) {
  const initialPos = getPosition(await page.locator(`${containerSelector} .leaflet-map-pane`).getAttribute('style'))
  await page.click(containerSelector)
  await page.mouse.down()
  await page.mouse.move(0, 0)
  await page.mouse.up()
  const translatedPos = getPosition(await page.locator(`${containerSelector} .leaflet-map-pane`).getAttribute('style'))
  expect(translatedPos.x).toBeLessThan(initialPos.x)
  expect(translatedPos.y).toBeLessThan(initialPos.y)
}

function getPosition(str: string) {
  const t = str.match(/^transform: translate3d\((-?\d+\.?\d*)px, (-?\d+\.?\d*)px, 0px\);$/)
  return { x: Number(t[1]), y: Number(t[2]) }
}
