import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

describe('ModalImages', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('ModalImages', () => {
    const TEST_IMAGE_ID = 'tab-gen-image-03'

    beforeEach(async () => await page.goto('http://localhost:8080/build/index.html?fi'))

    it('should have the modal layer hidden before the thumbnail image is clicked', async () => {
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })

    it('should open and close (by clicking the close button) the modal layer', async () => {
      await page.click(`#${TEST_IMAGE_ID}`)
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeVisible()

      await page.click('.modal-image-close')
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })

    it('should open and close (by clicking the modal image) the modal layer', async () => {
      await page.click(`#${TEST_IMAGE_ID}`)
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeVisible()

      await page.click('.modal-image-fullscreen-image')
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })

    it('should open and close (by clicking the modal background) the modal layer', async () => {
      await page.click(`#${TEST_IMAGE_ID}`)
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeVisible()

      await page.click('.modal-image-fullscreen')
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })
  })
})
