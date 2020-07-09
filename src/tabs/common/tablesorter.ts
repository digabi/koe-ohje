import './tablesorter.css'

const resetSort = (table: HTMLElement) => {
  const headers = table.querySelectorAll<HTMLElement>('th[data-sortable]')
  headers.forEach(header => {
    header.dataset.sorted = 'asc'
    header.classList.remove('active')
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

const sort = (table: HTMLElement, header: HTMLTableHeaderCellElement) => {
  const tbody = table.querySelector('tbody')
  const columnIndex = header.cellIndex
  const sortAsc = header.dataset.sorted === 'asc'

  Array.from(tbody.children)
    .sort(comparer(columnIndex, sortAsc))
    .forEach(row => tbody.appendChild(row))
}

const handleHeaderClick = (event: MouseEvent) => {
  const target = <HTMLTableHeaderCellElement>event.target
  const table = target.closest('table')

  let newOrder = 'asc'
  if (target.classList.contains('active')) {
    newOrder = target.dataset.sorted === 'asc' ? 'desc' : 'asc'
  }

  resetSort(table)

  target.dataset.sorted = newOrder
  target.classList.add('active')

  sort(table, target)
}

export const initializeTablesorter = () => {
  const sortableTables = document.querySelectorAll<HTMLElement>('table.sortable')
  sortableTables.forEach(table => {
    const headers = table.querySelectorAll<HTMLTableHeaderCellElement>('th[data-sortable]')
    headers.forEach(header => {
      header.addEventListener('click', handleHeaderClick)

      if (header.classList.contains('active')) {
        sort(table, header)
      }
    })
  })
}
