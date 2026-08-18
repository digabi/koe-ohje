import { test, expect } from '@playwright/test'

test.describe('Language', () => {
  test.describe('Initial language selection', () => {
    test('should highlight finnish in navbar', async ({ page }) => {
      await page.goto('/build/?lang=fi')

      await expect(page.locator('.tab-menu-language-fi.active')).toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).not.toBeVisible()
      await expect(page.locator('.tab-menu-language-en.active')).not.toBeVisible()
    })

    test('should highlight swedish in navbar', async ({ page }) => {
      await page.goto('/build/?lang=sv')

      await expect(page.locator('.tab-menu-language-fi.active')).not.toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).toBeVisible()
      await expect(page.locator('.tab-menu-language-en.active')).not.toBeVisible()
    })

    test('should highlight english in navbar', async ({ page }) => {
      await page.goto('/build/?lang=en')

      await expect(page.locator('.tab-menu-language-fi.active')).not.toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).not.toBeVisible()
      await expect(page.locator('.tab-menu-language-en.active')).toBeVisible()
    })

    test('should have correct page title', async ({ page }) => {
      await page.goto('/build/?lang=fi')
      await expect(page).toHaveTitle('Koeympäristön ohjeet')

      await page.goto('/build/?lang=sv')
      await expect(page).toHaveTitle('Provmiljöns instruktioner')

      await page.goto('/build/?lang=en')
      await expect(page).toHaveTitle('Test Environment Instructions')
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

    test('should show general tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=general')
      await expect(page.locator('h1')).toHaveText('General Instructions')
    })
  })

  test.describe('Chemistry tab', () => {
    test('should show chemistry tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=chemistry')
      await expect(page.locator('h1')).toHaveText('Kemia')
    })

    test('should show chemistry tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=chemistry')
      await expect(page.locator('h1')).toHaveText('Kemi')
    })

    test('should show chemistry tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=chemistry')
      await expect(page.locator('h1')).toHaveText('Chemistry')
    })
  })

  test.describe('Maps tab', () => {
    test('should show maps tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=maps')
      await expect(page.locator('h1')).toHaveText('Kartat')
    })

    test('should show maps tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=maps')
      await expect(page.locator('h1')).toHaveText('Kartor')
    })

    test('should show maps tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=maps')
      await expect(page.locator('h1')).toHaveText('Maps')
    })
  })

  test.describe('Keyboard tab', () => {
    test('should show keyboard tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=keyboard')
      await expect(page.locator('h1')).toHaveText('Näppäimistö')
    })

    test('should show keyboard tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=keyboard')
      await expect(page.locator('h1')).toHaveText('Tangentbord')
    })

    test('should show keyboard tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=keyboard')
      await expect(page.locator('h1')).toHaveText('Keyboard')
    })
  })

  test.describe('Math tab', () => {
    test('should show math tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=math')
      await expect(page.locator('h1')).toHaveText('Matematiikka')
    })

    test('should show math tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=math')
      await expect(page.locator('h1')).toHaveText('Matematik')
    })

    test('should show math tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=math')
      await expect(page.locator('h1')).toHaveText('Mathematics')
    })
  })

  test.describe('Physics tab', () => {
    test('should show physics tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=physics')
      await expect(page.locator('h1')).toHaveText('Fysiikka')
    })

    test('should show physics tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=physics')
      await expect(page.locator('h1')).toHaveText('Fysik')
    })

    test('should show physics tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=physics')
      await expect(page.locator('h1')).toHaveText('Physics')
    })
  })

  test.describe('Programming tab', () => {
    test('should show programming tab in finnish', async ({ page }) => {
      await page.goto('/build/?lang=fi&tab=programming')
      await expect(page.locator('h1')).toHaveText('Ohjelmointi')
    })

    test('should show programming tab in swedish', async ({ page }) => {
      await page.goto('/build/?lang=sv&tab=programming')
      await expect(page.locator('h1')).toHaveText('Programmering')
    })

    test('should show programming tab in english', async ({ page }) => {
      await page.goto('/build/?lang=en&tab=programming')
      await expect(page.locator('h1')).toHaveText('Programming')
    })
  })

  test('Changing language', async ({ page }) => {
    const HEADINGS = {
      'fi': 'Yleisohjeet',
      'sv': 'Allmänna instruktioner',
      'en': 'General Instructions'
    }

    const languageCodes = Object.keys(HEADINGS) as Array<keyof typeof HEADINGS>;

    for (const initialLanguage of languageCodes) {
      for (const newLanguage of languageCodes) {
        const testCaseLegend = `${initialLanguage} -> ${newLanguage}`
        await page.goto(`/build/?lang=${initialLanguage}&tab=general`)
        await expect(page.locator('h1'), testCaseLegend).toHaveText(HEADINGS[initialLanguage])
        await page.click(`.tab-menu-language-selection a[data-lang-id=${newLanguage}]`)
        await expect(page.locator('h1'), testCaseLegend).toHaveText(HEADINGS[newLanguage])
      }
    }
  })
})
