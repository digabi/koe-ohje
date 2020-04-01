import { isAbikitBrowser } from './abikit'

export enum Language {
  finnish = 'fi',
  swedish = 'sv'
}

export const getCurrentLanguage = () => {
  if (isAbikitBrowser()) {
    const path = window.location.pathname
    if (path.includes('index-sv')) return Language.swedish
    return Language.finnish
  } else {
    const url = new URL(window.location.href)
    if (url.searchParams.get(Language.swedish) !== null) return Language.swedish
    return Language.finnish
  }
}
