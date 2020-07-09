import { createWorldMap, createTerrainMap } from '@digabi/maps'
import { isAbikitBrowser } from '../util/abikit'
import { log } from '../util/debug'
import { getCurrentLanguage, Language } from './common/language'

import './geography.css'
import 'leaflet/dist/leaflet.css'

const awsUrl = 'https://s3.eu-north-1.amazonaws.com/maptiles-cheat.abitti.fi-cheat.abitti-test'

const setupWorldMap = () => {
  if (isAbikitBrowser()) {
    log('Error: Maps are not supported with abikit')
  } else {
    const mapUrlSv = `${awsUrl}/world/sv/{z}/{x}/{y}.png`
    const mapUrlFi = `${awsUrl}/world/fi/{z}/{x}/{y}.png`

    const mapContainer = document.getElementById('map-container')
    const mapUrl = getCurrentLanguage() === Language.finnish ? mapUrlFi : mapUrlSv

    if (mapContainer) {
      createWorldMap({
        container: mapContainer,
        mapUrl
      })
    }
  }
}

const setupTerrainMap = () => {
  if (isAbikitBrowser()) {
    log('Error: Maps are not supported with abikit')
  } else {
    const mapContainer = document.getElementById('terrain-container')
    const mapUrl = `${awsUrl}/terrain/{z}/{x}/{y}.png`

    if (mapContainer) {
      createTerrainMap({
        container: mapContainer,
        mapUrl
      })
    }
  }
}

export const initializeGeographyTab = () => {
  setupWorldMap()
  setupTerrainMap()
}
