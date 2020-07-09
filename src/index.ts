import './polyfills'
import { initializeCopyToClipboard } from './tabs/common/clipboard'
import { initializeGeographyTab } from './tabs/geography'
import { initializeLanguage } from './tabs/common/language'
import { initializeTabs } from './tabs/tabs'
import { initializeTocEventListeners } from './tabs/common/toc'
import { initializeSearchEventListeners } from './tabs/common/search'

declare global {
  interface Window {
    legacyIntegration: any
  }
}

window.legacyIntegration = {}
window.legacyIntegration.initializeCopyToClipboard = initializeCopyToClipboard
window.legacyIntegration.initializeLanguage = initializeLanguage
window.legacyIntegration.initializeGeographyTab = initializeGeographyTab

window.addEventListener('load', () => {
  initializeLanguage()
  initializeTabs()
  initializeTocEventListeners()
  initializeSearchEventListeners()
})
