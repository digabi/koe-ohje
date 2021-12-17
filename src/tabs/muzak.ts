import './muzak.css'

const audioCtx = []
const audioElement
var currentMuzakId = ''
var audioPlaying = false

const createAudioContext = (audioId) => {
  audioElement = document.getElementById(audioId)
  audioElement.loop = true

  if (audioCtx[audioId] == undefined) {
    audioCtx[audioId] = new AudioContext()
    const track = audioCtx[audioId].createMediaElementSource(audioElement)
    track.connect(audioCtx[audioId].destination)
  }

  currentMuzakId = audioId
}

const playButtonClicked = (event) => {
  const audioId = event.target.getAttribute('data-muzakid')
  if (audioId != currentMuzakId) {
    if (audioElement) {
      audioElement.pause()
    }
    createAudioContext(audioId)
  }

  // check if context is in suspended state (autoplay policy)
  if (audioCtx[audioId].state === 'suspended') {
    audioCtx[audioId].resume()
  }

  if (audioElement.paused) {
    audioElement.play()
  } else {
    audioElement.pause()
  }
}

const stopButtonClicked = () => {
  if (audioElement != undefined) {
    audioElement.pause()
    audioPlaying = false
  }
}

export const initializeMuzakTab = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  audioCtx = new AudioContext()

  const playButtons = Array.from(document.querySelectorAll('.tab-muzak-play'))
  playButtons.forEach((element) => element.addEventListener('click', playButtonClicked))

  const stopButtons = Array.from(document.querySelectorAll('.tab-muzak-stop'))
  stopButtons.forEach((element) => element.addEventListener('click', stopButtonClicked))
}
