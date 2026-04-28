import { initializeLanguage } from './language'
import { loadHtml } from '../util/loadHtml'

export const initializeKeyboardTab = async (): Promise<void> => {
    const contentElement = document.getElementById(`content-instructions-keyboard`)
    if (contentElement) {
      contentElement.innerHTML = ''
      contentElement.className = ''
      const html = await loadHtml(`tab-keyboard-a1-a2.html`)
      contentElement.innerHTML = html
      initializeLanguage()
    }
}