import { Page } from 'puppeteer/index'

describe('Language', () => {
  describe('Initial language selection', () => {
    it('should highlight finnish in navbar', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
      await page.waitForNavigation()

      await expect(page).toMatchElement('.tab-menu-language-fi.active', { timeout: 5000 })
      await expect(page).not.toMatchElement('.tab-menu-language-sv.active', { timeout: 5000 })
    })

    it('should highlight swedish in navbar', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')
      await page.waitForNavigation()

      await expect(page).not.toMatchElement('.tab-menu-language-fi.active', { timeout: 5000 })
      await expect(page).toMatchElement('.tab-menu-language-sv.active', { timeout: 5000 })
    })
  })

  describe('Default tab', () => {
    const getHeadingText = async (pUrl: string, pPage: Page): Promise<string> => {
      await Promise.all([pPage.waitForNavigation(), pPage.goto(pUrl), pPage.waitForSelector('h1')])

      const text = await pPage.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })

      return text
    }

    it('should show general tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&general', page)
      expect(text).toBe('Yleisohjeet')
    })

    it('should show general tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&general', page)
      expect(text).toBe('Allmänna instruktioner')
    })

    it('should show chemistry tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&chemistry', page)
      expect(text).toBe('Kemia')
    })

    it('should show chemistry tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&chemistry', page)
      expect(text).toBe('Kemi')
    })

    it('should show maps tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&maps', page)
      expect(text).toBe('Kartat')
    })

    it('should show maps tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&maps', page)
      expect(text).toBe('Kartor')
    })

    it('should show keyboard tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&keyboard', page)
      expect(text).toBe('Erikoismerkit')
    })

    it('should show keyboard tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&keyboard', page)
      expect(text).toBe('Specialtecken')
    })

    it('should show math tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&math', page)
      expect(text).toBe('Matematiikka')
    })

    it('should show math tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&math', page)
      expect(text).toBe('Matematik')
    })

    it('should show physics tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&physics', page)
      expect(text).toBe('Fysiikka')
    })

    it('should show physics tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&physics', page)
      expect(text).toBe('Fysik')
    })

    it('should show programming tab in finnish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?fi&programming', page)
      expect(text).toBe('Ohjelmointi')
    })

    it('should show programming tab in swedish', async () => {
      const text = await getHeadingText('http://localhost:8080/build/index.html?sv&programming', page)
      expect(text).toBe('Programmering')
    })
  })

  describe('Changing language', () => {
    it('should change default page language from finnish to swedish when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&general')

      await page.waitForSelector('h1.fi')

      const textFi = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(textFi).toBe('Yleisohjeet')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.tab-menu-language-selection div[data-lang-id=sv]')
        el.click()
      })

      await page.waitForNavigation()

      await page.waitForSelector('h1.sv')

      const textSv = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(textSv).toBe('Allmänna instruktioner')
    })

    it('should change default page language from swedish to finnish when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&general')

      await page.waitForSelector('h1.sv')

      const textSv = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(textSv).toBe('Allmänna instruktioner')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.tab-menu-language-selection div[data-lang-id=fi]')
        el.click()
      })

      await page.waitForNavigation()

      await expect(page).toMatchElement('h1.fi', { timeout: 5000 })

      const textFi = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(textFi).toBe('Yleisohjeet')
    })
  })
})
