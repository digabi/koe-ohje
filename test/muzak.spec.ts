import { test, expect } from '@playwright/test'

const numberOfAudioClips = 17
const testAudioClipPlayButtonSelector = '[data-muzakid="tab-muzak-music-ef"]'
const testAudioClipAnotherPlayButtonSelector = '[data-muzakid="tab-muzak-music-lo"]'

test.describe('Muzak', () => {
  test.describe('Muzak Player', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/build/?fi')
      await page.click('text=MUSIIKKI')
    })

    test('should contain fontawesome play icon for every title', async ({ page }) => {
      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(numberOfAudioClips)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(0)
    })

    test('should change play button to pause to again to play', async ({ page }) => {
      await expect(page.locator(testAudioClipPlayButtonSelector)).toHaveCount(1)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(numberOfAudioClips - 1)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(1)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-pause`)).toHaveAttribute(
        'data-icon',
        'pause',
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator('.svg-inline--fa.fa-play')).toHaveCount(numberOfAudioClips)
      await expect(page.locator('.svg-inline--fa.fa-pause')).toHaveCount(0)
    })

    test('should stop playing if button is clicked when playing', async ({ page }) => {
      await expect(page.locator(testAudioClipPlayButtonSelector)).toHaveCount(1)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-pause`)).toHaveAttribute(
        'data-icon',
        'pause',
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )
    })

    test('should pause previous audio clip if another is played', async ({ page }) => {
      await expect(page.locator(testAudioClipPlayButtonSelector)).toHaveCount(1)
      await expect(page.locator(testAudioClipAnotherPlayButtonSelector)).toHaveCount(1)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )

      await expect(page.locator(`${testAudioClipAnotherPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )

      await page.click(testAudioClipPlayButtonSelector)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-pause`)).toHaveAttribute(
        'data-icon',
        'pause',
      )

      await expect(page.locator(`${testAudioClipAnotherPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )

      await page.click(testAudioClipAnotherPlayButtonSelector)

      await expect(page.locator(`${testAudioClipPlayButtonSelector} .svg-inline--fa.fa-play`)).toHaveAttribute(
        'data-icon',
        'play',
      )

      await expect(page.locator(`${testAudioClipAnotherPlayButtonSelector} .svg-inline--fa.fa-pause`)).toHaveAttribute(
        'data-icon',
        'pause',
      )
    })
  })
})
