import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

describe('Language', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Initial language selection', () => {
    it('should highlight finnish in navbar', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

      await expect(page.locator('.tab-menu-language-fi.active')).toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).not.toBeVisible()
    })

    it('should highlight swedish in navbar', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')

      await expect(page.locator('.tab-menu-language-fi.active')).not.toBeVisible()
      await expect(page.locator('.tab-menu-language-sv.active')).toBeVisible()
    })
  })

  describe('Default tab', () => {
    it('should show general tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&general')
      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })

    it('should show general tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&general')
      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })

    it('should show chemistry tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&chemistry')
      await expect(page.locator('h1')).toHaveText('Kemia')
    })

    it('should show chemistry tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&chemistry')
      await expect(page.locator('h1')).toHaveText('Kemi')
    })

    it('should show maps tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&maps')
      await expect(page.locator('h1')).toHaveText('Kartat')
    })

    it('should show maps tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&maps')
      await expect(page.locator('h1')).toHaveText('Kartor')
    })

    it('should show keyboard tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&keyboard')
      await expect(page.locator('h1')).toHaveText('Näppäimistö')
    })

    it('should show keyboard tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&keyboard')
      await expect(page.locator('h1')).toHaveText('Tangentbord')
    })

    it('should show math tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&math')
      await expect(page.locator('h1')).toHaveText('Matematiikka')
    })

    it('should show math tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&math')
      await expect(page.locator('h1')).toHaveText('Matematik')
    })

    it('should show physics tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&physics')
      await expect(page.locator('h1')).toHaveText('Fysiikka')
    })

    it('should show physics tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&physics')
      await expect(page.locator('h1')).toHaveText('Fysik')
    })

    it('should show programming tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&programming')
      await expect(page.locator('h1')).toHaveText('Ohjelmointi')
    })

    it('should show programming tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&programming')
      await expect(page.locator('h1')).toHaveText('Programmering')
    })
  })

  describe('Changing language', () => {
    it('should change default page language from finnish to swedish when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&general')

      await expect(page.locator('h1')).toHaveText('Yleisohjeet')

      await page.click('.tab-menu-language-selection div[data-lang-id=sv]')

      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })

    it('should change default page language from swedish to finnish when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&general')

      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')

      await page.click('.tab-menu-language-selection div[data-lang-id=fi]')

      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })
  })
})
