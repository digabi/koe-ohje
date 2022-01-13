import { getCurrentTab } from '../tabs'
import { getLanguageFromUrl, updateUrl } from './url'

export enum Language {
  finnish = 'fi',
  swedish = 'sv'
}

const localStorageLanguageKey = 'digabi-koe-ohje-last-language'
let currentLanguage: Language = null

export const getCurrentLanguage = (): Language => {
  return currentLanguage
}

const setCurrentLanguage = (newLanguage: Language) => {
  currentLanguage = newLanguage
  setPreviousLanguage(newLanguage)
}

const setPreviousLanguage = (language: Language) => {
  window.localStorage.setItem(localStorageLanguageKey, language)
}

const getPreviousLanguage = (): Language => {
  return <Language>window.localStorage.getItem(localStorageLanguageKey)
}

export const guessLanguageForSession = () => {
  // Check language from the URL
  const languageFromUrl = getLanguageFromUrl()
  if (languageFromUrl) {
    return languageFromUrl
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

export const changeLanguage = (newLanguage: Language) => {
  setCurrentLanguage(newLanguage)
  const url = updateUrl()

  // We have to reload the page as the unselected language elements have been
  // deleted to make the page lighter
  window.location.href = url.toString()
}

const handleChangeLanguage = (event: MouseEvent) => {
  const clickedLanguageButton = event.currentTarget as HTMLElement
  const clickedLanguage = clickedLanguageButton?.dataset.langId as Language

  if (getCurrentLanguage() == clickedLanguage) {
    return
  }

  changeLanguage(clickedLanguage)
}

export const initializeLanguage = () => {
  const videos = document.querySelectorAll<HTMLElement>('.helpvideo')
  videos.forEach(video => {
    const src = `../common/videos/${getCurrentLanguage()}/${video.dataset.src}`
    video.setAttribute('src', src)
  })

  setCurrentLanguage(guessLanguageForSession())
  const languageToRemove = getCurrentLanguage() === Language.finnish ? Language.swedish : Language.finnish
  const wrongLanguageElements = document.querySelectorAll(`.${languageToRemove}`)
  wrongLanguageElements.forEach(element => element.parentNode.removeChild(element))

  const languageItems = Array.from(document.querySelectorAll('.tab-menu-language-option'))
  languageItems.forEach((element) => element.addEventListener('click', handleChangeLanguage))
}
