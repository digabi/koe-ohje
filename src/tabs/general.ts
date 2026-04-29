import { activateModalImage } from '../util/modalImage'

export const initializeGeneralTab = (): void => {
  const contentElement = document.getElementById(`general-tab`)
  if (contentElement) {
    const modalImages = contentElement.querySelectorAll<Element>('.tab-gen-modal-image')
    modalImages.forEach((element: Element) => activateModalImage(element))
  }
}
