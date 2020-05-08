import { initializeCopyToClipboard } from './clipboard'
import { initializeGeographyTab } from './tabs/geography'
import { applyTablesorter } from './util/tablesorter'

declare global {
  interface Window {
    legacyIntegration: any
  }
}

window.legacyIntegration = {}
window.legacyIntegration.initializeCopyToClipboard = initializeCopyToClipboard
window.legacyIntegration.applyTablesorter = applyTablesorter
window.legacyIntegration.initializeGeographyTab = initializeGeographyTab
