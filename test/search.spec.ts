import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

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
          expectedHits: 3
        },
        {
          lang: 'sv',
          tabSelector: 'text=FYSIK',
          searchTerm: 'kilogram',
          expectedHits: 6
        },
        {
          lang: 'fi',
          tabSelector: 'text=KEMIA',
          searchTerm: 'fosfori',
          expectedHits: 3
        },
        {
          lang: 'sv',
          tabSelector: 'text=KEMI',
          searchTerm: 'foobaryeah',
          expectedHits: 0
        },
        {
          lang: 'fi',
          tabSelector: 'text=MATEMATIIKKA',
          searchTerm: 'd(x)',
          expectedHits: 10
        },
        {
          lang: 'sv',
          tabSelector: 'text=MATEMATIK',
          searchTerm: '\\mathrm',
          expectedHits: 10
        }
      ]

      for (const testCase of testGrid) {
        await page.goto('http://localhost:8080/build/index.html?' + testCase.lang)
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
})