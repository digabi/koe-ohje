import { test, expect } from '@playwright/test'

test.describe('Python instructions', () => {
  test('should have certain elements visible and hidden', async ({ page }) => {
    await page.goto('/build/?fi')
    await page.click('text=OHJELMOINTI')
    await expect(page.locator('h2').first()).toContainText('Tekstin tulostaminen')
  })
})
