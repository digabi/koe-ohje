import * as tocbot from 'tocbot'

const generateId = (text: string) => {
  return "_" + text
    .trim()
    .toLowerCase()
    .replace(/[\s\(\)]/g, '-')
    .replace(/ä/g, 'ae')
    .replace(/Ä/g, 'AE')
    .replace(/å/g, 'ao')
    .replace(/Å/g, 'AO')
    .replace(/ö/g, 'oe')
    .replace(/Ö/g, 'OE')
}

const setHeaderIds = () => {
  const headers = document.querySelectorAll<HTMLElement>('.js-toc-content h2, .js-toc-content h3')
  headers.forEach(element => {
    if (element.getAttribute('id') == null) {
      element.setAttribute('id', generateId(element.innerText))
    }
  })
}

const showTocMenu = () => {
  const jstoc = document.querySelector<HTMLElement>('.js-toc')
  jstoc.classList.remove('hidden')
}

const hideTocMenu = () => {
  const jstoc = document.querySelector<HTMLElement>('.js-toc')
  jstoc.classList.add('hidden')
}

let isMobileToc = false
const setTocVisibilityAndPosition = () => {
  const jstoc = document.querySelector<HTMLElement>('.js-toc')
  const navigation = document.getElementById('tab-menu')
  jstoc.style.top = `${navigation.clientHeight}px`

  if (window.innerWidth > 1024) {
    showTocMenu()
    isMobileToc = false
    return
  }

  isMobileToc = true

  const searchInput = document.getElementById('js-search-input')
  if (document.activeElement === searchInput) {
    return
  }

  hideTocMenu()
}

export const initializeTocEventListeners = () => {
  window.addEventListener('resize', setTocVisibilityAndPosition)
  setTocVisibilityAndPosition()

  const menu = document.getElementById('menu')
  const jstoc = document.querySelector<HTMLElement>('.js-toc')
  const jstocContent = document.querySelector<HTMLElement>('.js-toc-content')

  menu.addEventListener('click', () => {
    if (jstoc.classList.contains('hidden')) {
      showTocMenu()
    } else {
      hideTocMenu()
    }
  })

  jstocContent.addEventListener('click', () => {
    if (isMobileToc) {
      hideTocMenu()
    }
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
    fixedSidebarOffset: 'auto',
    orderedList: false,
    onClick: () => {
      if (isMobileToc) {
        hideTocMenu()
      }
    }
  })
}
