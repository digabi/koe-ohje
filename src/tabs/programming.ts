import './programming.css'
import { initializeMonacoEditor, getCode, setMonacoReadOnly, setFocusToMonacoEditor } from './common/monaco-editor'
import { setCodeToClipboard, setCodeOutputToClipboard } from './common/clipboard'
import { screenReaderTalkPolite } from './common/screenreader'
import { getCurrentLanguage } from './common/language'

const codeEditorWrapperId = 'tab-programming-editor-wrapper'
const codeExecutionResultId = 'tab-programming-execution-result'
const codeEditorId = 'code-editor'
const outputId = 'code-output'
const addErrorId = 'code-error'
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

const codeErrorColor = 'red'
const codeInputColor = 'blue'

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

const resetOutput = () => {
  const outputElement = document.getElementById(outputId)
  outputElement.classList.remove(addErrorId)
  outputElement.innerHTML = ''
}

const hideOutput = () => {
  document.getElementById(outputId).style.display = 'none'
}

const showOutput = () => {
  document.getElementById(outputId).style.display = 'block'
  setOutputAndErrorHeight(outputId)
}

const changeOutputToError = () => {
  document.getElementById(outputId).classList.add(addErrorId)
}

const printOutput = (text: string, color?: string, printEvenPyodideIsInitializing?: boolean) => {
  if (pyodideInitializing && !printEvenPyodideIsInitializing) {
    return
  }

  showOutput()
  const outputElement = document.getElementById(outputId)
  text = text.replace(/</g, '&lt;')

  if (color) {
    text = "<span style='color:" + color + "'>" + text + "</span>"
  }

  outputElement.innerHTML = `${outputElement.innerHTML + text}\n`
}

const printStderr = (text: string, printEvenPyodideIsInitializing?: boolean) => {
  text = removeBoilerplateErrorstrings(text)
  printOutput(text, codeErrorColor, printEvenPyodideIsInitializing)
  changeOutputToError()
}

const printStdout = (text: string) => printOutput(text)

const digabiPythonModule = {
  input: (text: string = '') => {
    const inputText = prompt(text)

    if (inputText == null) {
      throw 'Input operation cancelled.'
    }

    printOutput(text + inputText, codeInputColor)
    // TODO: raise auditing events for input as defined in https://docs.python.org/3/library/functions.html#input
    return inputText
  }
}

const removeBoilerplateErrorstrings = (text: string): string => {
  boilerplateErrorstrings.forEach((replaceError) => {
    const re = new RegExp(replaceError.errorString)
    text = text.replace(re, replaceError.replaceWith)
  })

  return text
}

const executeCode = () => {
  resetOutput()
  hideOutput()

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
    showOutput()
    return
  }

  setMonacoReadOnly(true)
  hideOutput()
  pyodideInitializing = true

  try {
    // pyodide is imported by content/index.html
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    pyodide = await loadPyodide({
      indexURL: `${getUrlPath()}common/pyodide/`, // Pydiode does not handle .. as part of the path
      stdin: () => prompt('Enter input string'), // This should very rarely run since we override the builtin input function
      stdout: (text: string) => printStdout(text),
      stderr: (text: string) => printStderr(text),
    })
  } catch (error) {
    console.error('Error while initiating Pyodide', error)
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
  pyodide.registerJsModule('digabi', digabiPythonModule)

  // pyodide is imported by content/index.html
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  pyodide.runPython('from digabi import input\n__builtins__.input = input') // Load our custom javascript input function and override it as builtin.

  setMonacoReadOnly(false)
  showOutput()
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
    if (['code-output'].includes(el.id)) {
      setCodeOutputToClipboard(el.innerText)
      return
    }
    if (el.nodeName === 'BODY') {
      switch (getCurrentLanguage()) {
        case 'fi': {
          screenReaderTalkPolite('Et ole koodialueella. Paina Tab tai Shift + Tab siirtyäksesi koodialueelle.')
          break
        }
        case 'sv': {
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
