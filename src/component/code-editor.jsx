import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'

const CodeEditor = ({ initialValue, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = ({getValue,editor}) => {
    editorRef.current = editor; 
    // get db data
    console.log(editor.getValue());
    editor.onDidChangeModelContent(() => {
      console.log(getValue());
    })
  }

  return (
    <MonacoEditor
    onMount={handleEditorDidMount}
    value={initialValue}
    theme="vs-dark"
    language="javascript"
    height="200px"
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