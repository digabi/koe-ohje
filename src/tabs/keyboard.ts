import './keyboard.css'
import { loadHtml } from '../util/loadHtml'
import { initializeLanguage } from './common/language'

let currentVersion: '1' | '2' = '1'

const loadKeyboardVersion = async (version: '1' | '2') => {
  const contentElement = document.getElementById(`keyboard-content-a${version}`)
  if (contentElement) {
    const html = await loadHtml(`tab-keyboard-a${version}.html`)
    contentElement.innerHTML = html
    initializeLanguage()
  }
}

const switchKeyboardVersion = async (version: '1' | '2') => {
  currentVersion = version

  // Lataa sisältö tarvittaessa
  await loadKeyboardVersion(version)

  // Päivitä näkyvyys
  const allContents = document.querySelectorAll('.keyboard-version-content')
  allContents.forEach((content) => content.classList.remove('active'))

  const targetContent = document.getElementById(`keyboard-content-a${version}`)
  if (targetContent) {
    targetContent.classList.add('active')
  }

  // Päivitä nappien tila
  const allButtons = document.querySelectorAll('.abitti-version-button')
  allButtons.forEach((button) => button.classList.remove('active'))

  const activeButton = document.querySelector(`[data-abitti-version="${version}"]`)
  if (activeButton) {
    activeButton.classList.add('active')
  }
}

export const initializeKeyboardVersionSelector = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const abittiVersion = queryParams.get('abittiVersion')
  const buttons = document.querySelectorAll('.abitti-version-button')

  if (abittiVersion) {
    void switchKeyboardVersion(abittiVersion as '1' | '2')
    buttons.forEach((button) => {
      button.parentNode?.removeChild(button)
    })
    void loadKeyboardVersion(abittiVersion as '1' | '2')
  } else {
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const version = (button as HTMLElement).dataset.abittiVersion as '1' | '2'
        void switchKeyboardVersion(version)
      })
    })
    void loadKeyboardVersion('1')
  }
}
