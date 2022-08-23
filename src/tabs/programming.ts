import './programming.css'
import { initializeMonacoEditor, getCode, setMonacoReadOnly } from './common/monaco-editor'
import { setCodeToClipboard } from './common/clipboard'

const codeEditorWrapperId = 'tab-programming-editor-wrapper'
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

let pyodide: any = null
let pyodideInitializing = true

const isSingleColumn = () => window.innerWidth / 2 <= document.getElementById(codeEditorWrapperId).offsetWidth

const getEditorBottom = () => {
  const rect = document.getElementById(codeEditorWrapperId).getBoundingClientRect()
  return rect.top + rect.height
}

const getSuggestedOutputAndErrorHeight = () => {
  const singleColumnReservedSpaceBottom = 200
  const twoColumnReservedSpaceBottom = 50

  const bottomMargin = isSingleColumn() ? singleColumnReservedSpaceBottom : twoColumnReservedSpaceBottom

  return window.innerHeight - getEditorBottom() - bottomMargin
}

const calculateHeight = (element: HTMLElement) => {
  const suggestedHeight = getSuggestedOutputAndErrorHeight()
  const contentHeight = element.scrollHeight
  return contentHeight > suggestedHeight ? suggestedHeight : contentHeight + 20
}

const setOutputAndErrorHeight = (elementId: string) => {
  const element = document.getElementById(elementId)!
  const setHeight = (newHeight: number) => (element.style.height = `{newHeight}px`)

  setHeight(0)
  setHeight(calculateHeight(element))
}

const hideBothAreas = () => {
  document.getElementById(outputId).style.display = 'none'
  document.getElementById(errorId).style.display = 'none'
}

const showErrorArea = () => {
  document.getElementById(outputId).style.display = 'none'
  document.getElementById(errorId).style.display = 'block'

  setOutputAndErrorHeight(errorId)
}

const showOutputArea = () => {
  document.getElementById(outputId).style.display = 'block'
  document.getElementById(errorId).style.display = 'none'

  setOutputAndErrorHeight(outputId)
}

const printStderr = (text: string, printEvenPyodideIsInitializing?: boolean) => {
  if (pyodideInitializing && !printEvenPyodideIsInitializing) {
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

const clearStderr = () => {
  document.getElementById(errorId).innerHTML = ''
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
  clearStderr()
  hideBothAreas()

  const code = getCode()

  try {
    // pyodide is imported by content/index.html
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    pyodide.runPython(code)
  } catch (err: any) {
    if (err instanceof Error) {
      printStderr(err.toString())
    }
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

  try {
    // pyodide is imported by content/index.html
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    pyodide = await loadPyodide({
      indexURL: getUrlPath() + 'common/pyodide/', // Pydiode does not handle .. as part of the path
      stdin: getInput,
      stdout: (text: string) => printStdout(text),
      stderr: (text: string) => printStderr(text),
    })
  } catch (error) {
    console.error('Error while initiating Pyodide', error)
    showErrorArea()
    printStderr(
      `Could not start the Python engine.
      \nTry closing the browser page and navigating back here.`,
      true
    )

    return
  }

  // pyodide is imported by content/index.html
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  pyodide.runPython("import js\ndef input(prompt=''):\n  return js.prompt(prompt)\n\n")

  // pyodide is imported by content/index.html
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  pyodide.loadPackage('numpy')

  setMonacoReadOnly(false)
  showOutputArea()
  pyodideInitializing = false
}

export const initializeProgrammingTab = () => {
  initializeMonacoEditor(codeEditorId)
  void initializePythonEngine()

  const executeButtons = Array.from(document.querySelectorAll(executeButtonSelector))
  executeButtons.forEach((element) => element.addEventListener('click', executeCode))

  const copyToClipboardButtons = Array.from(document.querySelectorAll(copyCodeToClipboardButtonSelector))
  copyToClipboardButtons.forEach((element) => element.addEventListener('click', copyCodeToClipboard))
}
