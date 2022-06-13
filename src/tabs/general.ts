import { activateModalImage } from '../util/modalImage'

export const initializeGeneralTab = () => {
  const modalImages = Array.from(document.querySelectorAll('.tab-gen-modal-image'))
  modalImages.forEach((element) => activateModalImage(element))
}
