import { test, expect } from '@playwright/test'

test.describe('ModalImages', () => {
  test.describe('ModalImages', () => {
    const TEST_IMAGE_ID = 'tab-gen-image-03'

    test.beforeEach(async ({ page }) => await page.goto('/build?fi'))

    test('should have the modal layer hidden before the thumbnail image is clicked', async ({ page }) => {
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })

    test('should open and close (by clicking the close button) the modal layer', async ({ page }) => {
      await page.click(`#${TEST_IMAGE_ID}`)
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeVisible()

      await page.click('.modal-image-close')
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })

    test('should open and close (by clicking the modal image) the modal layer', async ({ page }) => {
      await page.click(`#${TEST_IMAGE_ID}`)
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeVisible()

      await page.click('.modal-image-fullscreen-image')
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })

    test('should open and close (by clicking the modal background) the modal layer', async ({ page }) => {
      await page.click(`#${TEST_IMAGE_ID}`)
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeVisible()

      await page.click('.modal-image-fullscreen')
      await expect(page.locator(`#modal-image-id-${TEST_IMAGE_ID}`)).toBeHidden()
    })
  })
})
