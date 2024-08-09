import { test, expect, Page } from '@playwright/test'

test.describe('Digabi Exam Help', () => {
  test.describe('Tabs in Finnish', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/build?fi')
    })

    test('should render finnish general as initial tab', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })

    test('should be able to open tabs when clicked (fi)', async ({ page }) => {
      await page.click('text=FYSIIKKA')
      await expect(page.locator('h1')).toHaveText('Fysiikka')

      await page.click('text=KARTAT')
      await expect(page.locator('h1')).toHaveText('Kartat')

      await page.click('text=KEMIA')
      await expect(page.locator('h1')).toHaveText('Kemia')

      await page.click('text=MATEMATIIKKA')
      await expect(page.locator('h1')).toHaveText('Matematiikka')

      await page.click('text=MUSIIKKI')
      await expect(page.locator('h1')).toHaveText('Musiikki')

      await page.click('text=NÄPPÄIMISTÖ')
      await expect(page.locator('h1')).toHaveText('Näppäimistö')

      await page.click('text=OHJELMOINTI')
      await expect(page.locator('h1')).toHaveText('Ohjelmointi')

      await page.click('text=YLEISOHJEET')
      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })
  })

  test.describe('Tabs in Swedish', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/build?sv')
    })

    test('should render general as initial tab', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })

    test('should be able to open tabs when clicked (sv)', async ({ page }) => {
      await page.click('text=FYSIK')
      await expect(page.locator('h1')).toHaveText('Fysik')

      await page.click('text=KARTOR')
      await expect(page.locator('h1')).toHaveText('Kartor')

      await page.click('text=KEMI')
      await expect(page.locator('h1')).toHaveText('Kemi')

      await page.click('text=MATEMATIK')
      await expect(page.locator('h1')).toHaveText('Matematik')

      await page.click('text=MUSIK')
      await expect(page.locator('h1')).toHaveText('Musik')

      await page.click('text=PROGRAMMERING')
      await expect(page.locator('h1')).toHaveText('Programmering')

      await page.click('text=TANGENTBORD')
      await expect(page.locator('h1')).toHaveText('Tangentbord')

      await page.click('text=ALLMÄNNA INSTRUKTIONER')
      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })
  })
})
