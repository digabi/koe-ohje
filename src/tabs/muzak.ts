import './muzak.css'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'

const audioCtx = {}
const audioElement
var currentMuzakId = ''
var audioPlaying = false

const createAudioContext = (audioId) => {
  audioElement = document.getElementById(audioId)
  audioElement.loop = true

  if (audioCtx[audioId] == undefined) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    audioCtx[audioId] = new AudioContext()
    const track = audioCtx[audioId].createMediaElementSource(audioElement)
    track.connect(audioCtx[audioId].destination)
  }

  currentMuzakId = audioId
}

const getMuzakId = (element): string => {
  var muzakId = element.getAttribute('data-muzakid')

  if (muzakId == null) {
    muzakId = getMuzakId(element.parentNode)
  }

  return muzakId
}

const setButtonIconPause = (buttonId) => {
  const buttons = Array.from(document.querySelectorAll('[data-muzakid="'+buttonId+'"]'))
  buttons.forEach((element) => {
    element.innerHTML = '<i class="fas fa-pause"></i>'
    element.className = element.className.replace('tab-muzak-play', 'tab-muzak-pause')
  })
}

const setButtonIconPlay = (buttonId) => {
  const buttons = Array.from(document.querySelectorAll('[data-muzakid="'+buttonId+'"]'))
  buttons.forEach((element) => {
    element.innerHTML = '<i class="fas fa-play"></i>'
    element.className = element.className.replace('tab-muzak-pause', 'tab-muzak-play')
  })
}

const playButtonClicked = (event) => {
  var audioId = getMuzakId(event.target)

  if (audioId != currentMuzakId) {
    if (audioElement) {
      audioElement.pause()
      setButtonIconPlay(currentMuzakId)
    }
    createAudioContext(audioId)
  }

  // check if context is in suspended state (autoplay policy)
  if (audioCtx[audioId] != null && audioCtx[audioId].state === 'suspended') {
    audioCtx[audioId].resume()
  }

  if (audioElement.paused) {
    audioElement.play()
    setButtonIconPause(audioId)
  } else {
    audioElement.pause()
    setButtonIconPlay(audioId)
  }
}

export const initializeMuzakTab = () => {
  library.add(faPlay)
  library.add(faPause)
  dom.watch()

  const playButtons = Array.from(document.querySelectorAll('.tab-muzak-play'))
  playButtons.forEach((element) => element.addEventListener('click', playButtonClicked))

  if (currentMuzakId) {
    setButtonIconPause(currentMuzakId)
  }
}
