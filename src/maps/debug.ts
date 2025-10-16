import * as leaflet from 'leaflet'

const DebugLayer = leaflet.GridLayer.extend({
  createTile: (coords: leaflet.Coords) => {
    const tile = document.createElement('div')
    tile.setAttribute('class', 'debug-tile')

    tile.style.outline = '1px solid black'
    tile.style.display = 'flex'
    tile.style.justifyContent = 'center'
    tile.style.alignItems = 'center'
    tile.style.flexDirection = 'column'
    tile.style.fontSize = '16px'
    tile.style.fontWeight = 'bold'

    const coordsContainer = document.createElement('div')
    coordsContainer.innerText = `x: ${coords.x}, y: ${coords.y}`

    tile.appendChild(coordsContainer)

    return tile
  },
})

const ZoomLevel = leaflet.Control.extend({
  onAdd: (map: leaflet.Map) => {
    map.getZoom()

    const textElement = document.createElement('div')
    textElement.setAttribute('id', `${map.getContainer().id}-zoom-level`)
    textElement.innerText = `Current zoom level: ${map.getZoom()}`

    textElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    textElement.style.padding = '5px'
    textElement.style.color = '#FFF'
    textElement.style.fontWeight = 'bold'

    return textElement
  },
})

let zoomLevel: leaflet.Control | undefined
let debugLayer: leaflet.GridLayer | undefined
const onZoomEnd = (event: leaflet.LeafletEvent) => {
  const map = event.target as leaflet.Map
  const zoomInfo = document.getElementById(`${map.getContainer().id}-zoom-level`)
  if (zoomInfo) {
    const newZoom = map.getZoom()
    zoomInfo.innerText = `Current zoom level: ${newZoom}`
  }
}

export const removeDebugLayer = (map: leaflet.Map) => {
  if (zoomLevel) {
    map.removeControl(zoomLevel)
    map.removeEventListener('zoomend', onZoomEnd)
    zoomLevel = undefined
  }

  if (debugLayer) {
    map.removeLayer(debugLayer)
    debugLayer = undefined
  }
}

export const addDebugLayer = (map: leaflet.Map) => {
  zoomLevel = new ZoomLevel({ position: 'topright' })
  debugLayer = new DebugLayer() as leaflet.GridLayer

  map.addLayer(debugLayer)
  map.addControl(zoomLevel)
  map.addEventListener('zoomend', onZoomEnd)
}
