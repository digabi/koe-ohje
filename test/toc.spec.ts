import { Page } from 'puppeteer'

describe('Table-of-contents', () => {
  const changeTab = (tab: string) => {
    const el = document.querySelector<HTMLElement>('#tab-menu div[data-tab-id=' + tab + ']')
    el.click()
  }

  const changeLanguage = (language: string) => {
    const el = document.querySelector<HTMLElement>('#tab-menu div[data-lang-id=' + language + ']')
    el.click()
  }

  describe('Missing heading IDs on Finnish tabs', () => {
    it('should have zero default ids on finnish tabs', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi')
      await page.waitForSelector('h1')

      await page.evaluate(changeTab, 'chemistry')
      await page.waitForSelector('#tab-chemistry h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'general')
      await page.waitForSelector('#tab-general h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'keyboard')
      await page.waitForSelector('#tab-keyboard h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'math')
      await page.waitForSelector('#tab-math h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'maps')
      await page.waitForSelector('#tab-maps h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'muzak')
      await page.waitForSelector('#tab-muzak h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'programming')
      await page.waitForSelector('#tab-programming h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })
  })

  describe('Missing heading IDs on Swedish tabs', () => {
    it('should have zero default ids on swedish tabs', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv')
      await page.waitForSelector('h1')

      await page.evaluate(changeTab, 'chemistry')
      await page.waitForSelector('#tab-chemistry h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'general')
      await page.waitForSelector('#tab-general h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'keyboard')
      await page.waitForSelector('#tab-keyboard h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'math')
      await page.waitForSelector('#tab-math h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'maps')
      await page.waitForSelector('#tab-maps h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'muzak')
      await page.waitForSelector('#tab-muzak h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'physics')
      await page.waitForSelector('#tab-physics h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef

      await page.evaluate(changeTab, 'programming')
      await page.waitForSelector('#tab-programming h1')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })
  })

  describe('Finnish and Swedish tabs have equal list of ids', () => {
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

    const getTabIdList = async (pTab: string, pIdPrefix: string, pLanguage: string, pPage: Page): Promise<string[]> => {
      await pPage.evaluate(changeLanguage, pLanguage)
      await pPage.waitForNavigation()
      await expect(pPage).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await pPage.evaluate(changeTab, pTab)
      await expect(pPage).toMatchElement('[id^=' + pIdPrefix + ']', { timeout: 5000 })
      return await pPage.evaluate(getCurrentIdList)
    }

    it('should have an equal/unique list of ids on chemistry tab', async () => {
      const idsFi = await getTabIdList('chemistry', 'toc-chem-', 'fi', page)
      const idsSv = await getTabIdList('chemistry', 'toc-chem-', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on general tab', async () => {
      const idsFi = await getTabIdList('general', 'toc-gen-', 'fi', page)
      const idsSv = await getTabIdList('general', 'toc-gen-', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on keyboard tab', async () => {
      const idsFi = await getTabIdList('keyboard', 'toc-kbd-', 'fi', page)
      const idsSv = await getTabIdList('keyboard', 'toc-kbd-', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on math tab', async () => {
      const idsFi = await getTabIdList('math', 'toc-math-', 'fi', page)
      const idsSv = await getTabIdList('math', 'toc-math-', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on physics tab', async () => {
      const idsFi = await getTabIdList('physics', 'toc-phy-', 'fi', page)
      const idsSv = await getTabIdList('physics', 'toc-phy-', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on programming tab', async () => {
      const idsFi = await getTabIdList('programming', 'toc-prog-', 'fi', page)
      const idsSv = await getTabIdList('programming', 'toc-prog-', 'sv', page)

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })
  })
})
