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

const convertToAbicodeLinks = () => {
  if (process.env.ABICODE_URL) {
    const els = document.querySelectorAll('#abicode')
    els.forEach((el) => {
      const a = document.createElement('a')
      a.textContent = el.textContent
      a.href = process.env.ABICODE_URL
      a.target = '_blank'
      el.parentNode.replaceChild(a, el)
    })
  }
}

export const initializeProgrammingTab = () => {
  document.addEventListener('keydown', processAccessibilityKeybindings)
  convertToAbicodeLinks()
}

export const teardownProgrammingTab = () => {
  document.removeEventListener('keydown', processAccessibilityKeybindings)
}
