import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

const waitElementToAppearInViewport = async (page: Page, elementId: string, timeout: number): Promise<boolean> => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const endTime = timeout + Date.now()

  while (Date.now() < endTime) {
    const elTop = await page.evaluate((elementId) => {
      const el = document.querySelector(elementId)

      if (!el) {
        return -1
      }

      const rect = el.getBoundingClientRect()
      return rect.top
    }, elementId)

    if (elTop > 0 && elTop <= page.viewportSize().height) {
      return true
    }

    await delay(100)
  }

  return false
}

describe('Search', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Search finds relevant number of results', () => {
    it('from finnish and swedish pages', async () => {
      const testGrid = [
        {
          lang: 'fi',
          tabSelector: 'text=FYSIIKKA',
          searchTerm: 'kilogramma',
          expectedHits: 3,
        },
        {
          lang: 'sv',
          tabSelector: 'text=FYSIK',
          searchTerm: 'kilogram',
          expectedHits: 6,
        },
        {
          lang: 'fi',
          tabSelector: 'text=KEMIA',
          searchTerm: 'fosfori',
          expectedHits: 3,
        },
        {
          lang: 'sv',
          tabSelector: 'text=KEMI',
          searchTerm: 'foobaryeah',
          expectedHits: 0,
        },
        {
          lang: 'fi',
          tabSelector: 'text=MATEMATIIKKA',
          searchTerm: 'd(x)',
          expectedHits: 10,
        },
        {
          lang: 'sv',
          tabSelector: 'text=MATEMATIK',
          searchTerm: '\\mathrm',
          expectedHits: 10,
        },
      ]

      for (const testCase of testGrid) {
        await page.goto(`http://localhost:8080/build/index.html?${testCase.lang}`)
        await page.click(testCase.tabSelector)
        await page.type('#js-search-input', testCase.searchTerm)

        await expect(page.locator('.search-result-item')).toHaveCount(testCase.expectedHits)

        let ariaLabelPrefix: RegExp
        if (testCase.lang === 'fi') {
          ariaLabelPrefix = /^Hakutulos: /
        }
        if (testCase.lang === 'sv') {
          ariaLabelPrefix = /^Sökresult: /
        }

        const searchResults = await page.locator('.search-result-item').count()
        if (searchResults > 0) {
          await expect(page.locator('.search-result-item').first()).toHaveAttribute('aria-label', ariaLabelPrefix)
        }
      }
    })
  })

  describe('Navigation in search results', () => {
    it('moves page focus when clicking on the search result', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&math#')
      await page.type('#js-search-input', 'suorakulmio')

      await page.locator('.search-result-item').nth(1).click()

      const elementFound = await waitElementToAppearInViewport(page, '#toc-math-wlfe', 5000)

      expect(elementFound).toBeTruthy()
    })

    it('moves page gocus when navigating by keyboard among search results', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&math#')

      await page.focus('#js-search-input')
      await expect(page.locator('#js-search-input')).toBeFocused()

      await page.keyboard.type('suorakulmio', { delay: 500 })

      await page.keyboard.press('Tab', { delay: 500 })
      await page.keyboard.press('Tab', { delay: 500 })
      await page.keyboard.press('Enter', { delay: 500 })

      const elementFound = await waitElementToAppearInViewport(page, '#toc-math-wlfe', 5000)
      expect(elementFound).toBeTruthy()
    })
  })
})
