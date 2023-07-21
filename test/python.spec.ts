import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

describe('Python', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Python Environment', () => {
    it('should have certain elements visible and hidden', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
      await page.click('text=OHJELMOINTI')

      await expect(page.locator('#code-output')).toBeVisible()
      await expect(page.locator('#code-error')).toBeHidden()
      await expect(page.locator('#tab-programming-ide-container')).toBeVisible()
    })
  })

  describe('Python Code Execution', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
      await page.click('text=OHJELMOINTI')

      // Make sure the page rendering is finished
      await expect(page.locator('h1')).toHaveText('Ohjelmointi')
      // Make sure the Pyodiode has been initialised before executing Python
      await expect(page.locator('#code-output')).toBeVisible()
    })

    it('should be able to calculate 1+3', async () => {
      // We need to use a custom event as page.fill() cannot be used with Monaco editor
      // page.dispatchEvent() does not dispatch custom events

      await page.evaluate(() => {
        const codeToInsert = 'print("Result=%d" % (1+3))'
        const el = document.querySelector<HTMLElement>('#tab-programming-ide-container')
        el.dispatchEvent(
          new CustomEvent('replaceEditorTextForTestingPurposes', { bubbles: false, detail: { text: codeToInsert } }),
        )
      })

      await page.click('.code-editor-execute')

      // Timeout is needed as it takes time to run Pyodide
      await expect(page.locator('#code-output')).toBeVisible({ timeout: 20000 })
      await expect(page.locator('#code-output')).toContainText(/Result=4/)

      await expect(page.locator('#code-error')).toBeEmpty()
    })

    it('should be able to do things with numpy library', async () => {
      await page.evaluate(() => {
        console.log('Hello world!')
      })

      await page.evaluate(() => {
        const codeToInsert = `import numpy
m = numpy.lcm(6,9)
print(m)`
        const el = document.querySelector<HTMLElement>('#tab-programming-ide-container')
        el.dispatchEvent(
          new CustomEvent('replaceEditorTextForTestingPurposes', { bubbles: false, detail: { text: codeToInsert } }),
        )
      })

      await page.click('.code-editor-execute')

      // Timeout is needed as it takes time to run Pyodide
      await expect(page.locator('#code-output')).toBeVisible({ timeout: 20000 })
      await expect(page.locator('#code-output')).toContainText('18')

      await expect(page.locator('#code-error')).toBeEmpty()
    })

    it('should show an error', async () => {
      // We need to use a custom event as page.fill() cannot be used with Monaco editor

      await page.evaluate(() => {
        const codeToInsert = 'print("This is valid Python")\nfoobar'
        const el = document.querySelector<HTMLElement>('#tab-programming-ide-container')
        el.dispatchEvent(
          new CustomEvent('replaceEditorTextForTestingPurposes', { bubbles: false, detail: { text: codeToInsert } }),
        )
      })

      await page.click('.code-editor-execute')

      // Timeout is needed as it takes time to run Pyodide
      await expect(page.locator('#code-error')).toBeVisible({ timeout: 20000 })
      await expect(page.locator('#code-error')).toContainText(/NameError: name 'foobar' is not defined/)

      await expect(page.locator('#code-output')).toBeHidden()
      await expect(page.locator('#code-output')).toContainText(/This is valid Python/)
    })
  })
})
