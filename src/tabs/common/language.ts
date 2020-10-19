export enum Language {
  finnish = 'fi',
  swedish = 'sv'
}

export const getCurrentLanguage = () => {
    const url = new URL(window.location.href)
    if (url.searchParams.get(Language.swedish) !== null) return Language.swedish
    return Language.finnish
  
}

export const initializeLanguage = () => {
  const videos = document.querySelectorAll<HTMLElement>('.helpvideo')
  videos.forEach(video => {
    const src = `../common/videos/${getCurrentLanguage()}/${video.dataset.src}`
    video.setAttribute('src', src)
  })

  const languageToRemove = getCurrentLanguage() === Language.finnish ? Language.swedish : Language.finnish
  const wrongLanguageElements = document.querySelectorAll(`.${languageToRemove}`)
  wrongLanguageElements.forEach(element => element.parentNode.removeChild(element))
}
