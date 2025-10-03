import { loadHtml } from '../../util/loadHtml'
import { activateModalImage } from '../../util/modalImage'
import { initializeLanguage } from './language'
import { initializeToc } from './toc'

type Version = '1' | '2'
export const initializeVersionSelector = (tabName: string) => {
  async function loadVersion(version: Version): Promise<void> {
    const contentElement = document.getElementById(`content-instructions-${tabName}`)
    if (contentElement) {
      contentElement.innerHTML = ''
      contentElement.className = ''
      contentElement.classList.add(`abitti-${version}`)

      if (tabName === 'general') {
        const html = await loadHtml(`tab-${tabName}-a${version}.html`)
        contentElement.innerHTML = html
        const modalImages = contentElement.querySelectorAll<Element>('.tab-gen-modal-image')
        modalImages.forEach((element: Element) => activateModalImage(element))
      }
      if (tabName === 'keyboard') {
        const html = await loadHtml(`tab-${tabName}-a1-a2.html`)
        contentElement.innerHTML = html
      }

      const hiddenElements = contentElement.querySelectorAll<HTMLElement>(`.hide-abitti-${version}`)
      hiddenElements.forEach((element) => element.parentNode?.removeChild(element))

      initializeLanguage()
    }
  }

  const queryParams = new URLSearchParams(window.location.search)
  const abittiVersion = queryParams.get('abittiVersion')
  const buttons = document.querySelectorAll('.abitti-version-button')

  if (abittiVersion) {
    void switchVersion(abittiVersion as Version)
    buttons.forEach((button) => button.parentNode?.removeChild(button))
  } else {
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        void switchVersion((button as HTMLElement).dataset.abittiVersion as Version)
      })
    })
    void switchVersion('1')
  }

  async function switchVersion(version: Version): Promise<void> {
    await loadVersion(version)
    initializeToc()

    document.querySelectorAll('.abitti-version-button').forEach((b) => b.classList.remove('active'))
    document.querySelector(`[data-abitti-version="${version}"]`)?.classList.add('active')
  }
}
