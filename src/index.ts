import { initializeCopyToClipboard } from './clipboard'

declare global {
  interface Window {
    legacyIntegration: any
  }
}

window.legacyIntegration = {}
window.legacyIntegration.initializeCopyToClipboard = initializeCopyToClipboard
