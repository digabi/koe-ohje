describe('Python', () => {
  describe('Python Environment', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=programming]')
        el.click()
      })
    })

    it('should activate stdout window', async () => {
      await expect(page).toMatchElement('#code-output[style="display: block;"]', { timeout: 10000 })
      await expect(page).not.toMatchElement('#code-output[style="display: none;"]', { timeout: 10000 })
    })

    it('should have hidden stderr window', async () => {
      await expect(page).toMatchElement('#code-error[style="display: none;"]', { timeout: 10000 })
      await expect(page).not.toMatchElement('#code-error[style="display: block;"]', { timeout: 10000 })
    })

    it('should show ide', async () => {
      await expect(page).toMatchElement('#tab-programming-ide-container')
    })
  })

  describe('Python Code Execution', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=programming]')
        el.click()
      })

      // Wait for Pydiode
      await expect(page).toMatchElement('#code-output[style="display: block;"]', { timeout: 10000 })
    })

    it('should be able to calculate 1+3', async () => {
      // Insert code
      await page.evaluate(() => {
        const codeToInsert = 'print("Result=%d" % (1+3))'
        const el = document.querySelector<HTMLElement>('#tab-programming-ide-container')
        el.dispatchEvent(
          new CustomEvent('replaceEditorTextForTestingPurposes', { bubbles: false, detail: { text: codeToInsert } })
        )
      })

      // Click execute button
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.code-editor-execute')
        el.click()
      })

      // Output element should be active
      await expect(page).toMatchElement('#code-output[style="display: block;"]', { timeout: 10000 })

      // Check output
      const stdout = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('#code-output').innerHTML
      })
      expect(stdout).toBe('Result=4\n')

      // Check errors
      const stderr = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('#code-error').innerHTML
      })
      expect(stderr).toBe('')
    })

    it('should show an error', async () => {
      // Insert code
      await page.evaluate(() => {
        const codeToInsert = 'foobar'
        const el = document.querySelector<HTMLElement>('#tab-programming-ide-container')
        el.dispatchEvent(
          new CustomEvent('replaceEditorTextForTestingPurposes', { bubbles: false, detail: { text: codeToInsert } })
        )
      })

      // Click execute button
      await page.evaluate(() => {
        const el = document.querySelector<HTMLElement>('.code-editor-execute')
        el.click()
      })

      // Error element should be active
      await expect(page).toMatchElement('#code-error[style="display: block;"]', { timeout: 10000 })

      // Check output
      const stdout = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('#code-output').innerHTML
      })
      expect(stdout).toBe('')

      // Check errors
      const stderr = await page.evaluate(() => {
        return document.querySelector<HTMLElement>('#code-error').innerHTML
      })
      expect(stderr).toMatch(/PythonError: Traceback \(most recent call last\):/)
      expect(stderr).toMatch(/NameError: name 'foobar' is not defined/)
    })
  })
})
