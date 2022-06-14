import './modalImage.css'

export const activateModalImage = (elementLink: Element) => {
  if (!elementLink.id) {
    console.error('Following element claims to be modal link but it is missing id:', elementLink)
    return
  }

  const elementModal = document.createElement('div')
  elementModal.id = 'modal-image-id-' + elementLink.id
  elementModal.className = 'modal-image-fullscreen'
  elementModal.innerHTML = `<img class="modal-image-fullscreen-image" src="${elementLink.getAttribute('src')}">`
  // This is defined here to make testing easier
  elementModal.style.display = 'none'

  elementLink.parentNode.insertBefore(elementModal, elementLink.nextSibling)

  const elementClose = document.createElement('span')
  elementClose.className = 'modal-image-close'
  elementClose.innerHTML = '&times;'

  elementModal.appendChild(elementClose)

  elementLink.addEventListener('click', openModalImage)
  elementModal.addEventListener('click', closeModal)
}

const openModalImage = (event: MouseEvent) => {
  const elementLink = event.target as HTMLElement
  const eventId = elementLink.id
  const modalId = 'modal-image-id-' + eventId

  const elementModal = document.getElementById(modalId)
  elementModal.style.display = 'block'
}

const closeModal = (event: MouseEvent) => {
  event.stopPropagation()

  const element = event.target as HTMLElement
  const elementParent = element.parentNode as HTMLElement

  if (element.classList.contains('modal-image-fullscreen')) {
    element.style.display = 'none'
  } else if (elementParent.classList.contains('modal-image-fullscreen')) {
    elementParent.style.display = 'none'
  }
}
