import { getCurrentTab } from '../tabs'

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

const handleChangeLanguage = (event: MouseEvent) => {
  const clickedLanguageButton = event.currentTarget as HTMLElement
  const clickedLanguage = clickedLanguageButton?.dataset.langId as Language

  if (getCurrentLanguage() == clickedLanguage) {
    return
  }

  let url = new URL(window.location.href)
  url.search = "?" + getCurrentTab()

  setPreviousLanguage(clickedLanguage)

  // We have to reload the page as the unselected language elements have been
  // deleted to make the page lighter
  window.location = url
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

  const languageItems = Array.from(document.querySelectorAll('.tab-menu-language-option'))
  languageItems.forEach((element) => element.addEventListener('click', handleChangeLanguage))
}
