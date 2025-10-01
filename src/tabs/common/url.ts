import { Tab, getCurrentTab } from '../tabs'
import { Language, getCurrentLanguage } from './language'

export const getLanguageFromUrl = (): Language => {
  const url = new URL(window.location.href)
  var urlLanguage = null

  Object.values(Language).forEach(language => {
    if (url.searchParams.get(language) !== null) urlLanguage = language
  })

  return urlLanguage
}

export const getTabFromUrl = (): Tab => {
  const url = new URL(window.location.href)
  var urlTab = null;

  Object.values(Tab).forEach(tab => {
    if (url.searchParams.get(tab) !== null) urlTab = tab
  })

  return urlTab
}

export const getHashFromUrl = (): string => {
  const url = new URL(window.location.href)

  if (url.hash) return url.hash.substr(1)

  return null
}

export const updateUrl = (): URL => {
  const url = new URL(window.location.href)

  // Säilytä abittiVersion parametri jos se on olemassa
  const abittiVersion = url.searchParams.get('abittiVersion')

  url.search = '?' + getCurrentLanguage() + '&' + getCurrentTab()

  console.log('tab', getCurrentTab())

  //  url.searchParams.set(getCurrentLanguage(), getCurrentTab())

  if (abittiVersion) {
    url.searchParams.set('abittiVersion', abittiVersion)
  }

  // Modify history stack only if not a back-button-case
  if (window.location.href != url.toString()) {
    history.pushState({}, document.title, url.toString())
  }

  return url
}
