import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

const numberOfAudioClips = 17
const testAudioClipPlayButtonSelector = `[data-muzakid="tab-muzak-music-ef"]`

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
      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(numberOfAudioClips)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(0)
    })

    it('should change play button to pause to again to play', async () => {
      await expect(page.locator(testAudioClipPlayButtonSelector)).toHaveCount(1)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play'
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(numberOfAudioClips - 1)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(1)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-pause`)).toHaveAttribute(
        'data-icon',
        'pause'
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(numberOfAudioClips)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(0)
    })
  })
})
