export enum Language {
  finnish = 'fi',
  swedish = 'sv'
}

const localStorageLanguageKey = 'digabi-koe-ohje-last-language'

const setPreviousLanguage = (language: Language) => {
  window.localStorage.setItem(localStorageLanguageKey, language)
}

const getPreviousLanguage = (): Language => {
  return window.localStorage.getItem(localStorageLanguageKey)
}

export const getCurrentLanguage = () => {
  // Check language from the URL
  const url = new URL(window.location.href)
  if (url.searchParams.get(Language.finnish) !== null) {
    setPreviousLanguage(Language.finnish)
    return Language.finnish
  }
  if (url.searchParams.get(Language.swedish) !== null) {
    setPreviousLanguage(Language.swedish)
    return Language.swedish
  }

  // Try to get previous language code
  const previousLanguage = getPreviousLanguage()
  let languages = Object.values(Language)
  if (languages.indexOf(previousLanguage) >= 0) {
    return previousLanguage
  }

  // Defaults to Finnish
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
