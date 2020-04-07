import { isAbikitBrowser } from './util/abikit'
import jQuery from 'jquery'

const copyTextToClipboard = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isAbikitBrowser()) {
      window.sharedclass.copy_text_to_clipboard(text)
      return resolve()
    }

    let success = false

    const listener = (event: ClipboardEvent) => {
      event.clipboardData.setData('text/plain', text)
      event.preventDefault()
      success = true
    }

    document.addEventListener('copy', listener)
    document.execCommand('copy')
    document.removeEventListener('copy', listener)

    success ? resolve() : reject()
  })
}

const copyText = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const text = target.textContent

  copyTextToClipboard(text)
    .then(() => {
      jQuery('#copying_box_kbd')
        .show()
        .fadeOut(3000)
    })
    .catch(() => {
      alert('Copying to clipboard is not supported on your browser.')
    })
}

export const initializeCopyToClipboard = () => {
  const copyableElements = Array.from(document.querySelectorAll('.clickable'))
  copyableElements.forEach(element => element.addEventListener('click', copyText))
}
