describe('Digabi Exam Help', () => {
  describe('Tabs', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080')
    })

    it('should render abitti as initial tab', async () => {
      await expect(page).toMatch('Yleisohjeet')
    })

    it('should be able to change tabs', async () => {
      await page.evaluate(() => {
        const el: HTMLElement = document.querySelector('#spanish-fi .tab-menu-option-long')
        el.click()
      })

      await expect(page).toMatchElement('#tab-spanish h1')
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
