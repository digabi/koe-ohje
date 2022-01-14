describe('Table-of-contents', () => {
  describe('Missing heading IDs on Finnish tabs', () => {
    it('should have zero default ids on finnish chemistry tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&chemistry')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish general tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&general')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish geography tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&geography')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish keyboard tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&keyboard')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish math tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&math')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish muzak tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&muzak')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish physics tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&physics')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on finnish programming tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?fi&programming')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })
  })

  describe('Missing heading IDs on Swedish tabs', () => {
    it('should have zero default ids on swedish chemistry tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&chemistry')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish general tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&general')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish geography tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&geography')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish keyboard tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&keyboard')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish math tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&math')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish muzak tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&muzak')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish physics tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&physics')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })

    it('should have zero default ids on swedish programming tab', async () => {
      await page.goto('http://localhost:8080/build/index.html?sv&programming')

      await expect(page).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load
      await expect(page).not.toMatchElement('h2[id^=_], h3[id^=_]', { timeout: 5000 }) // Beef
    })
  })

  describe('Finnish and Swedish tabs have equal list of ids', () => {
    const getIdList = async (tab: string, language: string): Promise<string[]> => {
      const pageNew = await browser.newPage()
      await pageNew.goto('http://localhost:8080/build/index.html?' + language + '&' + tab)
      await expect(pageNew).toMatchElement('h1', { timeout: 5000 }) // Wait for tab to load

      const idList = await pageNew.evaluate(() => {
        const ids: string[] = []
        document.querySelectorAll('h2[id], h3[id]').forEach(function (e) {
          ids.push(e.getAttribute('id'))
        })
        return ids
      })

      return idList
    }

    const ifDuplicateEntry = (list: string[]): string[] => {
      const s = new Set(list)
      if (list.length !== s.size) {
        list.sort()
        return list
      }

      return []
    }

    it('should have an equal/unique list of ids on chemistry tab', async () => {
      const idsFi = await getIdList('chemistry', 'fi')
      const idsSv = await getIdList('chemistry', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on general tab', async () => {
      const idsFi = await getIdList('general', 'fi')
      const idsSv = await getIdList('general', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on geography tab', async () => {
      const idsFi = await getIdList('geography', 'fi')
      const idsSv = await getIdList('geography', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on keyboard tab', async () => {
      const idsFi = await getIdList('keyboard', 'fi')
      const idsSv = await getIdList('keyboard', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on math tab', async () => {
      const idsFi = await getIdList('math', 'fi')
      const idsSv = await getIdList('math', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on muzak tab', async () => {
      const idsFi = await getIdList('muzak', 'fi')
      const idsSv = await getIdList('muzak', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on physics tab', async () => {
      const idsFi = await getIdList('physics', 'fi')
      const idsSv = await getIdList('physics', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })

    it('should have an equal/unique list of ids on programming tab', async () => {
      const idsFi = await getIdList('programming', 'fi')
      const idsSv = await getIdList('programming', 'sv')

      expect(idsSv).toEqual(idsFi)

      expect(ifDuplicateEntry(idsFi)).toEqual([])
      expect(ifDuplicateEntry(idsSv)).toEqual([])
    })
  })
})
