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

const setTocVisibilityAndPosition = () => {
  const jstoc = document.querySelector<HTMLElement>('.js-toc')
  const navigation = document.getElementById('tab-menu')
  jstoc.style.top = `${navigation.clientHeight}px`

  if (window.innerWidth > 1024) {
    jstoc.style.display = 'block'
    return
  }

  const searchInput = document.getElementById('js-search-input')
  if (document.activeElement === searchInput) {
    return
  }

  jstoc.style.display = 'none'
}

export const initializeTocEventListeners = () => {
  window.addEventListener('resize', setTocVisibilityAndPosition)
  setTocVisibilityAndPosition()

  // Toggle menu in mobile
  $('#menu').click(function() {
    $('.js-toc').toggle('fast')
  })

  // Jos mobilessa painaa sisältöä, piilotetaan menu
  $('.js-toc-content').click(function() {
    if (window.innerWidth < 1024) {
      const jstoc = document.querySelector<HTMLElement>('.js-toc')
      jstoc.style.display = 'none'
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
    fixedSidebarOffset: 'auto'
  })
}
