import './programming.css'
import { initializeMonacoEditor, getCode, setMonacoReadOnly } from './common/monaco-editor'
import { setCodeToClipboard } from './common/clipboard'

const codeEditorId = 'code-editor'
const outputId = 'code-output'
const errorId = 'code-error'
const executeButtonSelector = '.code-editor-execute'
const copyCodeToClipboardButtonSelector = '.code-editor-copy'
const boilerplateErrorstrings = [
  {
    errorString: 'PythonError: Traceback \\(most recent call last\\)[.,:"=\\-_\\/\\(\\)\\|\\n\\s\\w]+(File "<exec>")',
    replaceWith: '$1',
  },
  {
    errorString: '\\s*File "<exec>", line (\\d+), in <module>\n',
    replaceWith: 'Line $1:\n',
  },
]

let pyodide = null
let pyodideInitializing = true

const hideBothAreas = () => {
  document.getElementById(outputId).style.display = 'none'
  document.getElementById(errorId).style.display = 'none'
}

const showErrorArea = () => {
  document.getElementById(outputId).style.display = 'none'
  document.getElementById(errorId).style.display = 'block'
}

const showOutputArea = () => {
  document.getElementById(outputId).style.display = 'block'
  document.getElementById(errorId).style.display = 'none'
}

const printStderr = (text: string) => {
  if (pyodideInitializing) {
    return
  }

  text = removeBoilerplateErrorstrings(text)

  document.getElementById(errorId).innerHTML = text
  showErrorArea()
}

const removeBoilerplateErrorstrings = (text: string): string => {
  boilerplateErrorstrings.forEach((replaceError) => {
    const re = new RegExp(replaceError.errorString)
    text = text.replace(re, replaceError.replaceWith)
  })

  return text
}

const getInput = (): string => {
  return prompt('Enter input string')
}

const clearStdout = () => {
  document.getElementById(outputId).innerHTML = ''
}

const printStdout = (text: string) => {
  if (pyodideInitializing) {
    return
  }

  showOutputArea()
  const outputElement = document.getElementById(outputId)
  text = text.replace(/</g, '&lt;')
  outputElement.innerHTML = outputElement.innerHTML + text + '\n'
}

const executeCode = () => {
  clearStdout()

  const code = getCode()

  try {
    pyodide.runPython(code)
  } catch (err) {
    printStderr(err.toString())
  }
}

const copyCodeToClipboard = () => {
  setCodeToClipboard(getCode())
}

const getUrlPath = () => {
  const pathname = window.location.pathname
  return pathname.replace(/build\/.*$/, '')
}

const initializePythonEngine = async () => {
  if (pyodide != null) {
    // Pyodide is already initialized, we're coming back from another tab
    setMonacoReadOnly(false)
    showOutputArea()
    return
  }

  setMonacoReadOnly(true)
  hideBothAreas()
  pyodideInitializing = true

  pyodide = await loadPyodide({
    indexURL: getUrlPath() + 'common/pyodide/', // Pydiode does not handle .. as part of the path
    stdin: getInput,
    stdout: (text: string) => printStdout(text),
    stderr: (text: string) => printStderr(text),
  })

  pyodide.runPython('import js\ndef input(prompt):\n  return js.prompt(prompt)\n\n')

  pyodide.loadPackage('numpy')

  setMonacoReadOnly(false)
  showOutputArea()
  pyodideInitializing = false
}

export const initializeProgrammingTab = () => {
  initializeMonacoEditor(codeEditorId)
  initializePythonEngine()

  const executeButtons = Array.from(document.querySelectorAll(executeButtonSelector))
  executeButtons.forEach((element) => element.addEventListener('click', executeCode))

  const copyToClipboardButtons = Array.from(document.querySelectorAll(copyCodeToClipboardButtonSelector))
  copyToClipboardButtons.forEach((element) => element.addEventListener('click', copyCodeToClipboard))
}
