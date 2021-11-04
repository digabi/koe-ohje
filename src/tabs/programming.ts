import './programming.css'
import 'skulpt/dist/skulpt'
import 'skulpt/dist/skulpt-stdlib'

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

const showError = (errorMessage: string) => {
  showErrorArea()
  document.getElementById(errorId).innerHTML = errorMessage
}

const executeStdout = (text: string) => {
  showOutputArea()
  var outputElement = document.getElementById(outputId)
  text = text.replace(/</g, '&lt;');
  outputElement.innerHTML = outputElement.innerHTML + text;
}

const executeCode = () => {
  var code = document.getElementById(codeEditorId).value
  var outputElement = document.getElementById(outputId)
  outputElement.innerHTML = ''

  console.log("foo")
  try {
    Sk.importMainWithBody("<stdin>", false, code)
  } catch (e) {
    showError(e)
  }
}

const builtinRead = (x) => {
  console.log(x)
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

const initializeSkupt = () => {
  Sk.configure({
    output: executeStdout
  })
  showOutputArea()
}

export const initializeProgrammingTab = () => {
  initializeSkupt()

  const executeButtons = Array.from(document.querySelectorAll('.code-editor-execute'))
  executeButtons.forEach((element) => element.addEventListener('click', executeCode))
}
