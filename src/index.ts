import './polyfills'
import { initializeCopyToClipboard } from './clipboard'
import { initializeGeographyTab } from './tabs/geography'
import { applyTablesorter } from './util/tablesorter'
import { initializeLanguage } from './util/language'
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
