const searchSelector = 'h1, h2, h3, h4, h5, h6, th, td, p, li'

const search = (searchTerm: string): HTMLElement[] => {
  if (!searchTerm) return []

  const contentElement = document.querySelector('.js-toc-content')
  const searchableContent = contentElement.querySelectorAll<HTMLElement>(searchSelector)

  const searchResults: HTMLElement[] = []

  searchableContent.forEach(element => {
    if (searchResults.length >= 20) return

    const elementText = element.innerText.toLowerCase()

    if (elementText.includes(searchTerm.toLowerCase())) {
      const result = document.createElement('li')
      result.classList.add('search-result-item')

      result.addEventListener('click', () => {
        const scrollTop = element.getBoundingClientRect().y + window.scrollY - 50
        window.scrollTo({ top: scrollTop, behavior: 'smooth' })
      })

      result.innerText = element.innerText

      if (element.tagName === 'h2' || element.tagName === 'h3') {
        result.innerText = ` \u2261 ${result.innerText}`
      }

      searchResults.push(result)
    }
  })

  return searchResults
}

const renderSearchResults = () => {
  const searchInput = <HTMLInputElement>document.getElementById('js-search-input')
  const results = search(searchInput.value)

  const resultContainer = document.getElementById('js-search-result')
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild)
  }

  results.forEach(element => {
    resultContainer.appendChild(element)
  })
}

export const clearSearch = () => {
  const searchInput = <HTMLInputElement>document.getElementById('js-search-input')
  searchInput.value = ''
  renderSearchResults()
}

// TODO: Debounce
export const initializeSearchEventListeners = () => {
  const searchInput = document.getElementById('js-search-input')
  searchInput.addEventListener('keyup', renderSearchResults)
  searchInput.addEventListener('search', renderSearchResults)
}
