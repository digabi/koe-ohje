import { test, expect } from '@playwright/test'

test.describe('Language', () => {
  test.describe('Initial language selection', () => {
    test('should highlight finnish in navbar', async ({ page }) => {
      await page.goto('/build/?lang=fi')

      await expect(page.locator('.tab-menu-language-fi.active')).toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).not.toBeVisible()
    })

    test('should highlight swedish in navbar', async ({ page }) => {
      await page.goto('/build/?lang=sv')

      await expect(page.locator('.tab-menu-language-fi.active')).not.toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).toBeVisible()
    })

    test('should have correct page title', async ({ page }) => {
      await page.goto('/build/?lang=fi')
      await expect(page).toHaveTitle('Koeympäristön ohjeet')

      await page.goto('/build/?lang=sv')
      await expect(page).toHaveTitle('Provmiljöns instruktioner')
    })
  })

  test.describe('Default tab', () => {
    test('should show general tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=general')
      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })

    test('should show general tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=general')
      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })

    test('should show chemistry tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=chemistry')
      await expect(page.locator('h1')).toHaveText('Kemia')
    })

    test('should show chemistry tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=chemistry')
      await expect(page.locator('h1')).toHaveText('Kemi')
    })

    test('should show maps tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=maps')
      await expect(page.locator('h1')).toHaveText('Kartat')
    })

    test('should show maps tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=maps')
      await expect(page.locator('h1')).toHaveText('Kartor')
    })

    test('should show keyboard tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=keyboard')
      await expect(page.locator('h1')).toHaveText('Näppäimistö')
    })

    test('should show keyboard tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=keyboard')
      await expect(page.locator('h1')).toHaveText('Tangentbord')
    })

    test('should show math tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=math')
      await expect(page.locator('h1')).toHaveText('Matematiikka')
    })

    test('should show math tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=math')
      await expect(page.locator('h1')).toHaveText('Matematik')
    })

    test('should show physics tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=physics')
      await expect(page.locator('h1')).toHaveText('Fysiikka')
    })

    test('should show physics tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=physics')
      await expect(page.locator('h1')).toHaveText('Fysik')
    })

    test('should show programming tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=programming')
      await expect(page.locator('h1')).toHaveText('Ohjelmointi')
    })

    test('should show programming tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=programming')
      await expect(page.locator('h1')).toHaveText('Programmering')
    })
  })

  test.describe('Changing language', () => {
    test('should change default page language from finnish to swedish when clicked', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=general')

      await expect(page.locator('h1')).toHaveText('Yleisohjeet')

      await page.click('.tab-menu-language-selection a[data-lang-id=sv]')

      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })

    test('should change default page language from swedish to finnish when clicked', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=general')

      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')

      await page.click('.tab-menu-language-selection a[data-lang-id=fi]')

      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })
  })
})
