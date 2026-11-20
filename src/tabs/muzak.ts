import './muzak.css'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'

import { getCurrentLanguage } from './common/language'
import { mapTilesUrl } from './tabs'

type AudioCtx = {
  [key: string]: AudioContext
}

type AudioResource = {
  id: string
  src: string
}

const audioResources: AudioResource[] = [
  { id: 'tab-muzak-music-xa', src: 'canton_white_noise_and_heartbeat.mp3' },
  { id: 'tab-muzak-music-bc', src: 'scott_hamster_haven.mp3' },
  { id: 'tab-muzak-music-hg', src: 'novarina_minimalism_n10_notre_envol_ii.mp3' },
  { id: 'tab-muzak-music-fk', src: 'chopin_eliogu_op55_no1.mp3' },
  { id: 'tab-muzak-music-ef', src: 'mozart_robineau_fantasie_en_re_mineur_k_397.mp3' },
  { id: 'tab-muzak-music-df', src: 'bluewhales_uplifting_orchestra.mp3' },
  { id: 'tab-muzak-music-we', src: 'obrien_inspiration_strikes.mp3' },
  { id: 'tab-muzak-music-ht', src: 'romansenykmusic_inspiring_acousting_uplifting_soft_background.mp3' },
  { id: 'tab-muzak-music-ws', src: 'trow_acoustic_guitar_arrangement_for_song.mp3' },
  { id: 'tab-muzak-music-lh', src: 'hyde_acoustically_driven_instrumental.mp3' },
  { id: 'tab-muzak-music-kj', src: 'teoh_lucky_break.mp3' },
  { id: 'tab-muzak-music-jj', src: 'mbryan_yokoo_oneness.mp3' },
  { id: 'tab-muzak-music-uf', src: 'whitenoiseaudio_diorama.mp3' },
  { id: 'tab-muzak-music-lo', src: 'whitenoiseaudio_kfuc120.mp3' },
  { id: 'tab-muzak-music-qw', src: 'whitenoiseaudio_bleepy103.mp3' },
  { id: 'tab-muzak-music-lk', src: 'unwrittenstories_its_simple.mp3' },
  { id: 'tab-muzak-music-xd', src: 'maddirtmonkey_electronic_happy_song.mp3' },
  { id: 'tab-muzak-music-xx', src: 'nettspend_shine_n_peace.mp3' },
]

const ariaLabelPlay = {
  fi: 'Soita',
  sv: 'Spela',
}

const ariaLabelPause = {
  fi: 'Pysäytä',
  sv: 'Pausa',
}

const audioCtx: AudioCtx = {}
let audioElement: HTMLAudioElement
let currentMuzakId = ''

const createAudioContext = (audioId: string) => {
  audioElement = document.getElementById(audioId) as HTMLAudioElement
  audioElement.loop = true

  if (audioCtx[audioId] == undefined) {
    audioCtx[audioId] = new window.AudioContext()
    const track = audioCtx[audioId].createMediaElementSource(audioElement)
    track.connect(audioCtx[audioId].destination)
  }

  currentMuzakId = audioId
}

const getMuzakId = (element: Element): string => {
  let muzakId = element.getAttribute('data-muzakid')

  if (muzakId == null) {
    muzakId = getMuzakId(element.parentElement)
  }

  return muzakId
}

const setButtonIconPause = (buttonId: string) => {
  const buttons = Array.from(document.querySelectorAll(`[data-muzakid="${buttonId}"]`))
  buttons.forEach((element) => {
    element.innerHTML = '<i class="fas fa-pause"></i>'
    element.className = element.className.replace('tab-muzak-play', 'tab-muzak-pause')
    element.setAttribute('aria-label', ariaLabelPause[getCurrentLanguage()])
  })
}

const setButtonIconPlay = (buttonId: string) => {
  const buttons = Array.from(document.querySelectorAll(`[data-muzakid="${buttonId}"]`))
  buttons.forEach((element) => {
    element.innerHTML = '<i class="fas fa-play"></i>'
    element.className = element.className.replace('tab-muzak-pause', 'tab-muzak-play')
    element.setAttribute('aria-label', ariaLabelPlay[getCurrentLanguage()])
  })
}

const playButtonClicked = (event: Event) => {
  const audioId = getMuzakId(event.target as Element)

  if (audioId != currentMuzakId) {
    if (audioElement) {
      audioElement.pause()
      setButtonIconPlay(currentMuzakId)
    }
    createAudioContext(audioId)
  }

  // check if context is in suspended state (autoplay policy)
  if (audioCtx[audioId] != null && audioCtx[audioId].state === 'suspended') {
    void audioCtx[audioId].resume()
  }

  if (audioElement.paused) {
    void audioElement.play()
    setButtonIconPause(audioId)
  } else {
    audioElement.pause()
    setButtonIconPlay(audioId)
  }
}
const createAudioElements = (audioResources: AudioResource[]) => {
  const el = document.getElementById('tab-muzak-audio-content')

  while (el.firstChild) {
    el.removeChild(el.lastChild)
  }

  audioResources.forEach((audioResource) => {
    const audioEl = document.createElement('audio')
    audioEl.setAttribute('id', audioResource.id)
    audioEl.setAttribute('src', `${mapTilesUrl}/muzak/${audioResource.src}`)
    audioEl.setAttribute('crossorigin', 'anonymous')
    el.appendChild(audioEl)
  })
}

export const initializeMuzakTab = () => {
  library.add(faPlay)
  library.add(faPause)
  dom.watch()

  createAudioElements(audioResources)

  const playButtons = Array.from(document.querySelectorAll('.tab-muzak-play'))
  playButtons.forEach((element) => element.addEventListener('click', playButtonClicked))

  if (currentMuzakId) {
    setButtonIconPause(currentMuzakId)
  }
}
