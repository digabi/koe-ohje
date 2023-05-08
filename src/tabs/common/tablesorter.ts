import { Keyboard } from 'puppeteer'
import './tablesorter.css'
import { screenReaderTalkPolite } from './screenreader'
import { getCurrentLanguage } from './language'

const resetSort = (table: HTMLElement) => {
  const headers = table.querySelectorAll<HTMLElement>('th[data-sortable]')
  headers.forEach(header => {
    header.dataset.sorted = 'asc'
    header.classList.remove('active')
    header.removeAttribute('aria-sort')
  })
}

const getCellValue = (row: HTMLElement, index: number): string =>
  (<HTMLElement>row.children[index]).innerText || row.children[index].textContent

const comparer = (index: number, asc: boolean) => (a: HTMLElement, b: HTMLElement): number => {
  const value1 = getCellValue(asc ? a : b, index)
  const value2 = getCellValue(asc ? b : a, index)

  return value1.localeCompare(value2, undefined, {
    numeric: true,
    sensitivity: 'base'
  })
}

const sort = (table: HTMLElement, header: HTMLTableCellElement) => {
  const tbody = table.querySelector('tbody')
  const columnIndex = header.cellIndex
  const sortAsc = header.dataset.sorted === 'asc'

  Array.from(tbody.children)
    .sort(comparer(columnIndex, sortAsc))
    .forEach(row => tbody.appendChild(row))
}

const handleHeaderClick = (target: HTMLTableCellElement) => {
  const table = target.closest('table')

  let newOrder = 'asc'
  let newOrderAriaSort = ''
  if (target.classList.contains('active')) {
    newOrder = target.dataset.sorted === 'asc' ? 'desc' : 'asc'
    newOrderAriaSort = target.dataset.sorted === 'asc' ? 'descending' : 'ascending'
  }

  resetSort(table)

  target.dataset.sorted = newOrder
  target.setAttribute('aria-sort', newOrderAriaSort)
  target.classList.add('active')

  sort(table, target)
}

const handleHeaderMouseClick = (event: MouseEvent) => {
  const target = event.target as HTMLTableCellElement
  handleHeaderClick(target)
}

const handleKeyboardEvents = (event: KeyboardEvent) => {
  if (event.code === 'Enter') {
    const target = event.target as HTMLTableCellElement

    if (target.tagName === 'TH' && target.hasAttribute('data-sortable')) {
      if (getCurrentLanguage() === 'fi') {
        screenReaderTalkPolite(`Järjestetään taulukko uudelleen sarakkeen ${target.innerText} mukaan`)
      }
      if (getCurrentLanguage() === 'sv') {
        screenReaderTalkPolite(`Tabellen arrangeras på nytt efter kolumn ${target.innerText}`)
      }
      handleHeaderClick(target)
    }
  }
}

export const initializeTablesorter = () => {
  const sortableTables = document.querySelectorAll<HTMLElement>('table.sortable')
  sortableTables.forEach(table => {
    const headers = table.querySelectorAll('th[data-sortable]')
    headers.forEach(header => {
      header.addEventListener('click', handleHeaderMouseClick)

      if (header.classList.contains('active')) {
        sort(table, header)
      }
    })
  })

  document.addEventListener('keydown', handleKeyboardEvents)
}
