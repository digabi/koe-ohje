import { Keyboard } from 'puppeteer'
import { screenReaderTalkPolite } from './screenreader'

const showSuccess = (boxId: string) => {
  const box = document.getElementById(boxId)
  const boxCopy = <HTMLElement>box.cloneNode(true)
  box.parentNode.replaceChild(boxCopy, box)

  if (!boxCopy.classList.contains('animate')) {
    boxCopy.classList.add('animate')
  }

  const messageText = box.innerText
  screenReaderTalkPolite(messageText)
}

const copyTextToClipboard = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
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

const getCopyTextContentSuccessElementId = (element: HTMLElement): string => {
  if (element.tagName == 'svg') {
    return undefined
  }

  if (element.classList.contains('clickable')) {
    return 'copying_box_kbd'
  }

  if (element.classList.contains('code-clickable')) {
    return 'copying_box_code'
  }

  if (element.classList.contains('code-output-clickable')) {
    return 'copying_box_code_output'
  }

  return undefined
}

const copyTextContent = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const text = target.textContent

  const successElementId = getCopyTextContentSuccessElementId(event.target as HTMLElement)

  if (successElementId) {
    copyTextToClipboard(text)
      .then(() => {
        if (successElementId) {
          showSuccess(successElementId)
        }
      })
      .catch(() => {
        alert('Copying to clipboard is not supported on your browser.')
      })
  }
}

const setTextToClipboard = (text: string, successMessageId: string) => {
  copyTextToClipboard(text)
    .then(() => {
      showSuccess(successMessageId)
    })
    .catch(() => {
      alert('Copying to clipboard is not supported on your browser.')
    })
}

export const setCodeToClipboard = (text: string) => {
  setTextToClipboard(text, 'copying_box_code')
}

export const setCodeOutputToClipboard = (text: string) => {
  setTextToClipboard(text, 'copying_box_code_output')
}

let selectedEquation: HTMLElement
const copyEquation = (event: MouseEvent | KeyboardEvent, target: HTMLElement) => {
  const elParentWithLatex = target.closest('button[data-latexformula]') as HTMLElement
  if (!elParentWithLatex) return

  const latex = elParentWithLatex.dataset.latexformula
  if (!latex) return

  event.preventDefault()

  if (selectedEquation) {
    selectedEquation.style.backgroundColor = 'transparent'
    showSuccess('copying_box')
  }

  selectedEquation = target
  target.style.backgroundColor = '#E0F4FE'

  const mathImage = document.createElement('img')
  mathImage.setAttribute('alt', latex)
  mathImage.setAttribute('src', `${process.env.MATH_DEMO_URL}/math.svg?latex=${encodeURIComponent(latex)}`)
  document.body.appendChild(mathImage)
  const range = document.createRange()
  range.selectNode(mathImage)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  document.execCommand('copy')
  document.body.removeChild(mathImage)

  showSuccess('copying_box')
}

const copyEquationClickHandler = (event: MouseEvent) => {
  const targetElement = event.target as HTMLElement
  copyEquation(event, targetElement)
}

const copyEquationKeyboardHandler = (event: KeyboardEvent) => {
  if (event.code === 'Enter') {
    const el = event.target as HTMLElement

    if (el.tagName === 'BUTTON' && el.classList.contains('mjpage')) {
      copyEquation(event, el)
    }
  }
}

export const initializeCopyToClipboard = () => {
  document.addEventListener('click', copyTextContent)

  const equationElements = Array.from(document.querySelectorAll('button.mjpage'))
  equationElements.forEach(element => element.addEventListener('click', copyEquationClickHandler))

  document.addEventListener('keydown', copyEquationKeyboardHandler)
}
