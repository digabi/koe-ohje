import { Tab } from '../tabs/tabs'
import { TablesorterConfiguration } from 'tablesorter'

type SorterConfigurations = {
  [key: string]: TablesorterConfiguration
}

type TabConfigurations = {
  [key in Tab]?: SorterConfigurations
}

export const applyTablesorter = (tab: Tab) => {
  const tabConfigurations = sorterConfigurations[tab]
  if (!tabConfigurations) return

  Object.entries(tabConfigurations).forEach(([tableId, sorterConfiguration]) => {
    const table = document.getElementById(tableId)
    if (!table) return
    // Use old jQuery reference with the old local copy of tablesorter
    $(`#${tableId}`).tablesorter(sorterConfiguration)
  })
}

const sorterConfigurations: TabConfigurations = {
  [Tab.Chemistry]: {
    'table-nimet_ja_symbolit': {
      headers: {
        0: { sorter: 'digit' },
        1: { sorter: false },
        2: { sorter: 'text' },
        3: { sorter: 'text' },
        4: { sorter: 'text' }
      },
      sortList: [[0, 0]]
    },
    'table-aineiden_liukoisuus_veteen': {
      headers: {
        0: { sorter: 'text' },
        1: { sorter: false },
        2: { sorter: false },
        3: { sorter: false },
        4: { sorter: false },
        5: { sorter: false },
        6: { sorter: false },
        7: { sorter: false },
        8: { sorter: false },
        9: { sorter: false },
        10: { sorter: false },
        11: { sorter: false },
        12: { sorter: false }
      },
      sortList: [[0, 0]]
    }
  },
  [Tab.Physics]: {
    'table-kiinteat_alkuaineet': {
      headers: {
        0: { sorter: 'digit' },
        1: { sorter: false },
        2: { sorter: false },
        3: { sorter: false },
        4: { sorter: false },
        5: { sorter: false },
        6: { sorter: false },
        7: { sorter: false },
        8: { sorter: false },
        9: { sorter: false }
      },
      sortList: [[0, 0]]
    },
    'table-metalliseokset': {
      headers: {
        0: { sorter: 'text' },
        1: { sorter: false },
        2: { sorter: false },
        3: { sorter: false },
        4: { sorter: false },
        5: { sorter: false },
        6: { sorter: false }
      },
      sortList: [[0, 0]]
    },
    'table-muita_kiinteita_aineita': {
      headers: {
        0: { sorter: 'text' },
        1: { sorter: false },
        2: { sorter: false },
        3: { sorter: false },
        4: { sorter: false }
      },
      sortList: [[0, 0]]
    },
    'table-nesteet': {
      headers: {
        0: { sorter: 'text' },
        1: { sorter: false },
        2: { sorter: false },
        3: { sorter: false },
        4: { sorter: false },
        5: { sorter: false }
      },
      sortList: [[0, 0]]
    },
    'table-kaasut': {
      headers: {
        0: { sorter: 'text' },
        1: { sorter: false },
        2: { sorter: false },
        3: { sorter: false },
        4: { sorter: false },
        5: { sorter: false },
        6: { sorter: false }
      },
      sortList: [[0, 0]]
    }
  }
}
