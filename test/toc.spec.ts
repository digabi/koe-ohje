import { Page, expect } from '@playwright/test'
import { newPage, newBrowserContext } from './utils'

describe('Table-of-contents', () => {
  let page: Page

  beforeEach(async () => {
    page = await newPage(await newBrowserContext())
  })

  afterEach(async () => {
    await page.close()
  })

  describe('Missing heading IDs on Finnish tabs', () => {
    it('should have zero default toc-lib-generated ids on finnish tabs', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')

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
        await page.click('text=' + tab)

        // Make sure the toc library has processed all h2/h3 tags and there are no empty ids
        await expect(page.locator('h2:not([id])')).toHaveCount(0)
        await expect(page.locator('h3:not([id])')).toHaveCount(0)

        await expect(page.locator('h2[id^=_], h3[id^=_]')).toHaveCount(0)
      }
    })
  })

  describe('Missing heading IDs on Swedish tabs', () => {
    it('should have zero default toc-lib-generated ids on swedish tabs', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')

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
        // Dump progress so we know in which tab the error exists
        // sconsole.debug('Now processing tab ' + tab)
        await page.click('text=' + tab)

        // Make sure the toc library has processed all h2/h3 tags and there are no empty ids
        await expect(page.locator('h2:not([id])')).toHaveCount(0)
        await expect(page.locator('h3:not([id])')).toHaveCount(0)

        await expect(page.locator('h2[id^=_], h3[id^=_]')).toHaveCount(0)
      }
    })
  })

  describe('Finnish and Swedish tabs have equal list of ids', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
    })

    const getCurrentIdList = (): string[] => {
      const ids: string[] = []
      document.querySelectorAll('h2[id], h3[id]').forEach(function (e) {
        ids.push(e.getAttribute('id'))
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

    const getTabIdList = async (pTab: string, pLanguage: string, pPage: Page): Promise<string[]> => {
      await page.click('[data-lang-id="' + pLanguage + '"]')
      await page.click('[data-tab-id="' + pTab + '"]')

      await expect(pPage.locator('h1')).toHaveCount(1)

      return await pPage.evaluate(getCurrentIdList)
    }

    it('should have an equal/unique list of ids on chemistry tab', async () => {
      const idsFi = await getTabIdList('chemistry', 'fi', page)
      const idsSv = await getTabIdList('chemistry', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      // Show the duplicate ID
      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on general tab', async () => {
      const idsFi = await getTabIdList('general', 'fi', page)
      const idsSv = await getTabIdList('general', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on keyboard tab', async () => {
      const idsFi = await getTabIdList('keyboard', 'fi', page)
      const idsSv = await getTabIdList('keyboard', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on math tab', async () => {
      const idsFi = await getTabIdList('math', 'fi', page)
      const idsSv = await getTabIdList('math', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on physics tab', async () => {
      const idsFi = await getTabIdList('physics', 'fi', page)
      const idsSv = await getTabIdList('physics', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on programming tab', async () => {
      const idsFi = await getTabIdList('programming', 'fi', page)
      const idsSv = await getTabIdList('programming', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })
  })
})
