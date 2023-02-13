import React from 'react'
import MonacoEditor from '@monaco-editor/react'

const CodeEditor = ({ initialValue, onChange }) => {

  const onEditorDidMount = (getValue, monacoEditor) => {
    // get db data
    monacoEditor.onDidChangeModelContent(() => {
      console.log(getValue());
    })
  }

  return (
    <MonacoEditor
    editorDidMount={onEditorDidMount}
    value={initialValue}
    theme="vs-dark"
    language="javascript"
    height="500px"
    options={{
      wordWrap: 'on',
      showUnused: false,
      folding: false,
      lineNumbersMinChards: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,

    }}
    
    />
  )
}

export default CodeEditor