import './programming.css'
import { runCode, setEngine, setOptions } from 'client-side-python-runner'

const codeEditorId = "code-editor"
const outputId = "code-output"
const errorId = "code-error"

const showErrorArea = () => {
  document.getElementById(outputId).style.display = 'none'
  document.getElementById(errorId).style.display = 'block'
}

const showOutputArea = () => {
  document.getElementById(outputId).style.display = 'block'
  document.getElementById(errorId).style.display = 'none'
}

const printStderr = (error: any) => {
  var text = "#"+error.lineNumber+": "+error.message+"\n\n"+error.error.message

  showErrorArea()
  var errorElement = document.getElementById(errorId).innerHTML = text
}

const printStdout = (text: string) => {
  showOutputArea()
  var outputElement = document.getElementById(outputId)
  text = text.replace(/</g, '&lt;');
  outputElement.innerHTML = outputElement.innerHTML + text;
}

const executeCode = async() => {
  var code = document.getElementById(codeEditorId).value
  var outputElement = document.getElementById(outputId)
  outputElement.innerHTML = ''

  await runCode(code)
}

const initializePythonEngine = async() => {
  setOptions({
    output: printStdout, // Output from print(...)-functions
    error: printStderr, // Throws an exception unless this is set to a function
    input: prompt, // How to feed the input(...)-function
    pythonVersion: 3, // Preferred version
    loadVariablesBeforeRun: false,
    storeVariablesAfterRun: false,
    onLoading: (engine) => {},
    onLoaded: (engine) => {},
  });

  setEngine('pyodide')
}

export const initializeProgrammingTab = () => {
  initializePythonEngine()

  const executeButtons = Array.from(document.querySelectorAll('.code-editor-execute'))
  executeButtons.forEach((element) => element.addEventListener('click', executeCode))

  showOutputArea()
}
