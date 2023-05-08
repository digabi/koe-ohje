export const screenReaderTalkPolite = (text: string) => {
    const el = document.getElementById('screenreader-talk-polite')
    setTimeout(() => { el.innerText = text }, 0)
    setTimeout(() => { el.innerText = '' }, 2000)
}
