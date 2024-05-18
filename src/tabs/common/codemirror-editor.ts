import { basicSetup } from 'codemirror'
import { keymap, EditorView, highlightWhitespace } from "@codemirror/view";
import { Compartment } from '@codemirror/state'
import { indentWithTab } from "@codemirror/commands"
import { indentUnit } from "@codemirror/language"

import { python } from '@codemirror/lang-python'

let codeMirrorEditor: EditorView
const editableCompartment = new Compartment()

const setLastCode = (code: string) => {
  if (window.localStorage) {
    window.localStorage.setItem('codemirror-editor-lastcode', code)
  }
}

const getLastCode = (): string => {
  if (window.localStorage && window.localStorage.getItem('codemirror-editor-lastcode')) {
    return window.localStorage.getItem('codemirror-editor-lastcode')
  }

  return ''
}

export const getCode = () => {
  return codeMirrorEditor?.state?.doc?.toString()
}

const setCode = (value: string) => {
  const docState = codeMirrorEditor.state
  const transaction = docState.update({
    changes: {
      from: 0,
      to: docState.doc.length,
      insert: value,
    },
    scrollIntoView: true,
  })
  codeMirrorEditor.dispatch(transaction)
}

export const setEditorReadOnly = (readOnly: boolean) => {
  codeMirrorEditor.dispatch({
    effects: editableCompartment.reconfigure(EditorView.editable.of(!readOnly)),
  })
}

export const setFocusToEditor = () => {
  codeMirrorEditor.focus()
}

export const initializeEditor = (codeEditorId: string, editorExitAction: () => boolean) => {
  codeMirrorEditor = new EditorView({
    doc: getLastCode(),
    extensions: [
      basicSetup,
      keymap.of([
        {
          key: 'Alt-x',
          run: editorExitAction,
        },
        {
          key: 'Alt-r',
          run: editorExitAction,
        },
        indentWithTab,
      ]),
      python(),
      EditorView.lineWrapping,
      editableCompartment.of(EditorView.editable.of(true)),
      indentUnit.of("   "),
      highlightWhitespace()
    ],
    parent: document.getElementById(codeEditorId),
  })

  document.getElementById(codeEditorId).addEventListener('keyup', () => {
    setLastCode(getCode())
  })

  document
    .getElementById('tab-programming-ide-container')
    .addEventListener('replaceEditorTextForTestingPurposes', (event: CustomEvent) => {
      setCode(event.detail.text)
    })
}
