describe('Digabi Exam Help', () => {
  describe('Tabs in Finnish', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
    })

    it('should render abitti as initial tab', async () => {
      await expect(page).toMatch('Yleisohjeet', { timeout: 5000 })
    })

    it('should be able to open physics tab when clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=physics]')
        el.click()
      })

      await expect(page).toMatchElement('#tab-physics h1', { timeout: 5000 })
    })

    it('should be able to open chemistry tab when clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=chemistry]')
        el.click()
      })

      await expect(page).toMatchElement('#tab-chemistry h1', { timeout: 5000 })
    })

    it('should be able to open math tab when clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=math]')
        el.click()
      })

      await expect(page).toMatchElement('#tab-math h1', { timeout: 5000 })
    })

    it('should be able to open maps tab when clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=maps]')
        el.click()
      })

      await expect(page).toMatchElement('#tab-maps h1', { timeout: 5000 })
    })

    it('should be able to open keyboard tab when clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=keyboard]')
        el.click()
      })

      await expect(page).toMatchElement('#tab-keyboard h1', { timeout: 5000 })
    })

    it('should be able to open programming tab when clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=programming]')
        el.click()
      })

      await expect(page).toMatchElement('#tab-programming h1', { timeout: 5000 })
    })
  })

  describe('Tabs in Swedish', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')
    })

    it('should show default page in swedish', async () => {
      await expect(page).toMatchElement('#tab-general h1.sv', { timeout: 5000 })
      await expect(page).not.toMatchElement('#tab-general h1.fi', { timeout: 5000 })
    })
  })
})
