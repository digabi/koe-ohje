import './polyfills'
import { initializeLanguage } from './tabs/common/language'
import { initializeTabs } from './tabs/tabs'
import { initializeTocEventListeners } from './tabs/common/toc'
import { initializeSearchEventListeners } from './tabs/common/search'

if (process.env.WATCH) {
  new EventSource('/esbuild').addEventListener('change', () => location.reload())
}

window.addEventListener('load', () => {
  initializeLanguage()
  initializeTabs()
  initializeTocEventListeners()
  initializeSearchEventListeners()
})

window.addEventListener('wheel', () => {
  try {
    if (window.location.hash !== '') {
      window.location.hash = ''
    }
  } catch (e) {
    // Ignore security errors when clearing hash
  }
})
