import './programming.css'
import { initializeMonacoEditor, getCode } from './common/monaco-editor'

const codeEditorId = 'code-editor'
const outputId = 'code-output'
const errorId = 'code-error'
const executeButtonSelector = '.code-editor-execute'

let pyodide = null
let pyodideInitializing

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

  document.getElementById(errorId).innerHTML = text
  showErrorArea()
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

  console.log(text)
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
    console.log(err)
    printStderr(err.toString())
  }
}

const getUrlPath = () => {
  const pathname = window.location.pathname
  return pathname.replace(/build\/.*$/, '')
}

const initializePythonEngine = async () => {
  if (pyodide != null) {
    // Pyodide is already initialized, we're coming back from another tab
    document.getElementById(codeEditorId).disabled = false
    showOutputArea()
    return
  }

  document.getElementById(codeEditorId).disabled = true
  hideBothAreas()
  pyodideInitializing = true

  pyodide = await loadPyodide({
    indexURL: getUrlPath() + 'common/pyodide/', // Pydiode does not handle .. as part of the path
    stdin: getInput,
    stdout: (text) => printStdout(text),
    stderr: (text) => printStderr(text),
  })

  pyodide.runPython('import js\ndef input(prompt):\n  return js.prompt(prompt)\n\n')

  pyodide.loadPackage('numpy')

  document.getElementById(codeEditorId).disabled = false
  showOutputArea()
  pyodideInitializing = false
}

export const initializeProgrammingTab = () => {
  initializeMonacoEditor(codeEditorId)
  initializePythonEngine()

  const executeButtons = Array.from(document.querySelectorAll(executeButtonSelector))
  executeButtons.forEach((element) => element.addEventListener('click', executeCode))
}
