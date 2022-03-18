const showSuccess = (boxId: string) => {
  const box = document.getElementById(boxId)
  const boxCopy = <HTMLElement>box.cloneNode(true)
  box.parentNode.replaceChild(boxCopy, box)

  if (!boxCopy.classList.contains('animate')) {
    boxCopy.classList.add('animate')
  }
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

export const setCodeToClipboard = (text: string) => {
  copyTextToClipboard(text)
    .then(() => {
      showSuccess('copying_box_code')
    })
    .catch(() => {
      alert('Copying to clipboard is not supported on your browser.')
    })
}

let selectedEquation: HTMLElement
const copyEquation = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const latex = target.querySelector('title').textContent
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

export const initializeCopyToClipboard = () => {
  const copyableElements: Element[] = [].concat(
    Array.from(document.querySelectorAll('.clickable')),
    Array.from(document.querySelectorAll('.code-clickable')),
    Array.from(document.querySelectorAll('.code-output-clickable')),
  )
  copyableElements.forEach(element => element.addEventListener('click', copyTextContent ))

  const equationElements = Array.from(document.querySelectorAll('svg'))
  equationElements.forEach(element => element.addEventListener('click', copyEquation))
}
