import Fuse from 'fuse.js'
import { debounce } from '../../util/debounce'

import { getCurrentLanguage } from './language'

interface SearchRecord {
  text: string
  elementRef: HTMLElement
}

const fuseOptions: Fuse.IFuseOptions<SearchRecord> = {
  keys: ['text'],
  threshold: 0.4,
  ignoreLocation: true
}

let fuse: Fuse<SearchRecord>

export const createSearchIndex = () => {
  const contentElement = document.querySelector('.js-toc-content')
  const searchSelector = 'h1, h2, h3, h4, h5, h6, th, td, p, li'
  const searchableContent = contentElement.querySelectorAll<HTMLElement>(searchSelector)

  const searchIndex: SearchRecord[] = []

  searchableContent.forEach(element => {
    const record: SearchRecord = { text: '', elementRef: element }

    const elementClone = <HTMLElement>element.cloneNode(true)
    const equations = elementClone.querySelectorAll('.mjpage')
    equations.forEach(equation => {
      equation.innerHTML = `\\(${equation.textContent.trim()}\\)`
    })

    record.text = elementClone.innerText

    searchIndex.push(record)
  })

  fuse = new Fuse(searchIndex, fuseOptions)
}

const getSearchItemAriaLabelPrefix = (): string => {
  if (getCurrentLanguage() == 'fi') {
    return 'Hakutulos: '
  }
  if (getCurrentLanguage() == 'sv') {
    return 'Sökresult: '
  }

  return ''
}

const createSearchItem = (searchRecord: SearchRecord): HTMLElement => {
  const result = document.createElement('a')
  result.setAttribute('href', '#')
  result.setAttribute('aria-label', getSearchItemAriaLabelPrefix() + searchRecord.text)
  result.classList.add('search-result-item')
  const isTitle = searchRecord.elementRef.tagName === 'H2' || searchRecord.elementRef.tagName === 'H3'

  result.addEventListener('click', (event: Event) => {
    event.preventDefault()

    let scrollTop = searchRecord.elementRef.getBoundingClientRect().y + window.scrollY

    // Top navigation offset in headers is already done with css
    if (!isTitle) {
      scrollTop = scrollTop - 50
    }

    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  })

  result.innerHTML = searchRecord.elementRef.innerHTML

  if (isTitle) {
    result.innerText = ` \u2261 ${result.innerText}`
  }

  return result
}

const renderSearchResults = () => {
  const searchInput = <HTMLInputElement>document.getElementById('js-search-input')
  const resultContainer = document.getElementById('js-search-result')
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild)
  }

  const results = fuse?.search(searchInput.value) ?? []

  results.slice(0, 10).forEach(resultItem => {
    resultContainer.appendChild(createSearchItem(resultItem.item))
  })

  const resultHeading = document.getElementById('js-search-result-heading')
  if (results.length === 0) {
    resultHeading.style.display = 'none'
  } else {
    resultHeading.style.display = 'block'
  }
}

export const clearSearch = () => {
  const searchInput = <HTMLInputElement>document.getElementById('js-search-input')
  searchInput.value = ''
  renderSearchResults()
}

export const initializeSearchEventListeners = () => {
  const searchInput = document.getElementById('js-search-input')
  searchInput.addEventListener('keyup', debounce(renderSearchResults, 250))
  searchInput.addEventListener('search', renderSearchResults)
}
