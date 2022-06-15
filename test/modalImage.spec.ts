describe('ModalImages', () => {
  describe('ModalImages', () => {
    const TEST_IMAGE_ID = 'tab-gen-image-03'

    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=general]')
        el.click()
      })

      // Wait for tab to load
      await expect(page).toMatchElement('#' + TEST_IMAGE_ID, { timeout: 5000 })
    })

    it('should contain an inserted modal layer', async () => {
      await expect(page).toMatchElement('#modal-image-id-' + TEST_IMAGE_ID, { timeout: 5000 })
    })

    it('should have the modal layer hidden before the thumbnail image is clicked', async () => {
      await expect(page).toMatchElement('#modal-image-id-' + TEST_IMAGE_ID + '[style*="display: none;"]', {
        timeout: 10000,
      })
    })

    it('should make the modal layer visible when image is clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-gen-image-03') // Must equal TEST_IMAGE_ID
        el.click()
      })

      await expect(page).toMatchElement('#modal-image-id-' + TEST_IMAGE_ID + '[style*="display: block;"]', {
        timeout: 10000,
      })
    })

    it('should close the modal when close button is clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-gen-image-03') // Must equal TEST_IMAGE_ID
        el.click()
      })

      await page.waitForSelector('.modal-image-fullscreen[style*="display: block;"]')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.modal-image-close')
        el.click()
      })

      await expect(page).not.toMatchElement('.modal-image-fullscreen[style*="display: block;"]')
    })

    it('should close the modal when fullscreen image is clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-gen-image-03') // Must equal TEST_IMAGE_ID
        el.click()
      })

      await page.waitForSelector('.modal-image-fullscreen[style*="display: block;"]')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.modal-image-fullscreen-image')
        el.click()
      })

      await expect(page).not.toMatchElement('.modal-image-fullscreen[style*="display: block;"]')
    })

    it('should close the modal when modal background is clicked', async () => {
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-gen-image-03') // Must equal TEST_IMAGE_ID
        el.click()
      })

      await page.waitForSelector('.modal-image-fullscreen[style*="display: block;"]')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.modal-image-fullscreen')
        el.click()
      })

      await expect(page).not.toMatchElement('.modal-image-fullscreen[style*="display: block;"]')
    })
  })
})
