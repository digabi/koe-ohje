import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

describe('Digabi Exam Help', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Tabs in Finnish', () => {
    it('should render finnish general as initial tab', async () => {
      await page.goto('http://localhost:8080/build/index.html')
      await expect(page.locator('h1')).toHaveText('Yleisohjeet')
    })

    it('should be able to open tabs when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

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

  describe('Tabs in Swedish', () => {
    it('should render general as initial tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')
      await expect(page.locator('h1')).toHaveText('Allmänna instruktioner')
    })

    it('should be able to open tabs when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')

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
