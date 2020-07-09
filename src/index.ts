import './polyfills'
import { initializeCopyToClipboard } from './tabs/common/clipboard'
import { initializeGeographyTab } from './tabs/geography'
import { applyTablesorter } from './tabs/common/tablesorter'
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
window.legacyIntegration.applyTablesorter = applyTablesorter
window.legacyIntegration.initializeLanguage = initializeLanguage
window.legacyIntegration.initializeGeographyTab = initializeGeographyTab

$(document).ready(() => {
  initializeLanguage()
  initializeTabs()
  initializeTocEventListeners()
  initializeSearchEventListeners()
})
