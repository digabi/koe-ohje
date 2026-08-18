import { Page, test, expect } from '@playwright/test'

test.describe('Table-of-contents', () => {
  test.describe('Missing heading IDs on Finnish tabs', () => {
    test('should have zero default toc-lib-generated ids on finnish tabs', async ({ page }) => {
      await page.goto('/build/?lang=fi')

      const TABS = [
        'FYSIIKKA',
        'KARTAT',
        'KEMIA',
        'MATEMATIIKKA',
        'MUSIIKKI',
        'NÄPPÄIMISTÖ',
        'OHJELMOINTI',
        'YLEISOHJEET',
      ]

      for (const tab of TABS) {
        // Dump progress so we know in which tab the error exists
        // console.debug('Now processing tab ' + tab)
        await page.click(`text=${tab}`)

        // Make sure the toc library has processed all h2/h3 tags and there are no empty ids
        await expect(page.locator('h2:not([id])')).toHaveCount(0)
        await expect(page.locator('h3:not([id])')).toHaveCount(0)

        await expect(page.locator('h2[id^=_], h3[id^=_]')).toHaveCount(0)
      }
    })
  })

  test.describe('Missing heading IDs on Swedish tabs', () => {
    test('should have zero default toc-lib-generated ids on swedish tabs', async ({ page }) => {
      await page.goto('/build/?lang=sv')

      const TABS = [
        'FYSIK',
        'KARTOR',
        'KEMI',
        'MATEMATIK',
        'MUSIK',
        'PROGRAMMERING',
        'TANGENTBORD',
        'ALLMÄNNA INSTRUKTIONER',
      ]

      for (const tab of TABS) {
        await page.click(`text=${tab}`)

        // Make sure the toc library has processed all h2/h3 tags and there are no empty ids
        await expect(page.locator('h2:not([id])')).toHaveCount(0)
        await expect(page.locator('h3:not([id])')).toHaveCount(0)

        await expect(page.locator('h2[id^=_], h3[id^=_]')).toHaveCount(0)
      }
    })
  })

  test.describe('Missing heading IDs on English tabs', () => {
    test('should have zero default toc-lib-generated ids on english tabs', async ({ page }) => {
      await page.goto('/build/?lang=en')

      const TABS = [
        'PHYSICS',
        'MAPS',
        'CHEMISTRY',
        'MATHEMATICS',
        'MUSIC',
        'PROGRAMMING',
        'KEYBOARD',
        'GENERAL INSTRUCTIONS',
      ]

      for (const tab of TABS) {
        await page.click(`text=${tab}`)

        // Make sure the toc library has processed all h2/h3 tags and there are no empty ids
        await expect(page.locator('h2:not([id])')).toHaveCount(0)
        await expect(page.locator('h3:not([id])')).toHaveCount(0)

        await expect(page.locator('h2[id^=_], h3[id^=_]')).toHaveCount(0)
      }
    })
  })

  test.describe('All language tabs have equal list of ids', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/build/?fi')
    })

    const getCurrentIdList = (): string[] => {
      const ids: string[] = []
      document.querySelectorAll('h2[id], h3[id]').forEach((e) => {
        const id = e.getAttribute('id')
        if (id !== null) {
          ids.push(id)
        }
      })
      return ids
    }

    const ifDuplicateEntry = (list: string[]): string[] => {
      const s = new Set(list)
      if (list.length !== s.size) {
        list.sort()
        return list
      }

      return []
    }

    const getTabIdList = async (page: Page, tab: string, language: string): Promise<string[]> => {
      await page.click(`[data-lang-id="${language}"]`)
      await page.click(`[data-tab-id="${tab}"]`)

      await expect(page.locator(`#tab-${tab}`)).toBeVisible()

      await expect(page.locator('h1')).toHaveCount(1)

      return await page.evaluate(getCurrentIdList)
    }

    test('should have an equal/unique list of ids on chemistry tab', async ({ page }) => {
      const idsFi = await getTabIdList(page, 'chemistry', 'fi')
      const idsSv = await getTabIdList(page, 'chemistry', 'sv')
      const idsEn = await getTabIdList(page, 'chemistry', 'en')

      expect(idsSv).toEqual(idsFi)
      expect(idsEn).toEqual(idsFi)

      // Show the duplicate ID
      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
      expect(ifDuplicateEntry(idsEn)).toEqual([])
    })

    test('should have an equal/unique list of ids on general tab', async ({ page }) => {
      const idsFi = await getTabIdList(page, 'general', 'fi')
      const idsSv = await getTabIdList(page, 'general', 'sv')
      const idsEn = await getTabIdList(page, 'general', 'en')

      expect(idsSv).toEqual(idsFi)
      expect(idsEn).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
      expect(ifDuplicateEntry(idsEn)).toEqual([])
    })

    test('should have an equal/unique list of ids on keyboard tab', async ({ page }) => {
      const idsFi = await getTabIdList(page, 'keyboard', 'fi')
      const idsSv = await getTabIdList(page, 'keyboard', 'sv')
      const idsEn = await getTabIdList(page, 'keyboard', 'en')

      expect(idsSv).toEqual(idsFi)
      expect(idsEn).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
      expect(ifDuplicateEntry(idsEn)).toEqual([])
    })

    test('should have an equal/unique list of ids on math tab', async ({ page }) => {
      const idsFi = await getTabIdList(page, 'math', 'fi')
      const idsSv = await getTabIdList(page, 'math', 'sv')
      const idsEn = await getTabIdList(page, 'math', 'en')

      expect(idsSv).toEqual(idsFi)
      expect(idsEn).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
      expect(ifDuplicateEntry(idsEn)).toEqual([])
    })

    test('should have an equal/unique list of ids on physics tab', async ({ page }) => {
      const idsFi = await getTabIdList(page, 'physics', 'fi')
      const idsSv = await getTabIdList(page, 'physics', 'sv')
      const idsEn = await getTabIdList(page, 'physics', 'en')

      expect(idsSv).toEqual(idsFi)
      expect(idsEn).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
      expect(ifDuplicateEntry(idsEn)).toEqual([])
    })

    test('should have an equal/unique list of ids on programming tab', async ({ page }) => {
      const idsFi = await getTabIdList(page, 'programming', 'fi')
      const idsSv = await getTabIdList(page, 'programming', 'sv')
      const idsEn = await getTabIdList(page, 'programming', 'en')

      expect(idsSv).toEqual(idsFi)
      expect(idsEn).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
      expect(ifDuplicateEntry(idsEn)).toEqual([])
    })
  })
})
