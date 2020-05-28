import './polyfills'
import { initializeCopyToClipboard } from './clipboard'
import { initializeGeographyTab } from './tabs/geography'
import { applyTablesorter } from './util/tablesorter'
import { initializeLanguage } from './util/language'

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
