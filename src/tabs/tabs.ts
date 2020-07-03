import { initializeLanguage } from '../util/language'
import { initializeCopyToClipboard } from '../clipboard'
import { applyTablesorter } from '../util/tablesorter'
import { initializeGeographyTab } from './geography'
import { initializeToc } from './common/toc'

export enum Tab {
  Chemistry = 'chemistry',
  French = 'french',
  General = 'general',
  Geography = 'geography',
  Germany = 'germany',
  Math = 'math',
  Physics = 'physics',
  Sami = 'sami',
  Spanish = 'spanish'
}

declare global {
  interface Window {
    initializeTocBot: () => void
  }
}

const loadTab = (oldTab: Tab, newTab: Tab) => {
  $('#loading').show()

  // This timeout makes sure that the loading screen renders before executing the load tab code
  setTimeout(() => {
    const oldTabElement = document.querySelector(`#tab-${oldTab}`)
    oldTabElement.classList.remove('active')
    while (oldTabElement.firstChild) {
      oldTabElement.removeChild(oldTabElement.firstChild)
    }

    const newTabElement = document.querySelector(`#tab-${newTab}`)
    newTabElement.classList.add('active')

    $(`#tab-${newTab}`).load(`tab-${newTab}.html`, () => {
      initializeLanguage()
      initializeCopyToClipboard()
      applyTablesorter(newTab)

      if (newTab === Tab.Geography) {
        initializeGeographyTab()
      }

      initializeToc()

      $('#loading').fadeOut(300)
    })
  }, 0)
}

const handleChangeTab = (event: MouseEvent) => {
  const clickedTabButton = event.currentTarget as HTMLElement
  const clickedTab = clickedTabButton?.dataset.tabId as Tab

  const currentTabButton = document.querySelector<HTMLElement>('.tab-menu-option.active')
  const currentTab = currentTabButton?.dataset.tabId as Tab
  if (currentTab === clickedTab) return

  clickedTabButton.classList.add('active')
  currentTabButton.classList.remove('active')

  loadTab(currentTab, clickedTab)
}

export const initializeTabs = () => {
  const menuItems = Array.from(document.querySelectorAll('#tab-menu .tab-menu-option'))
  menuItems.forEach(element => element.addEventListener('click', handleChangeTab))

  loadTab(Tab.General, Tab.General)
}
