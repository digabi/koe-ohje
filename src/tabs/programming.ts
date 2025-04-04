import './programming.css'
import { setCodeToClipboard } from './common/clipboard'

const processAccessibilityKeybindings = (event: KeyboardEvent) => {
  if (event.code === 'Enter') {
    const el = event.target as HTMLElement
    if (el.className === 'code-clickable') {
      setCodeToClipboard(el.innerText)
      return
    }
  }
}

export const initializeProgrammingTab = () => {
  document.addEventListener('keydown', processAccessibilityKeybindings)
}

export const teardownProgrammingTab = () => {
  document.removeEventListener('keydown', processAccessibilityKeybindings)
}
