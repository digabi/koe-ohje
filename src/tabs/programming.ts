import './programming.css'
import { getCode, initializeMonacoEditor, setFocusToMonacoEditor, setMonacoReadOnly } from './common/monaco-editor'
import { setCodeOutputToClipboard, setCodeToClipboard } from './common/clipboard'
import { screenReaderTalkPolite } from './common/screenreader'
import { getCurrentLanguage, Language } from './common/language'

const codeEditorWrapperId = 'tab-programming-editor-wrapper'
const codeExecutionResultId = 'tab-programming-execution-result'
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
  const element = document.getElementById(elementId)
  const setHeight = (newHeight: number) => {
    if (element) {
      element.style.height = `{newHeight}px`
    }
  }

  setHeight(0)
  setHeight(calculateHeight(element))
}

const hideBothAreas = () => {
  const outputElement = document.getElementById(outputId)
  const errorElement = document.getElementById(errorId)
  if (outputElement) {
    outputElement.style.display = 'none'
  }
  if (errorElement) {
    errorElement.style.display = 'none'
  }
}

const showErrorArea = () => {
  const outputElement = document.getElementById(outputId)
  const errorElement = document.getElementById(errorId)
  if (outputElement) {
    outputElement.style.display = 'none'
  }
  if (errorElement) {
    errorElement.style.display = 'block'
  }
  setOutputAndErrorHeight(errorId)
}

const showOutputArea = () => {
  const outputElement = document.getElementById(outputId)
  const errorElement = document.getElementById(errorId)
  if (outputElement) {
    outputElement.style.display = 'block'
  }
  if (errorElement) {
    errorElement.style.display = 'none'
  }
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

const getInput = (): string => prompt('Enter input string')

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
  outputElement.innerHTML = `${outputElement.innerHTML + text}\n`
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

  focusOutputOrError()
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
      indexURL: `${getUrlPath()}common/pyodide/`, // Pydiode does not handle .. as part of the path
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
      true,
    )

    return
  }

  // pyodide is imported by content/index.html
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await pyodide.loadPackage('numpy')

  // pyodide is imported by content/index.html
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  pyodide.runPython("import js\ndef input(prompt=''):\n  return js.prompt(prompt)\n\n")

  setMonacoReadOnly(false)
  showOutputArea()
  pyodideInitializing = false
}

const focusButtonExecuteCode = () => {
  const el = document.getElementById('tab-programming-execute-code')
  el.focus()
}

const focusButtonCopyCode = () => {
  const el = document.getElementById('tab-programming-copy-code')
  el.focus()
}

const focusOutputOrError = () => {
  const el = document.getElementById('tab-programming-execution-result')
  el.focus()
}

const processAccessibilityKeybindings = (event: KeyboardEvent) => {
  if (event.code == 'KeyE' && event.altKey) {
    event.preventDefault()
    setFocusToMonacoEditor()
    return
  }

  if (event.code == 'KeyR' && event.altKey) {
    event.preventDefault()
    focusButtonExecuteCode()
    return
  }

  if (event.code === 'KeyC' && event.altKey) {
    event.preventDefault()
    focusButtonCopyCode()
    return
  }

  if (event.code === 'Enter') {
    const el = event.target as HTMLElement
    if (el.className === 'code-clickable') {
      setCodeToClipboard(el.innerText)
      return
    }
    if (['code-output', 'code-error'].includes(el.id)) {
      setCodeOutputToClipboard(el.innerText)
      return
    }
    if (el.nodeName === 'BODY') {
      switch (getCurrentLanguage()) {
        case Language.finnish: {
          screenReaderTalkPolite('Et ole koodialueella. Paina Tab tai Shift + Tab siirtyäksesi koodialueelle.')
          break
        }
        case Language.swedish: {
          screenReaderTalkPolite(
            'Ni är inte på kodområdet. Tryck på Tab eller Shift + Tab för att byta till kodområdet.',
          )
          break
        }
      }
    }
  }
}

export const initializeProgrammingTab = () => {
  const monacoExitAction = (actionType: string) => {
    focusButtonExecuteCode()
  }

  initializeMonacoEditor(codeEditorId, monacoExitAction)
  void initializePythonEngine()

  const executeButtons = Array.from(document.querySelectorAll(executeButtonSelector))
  executeButtons.forEach((element) => element.addEventListener('click', executeCode))

  const copyToClipboardButtons = Array.from(document.querySelectorAll(copyCodeToClipboardButtonSelector))
  copyToClipboardButtons.forEach((element) => element.addEventListener('click', copyCodeToClipboard))

  document.addEventListener('keydown', processAccessibilityKeybindings)
}

export const teardownProgrammingTab = () => {
  document.removeEventListener('keydown', processAccessibilityKeybindings)
}
