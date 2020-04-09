import { initializeCopyToClipboard } from './clipboard'
import { initializeGeographyTab } from './tabs/geography'

declare global {
  interface Window {
    legacyIntegration: any
  }
}

window.legacyIntegration = {}
window.legacyIntegration.initializeCopyToClipboard = initializeCopyToClipboard
window.legacyIntegration.initializeGeographyTab = initializeGeographyTab
