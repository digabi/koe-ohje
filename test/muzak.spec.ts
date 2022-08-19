import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

describe('Muzak', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Muzak Player', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
      await page.click('text=MUSIIKKI')
    })

    it('should contain fontawesome play icon for every title', async () => {
      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(8)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(0)

      await expect(page.locator('[data-muzakid="tab-muzak-music1"] .svg-inline--fa.fa-play')).toHaveAttribute(
        'data-icon',
        'play'
      )
    })

    it('should change play button to pause to again to play', async () => {
      await page.click('[data-muzakid="tab-muzak-music1"]')

      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(7)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(1)

      await expect(page.locator('[data-muzakid="tab-muzak-music1"] .svg-inline--fa.fa-pause')).toHaveAttribute(
        'data-icon',
        'pause'
      )

      await page.click('[data-muzakid="tab-muzak-music1"]')

      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(8)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(0)
    })
  })
})
