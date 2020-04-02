import { createMap } from '@digabi/exam-help-maps'
import { isAbikitBrowser } from '../util/abikit'
import { log } from '../util/debug'
import { getCurrentLanguage, Language } from '../util/language'

import './geography.css'
import 'leaflet/dist/leaflet.css'

const setupMap = () => {
  if (isAbikitBrowser()) {
    log('Error: Maps are not supported with abikit')
  } else {
    const awsUrl = 'https://s3.eu-north-1.amazonaws.com/maptiles-cheat.abitti.fi-cheat.abitti-prod'
    const mapUrlSv = `${awsUrl}/world/sv/{z}/{x}/{y}.png`
    const mapUrlFi = `${awsUrl}/world/fi/{z}/{x}/{y}.png`

    const mapContainer = document.getElementById('map-container')
    const mapUrl = getCurrentLanguage() === Language.finnish ? mapUrlFi : mapUrlSv

    if (mapContainer) {
      createMap({
        container: mapContainer,
        mapUrl
      })
    }
  }
}

export const initializeGeographyTab = () => {
  setupMap()
}
