describe('Language', () => {
  describe('Initial language selection', () => {
    it('should highlight finnish in navbar', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

      await expect(page).toMatchElement('.tab-menu-language-fi.active', { timeout: 5000 })
      await expect(page).not.toMatchElement('.tab-menu-language-sv.active', { timeout: 5000 })
    })

    it('should highlight swedish in navbar', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')

      await expect(page).not.toMatchElement('.tab-menu-language-fi.active', { timeout: 5000 })
      await expect(page).toMatchElement('.tab-menu-language-sv.active', { timeout: 5000 })
    })
  })

  describe('Default tab', () => {
    it('should show general tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&general')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Yleisohjeet')
    })

    it('should show general tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&general')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Allmänna instruktioner')
    })

    it('should show chemistry tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&chemistry')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Kemia')
    })

    it('should show chemistry tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&chemistry')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Kemi')
    })

    it('should show geography tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&geography')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Maantiede')
    })

    it('should show geography tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&geography')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Geografi')
    })

    it('should show keyboard tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&keyboard')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Erikoismerkit')
    })

    it('should show keyboard tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&keyboard')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Specialtecken')
    })

    it('should show math tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&math')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Matematiikka')
    })

    it('should show math tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&math')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Matematik')
    })

    it('should show physics tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&physics')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Fysiikka')
    })

    it('should show physics tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&physics')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Fysik')
    })

    it('should show programming tab in finnish', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&programming')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Ohjelmointi')
    })

    it('should show programming tab in swedish', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&programming')

      await expect(page).toMatchElement('h1', { timeout: 5000 })

      const text = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(text).toBe('Programmering')
    })
  })

  describe('Changing language', () => {
    it('should change default page language from finnish to swedish when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&general')

      await expect(page).toMatchElement('h1.fi', { timeout: 5000 })

      const textFi = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(textFi).toBe('Yleisohjeet')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.tab-menu-language-selection div[data-lang-id=sv]')
        el.click()
      })

      await page.waitForNavigation()

      await expect(page).toMatchElement('h1.sv', { timeout: 5000 })

      const textSv = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('h1').innerText
      })
      expect(textSv).toBe('Allmänna instruktioner')
    })

    it('should change default page language from swedish to finnish when clicked', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&general')

      await expect(page).toMatchElement('h1.sv', { timeout: 5000 })

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
