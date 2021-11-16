import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution.js';

var editor
var lastCode = ""

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		return './editor.worker.bundle.js'
	}
}

export const getCode = () => {
  return editor.getValue()
}

export const initializeMonacoEditor = (codeEditorId) => {
  editor = monaco.editor.create(document.getElementById(codeEditorId), {
    automaticLayout: true,
  	language: 'python',
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    tabSize: 3,
    renderWhitespace: 'all',
		value: lastCode,
    wordWrap: 'on',
  })

	document.getElementById(codeEditorId).addEventListener('keyup', () => {
		lastCode = editor.getValue()
	})
}
