import * as monaco from 'monaco-editor'

var editor: monaco.editor.IStandaloneCodeEditor

declare global {
  interface Window {
    MonacoEnvironment: monaco.Environment
  }
}

window.MonacoEnvironment = {
  getWorkerUrl: function () {
    return './editor.worker.bundle.js'
  }
}

const setLastCode = (code: string) => {
  if (window.localStorage) {
    window.localStorage.setItem('monaco-editor-lastcode', code)
  }
}

const getLastCode = (): string => {
  if (window.localStorage && window.localStorage.getItem('monaco-editor-lastcode')) {
    return window.localStorage.getItem('monaco-editor-lastcode')
  }

  return ""
}

export const getCode = () => {
  return editor.getValue()
}

export const setMonacoReadOnly = (readOnly: boolean) => {
  editor.updateOptions({ readOnly: readOnly })
}

export const setFocusToMonacoEditor = () => {
  editor.focus()
}

export const initializeMonacoEditor = (codeEditorId: string, fnExitFromMonaco: Function) => {
  editor = monaco.editor.create(document.getElementById(codeEditorId), {
    automaticLayout: true,
    language: 'python',
    lineNumbersMinChars: 2,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    tabSize: 3,
    renderWhitespace: 'all',
    value: getLastCode(),
    wordWrap: 'on',
  })

  editor.addAction({
    id: 'koe-ohje-exit',
    label: 'Exit from editor',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyX],
    run: () => { fnExitFromMonaco() }
  })

  editor.addAction({
    id: 'koe-ohje-run',
    label: 'Exit from editor',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyR],
    run: () => { fnExitFromMonaco() }
  })

  document.getElementById(codeEditorId).addEventListener('keyup', () => {
    setLastCode(editor.getValue())
  })

  document.getElementById("tab-programming-ide-container").addEventListener('replaceEditorTextForTestingPurposes', (event: CustomEvent) => {
    editor.setValue(event.detail.text)
  })
}
