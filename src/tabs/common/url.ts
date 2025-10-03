import { Tab, getCurrentTab } from '../tabs'
import { Language, getCurrentLanguage } from './language'

export const getLanguageFromUrl = (): Language => {
  const url = new URL(window.location.href)
  const langParam = url.searchParams.get('lang')

  if (langParam && Object.values(Language).includes(langParam as Language)) {
    return langParam as Language
  }

  return null
}

export const getTabFromUrl = (): Tab => {
  const url = new URL(window.location.href)
  const tabParam = url.searchParams.get('tab')

  if (tabParam && Object.values(Tab).includes(tabParam as Tab)) {
    return tabParam as Tab
  }

  return null
}

export const getHashFromUrl = (): string => {
  const url = new URL(window.location.href)

  if (url.hash) return url.hash.substr(1)

  return null
}

export const updateUrl = (): URL => {
  const url = new URL(window.location.href)

  url.searchParams.set('lang', getCurrentLanguage())
  url.searchParams.set('tab', getCurrentTab())
  const abittiVersion = url.searchParams.get('abittiVersion')
  if (abittiVersion) {
    url.searchParams.set('abittiVersion', abittiVersion)
  }

  // Modify history stack only if not a back-button-case
  if (window.location.href != url.toString()) {
    history.pushState({}, document.title, url.toString())
  }

  return url
}
