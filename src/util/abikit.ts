interface SharedClass {
  copy_html_to_clipboard: (html: string) => {}
  copy_text_to_clipboard: (text: string) => {}
  write_to_stdout: (message: string) => {}
}

declare global {
  interface Window {
    sharedclass: SharedClass
  }
}

export const isAbikitBrowser = (): Boolean => typeof window.sharedclass == 'object'
