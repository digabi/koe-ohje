import Fuse from 'fuse.js'
import { debounce } from '../../util/debounce'

declare global {
  interface Window {
    MathJax: any
  }
}

interface SearchRecord {
  text: string
  elementRef: HTMLElement
}

const fuseOptions: Fuse.IFuseOptions<SearchRecord> = {
  keys: ['text'],
  threshold: 0.4
}

let fuse: Fuse<SearchRecord, Fuse.IFuseOptions<SearchRecord>>

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

const createSearchItem = (searchRecrod: SearchRecord): HTMLElement => {
  const result = document.createElement('li')
  result.classList.add('search-result-item')

  result.addEventListener('click', () => {
    const scrollTop = searchRecrod.elementRef.getBoundingClientRect().y + window.scrollY - 50
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  })

  result.innerText = searchRecrod.text

  if (searchRecrod.elementRef.tagName === 'H2' || searchRecrod.elementRef.tagName === 'H3') {
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

  if (!fuse) return

  const results = fuse.search(searchInput.value)

  results.slice(0, 10).forEach(resultItem => {
    resultContainer.appendChild(createSearchItem(resultItem.item))
  })

  window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, 'js-search-result'])
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
