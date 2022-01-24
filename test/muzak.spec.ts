describe('Muzak', () => {
  describe('Muzak Player', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=muzak]')
        el.click()
      })

      // Wait for tab change
      await expect(page).toMatchElement('#tab-muzak h1', { timeout: 5000 })
    })

    it('should contain fontawesome play icon', async () => {
      await expect(page).toMatchElement('.svg-inline--fa.fa-play', { timeout: 5000 })

      const buttonHTML = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('[data-muzakid="tab-muzak-music1"]')
        return el.innerHTML
      })
      expect(buttonHTML).toContain('<!-- <i class="fas fa-play"></i> Font Awesome fontawesome.com -->')
    })

    it('should change play button to pause', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('[data-muzakid="tab-muzak-music1"]')
        el.click()
      })

      await expect(page).toMatchElement('.svg-inline--fa.fa-pause', { timeout: 5000 })

      const buttonHTML = await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('[data-muzakid="tab-muzak-music1"]')
        return el.innerHTML
      })
      expect(buttonHTML).toContain('<!-- <i class="fas fa-pause"></i> Font Awesome fontawesome.com -->')
    })
  })
})
