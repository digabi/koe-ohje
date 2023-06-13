import { createWorldMap, createTerrainMap } from '@digabi/maps'
import { getCurrentLanguage, Language } from './common/language'
import { mapTilesUrl } from './tabs'

import './maps.css'
import 'leaflet/dist/leaflet.css'

const setupWorldMap = () => {
  const mapUrlSv = `${mapTilesUrl}/world/sv/{z}/{x}/{y}.png`
  const mapUrlFi = `${mapTilesUrl}/world/fi/{z}/{x}/{y}.png`

  const mapContainer = document.getElementById('map-container')
  const mapUrl = getCurrentLanguage() === Language.finnish ? mapUrlFi : mapUrlSv

  if (mapContainer) {
    createWorldMap({
      container: mapContainer,
      mapUrl,
      attribution: '&copy; Leaflet OpenStreetMap',
    })
  }
}

const setupTerrainMap = () => {
  const mapContainer = document.getElementById('terrain-container')
  const mapUrl = `${mapTilesUrl}/terrain/{z}/{x}/{y}.png`

  if (mapContainer) {
    createTerrainMap({
      container: mapContainer,
      mapUrl,
      attribution: '&copy; Leaflet Maanmittauslaitos',
    })
  }
}

export const initializeMapsTab = () => {
  setupWorldMap()
  setupTerrainMap()
}
