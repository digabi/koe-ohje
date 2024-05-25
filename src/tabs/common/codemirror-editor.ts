import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands'
import { python } from '@codemirror/lang-python'
  import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting
} from "@codemirror/language"
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { Compartment } from "@codemirror/state"
import {
  keymap,
  EditorView,
  highlightWhitespace,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars, drawSelection, dropCursor, highlightActiveLine
} from "@codemirror/view"


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
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      drawSelection(),
      dropCursor(),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...completionKeymap,
      ]),
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
