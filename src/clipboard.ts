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

const getMathDemoUrl = () => {
  switch (window.location.hostname) {
    case 'cheat.abitti.fi':
    case 'cheat.test.abitti.fi':
      return 'https://math-demo.abitti.fi'
    default:
      return ''
  }
}

let selectedEquation: HTMLElement
const copyEquation = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const latex = target.querySelector('title').textContent
  if (!latex) return

  event.preventDefault()

  if (selectedEquation) {
    selectedEquation.style.backgroundColor = 'transparent'
    jQuery('#copying_box')
      .stop()
      .animate({ opacity: '100' })
  }

  selectedEquation = target
  target.style.backgroundColor = '#E0F4FE'

  const mathImage = document.createElement('img')
  mathImage.setAttribute('alt', latex)
  mathImage.setAttribute('src', `${getMathDemoUrl()}/math.svg?latex=${encodeURIComponent(latex)}`)
  document.body.appendChild(mathImage)

  if (isAbikitBrowser()) {
    window.sharedclass.copy_html_to_clipboard(mathImage.outerHTML)
  } else {
    const range = document.createRange()
    range.selectNode(mathImage)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
  }

  document.body.removeChild(mathImage)

  $('#copying_box')
    .show()
    .fadeOut(3000)
}

export const initializeCopyToClipboard = () => {
  const copyableElements = Array.from(document.querySelectorAll('.clickable'))
  copyableElements.forEach(element => element.addEventListener('click', copyText))

  const equationElements = Array.from(document.querySelectorAll('svg'))
  equationElements.forEach(element => element.addEventListener('click', copyEquation))
}
