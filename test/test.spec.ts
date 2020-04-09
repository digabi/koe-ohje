describe('Digabi Exam Help', () => {
  describe('Tabs', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080')
    })

    it('should render abitti as initial tab', async () => {
      await expect(page).toMatch('Yleisohjeet')
    })

    it('should be able to open spanish tabs', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#spanish-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-spanish h1')
    })

    it('should be able to open physics tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#physics-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-physics h1', { timeout: 5000 })
    })

    it('should be able to open chemistry tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#chemistry-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-chemistry h1', { timeout: 5000 })
    })

    it('should be able to open math tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#math-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-math h1', { timeout: 5000 })
    })

    it('should be able to open french tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#french-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-french h1')
    })

    it('should be able to open german tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#german-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-german h1')
    })

    it('should be able to open sami tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#sami-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-sami h1')
    })

    it('should be able to open geography tab', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#geography-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-geography h1')
    })
  })

  describe('Language', () => {
    it('should show page in swedish', async () => {
      await page.goto('http://localhost:8080?sv')

      await expect(page).toMatchElement('#tab-abitti h1.sv')
      await expect(page).not.toMatchElement('#tab-abitti h1.fi')
    })
  })
})
