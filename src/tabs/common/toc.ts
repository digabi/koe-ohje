import * as tocbot from 'tocbot'

const generateId = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s\(\)]/g, '-')
}

const setHeaderIds = () => {
  const headers = document.querySelectorAll<HTMLElement>('.js-toc-content h2, .js-toc-content h3')
  headers.forEach(element => {
    element.setAttribute('id', generateId(element.innerText))
  })
}

export const initializeToc = () => {
  setHeaderIds()

  tocbot.init({
    tocSelector: '.js-toc-result',
    contentSelector: '.js-toc-content',
    headingSelector: 'h2, h3',
    collapseDepth: 6,
    positionFixedSelector: '.js-toc',
    fixedSidebarOffset: 'auto'
  })
}
