import { isAbikitBrowser } from './util/abikit'
import * as jQuery from 'jquery'

const copyText = (text: string): Promise<void> => {
  return new Promise(function(resolve, reject) {
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

export const initializeCopyToClipboard = async () => {
  const copyableElements = document.querySelectorAll('.clickable')

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const text = target.textContent

    copyText(text)
      .then(() => {
        setTimeout(() => {
          jQuery('#copying_box_kbd')
            .show()
            .fadeOut(3000)
        }, 350)
      })
      .catch(() => {
        alert('Copying to clipboard is not supported on your browser.')
      })
  }

  copyableElements.forEach(element => element.addEventListener('click', onClick))
}
