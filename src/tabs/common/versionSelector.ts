import { loadHtml } from '../../util/loadHtml'
import { activateModalImage } from '../../util/modalImage'
import { initializeLanguage } from './language'

type Version = '1' | '2'

export const initializeVersionSelector = (tabName: string): void => {
  let currentVersion: Version = '1'

  void loadVersion('1')

  async function loadVersion(version: Version): Promise<void> {
    const contentElement = document.getElementById(`content-abitti-${version}`)
    if (contentElement) {
      const html = await loadHtml(`tab-${tabName}-a${version}.html`)
      contentElement.innerHTML = html

      initializeLanguage()

      if (tabName === 'general') {
        const modalImages = contentElement.querySelectorAll<Element>('.tab-gen-modal-image')
        modalImages.forEach((element: Element) => activateModalImage(element))
      }
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
  }

  async function switchVersion(version: Version): Promise<void> {
    if (currentVersion === version) return

    currentVersion = version
    await loadVersion(version)

    document.querySelectorAll('.abitti-version-content').forEach((c) => c.classList.remove('active'))
    document.getElementById(`content-abitti-${version}`)?.classList.add('active')
    document.querySelectorAll('.abitti-version-button').forEach((b) => b.classList.remove('active'))
    document.querySelector(`[data-abitti-version="${version}"]`)?.classList.add('active')
  }
}
