import './code-editor.css'
import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

const CodeEditor = ({ initialValue, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, getValue) => {
    editorRef.current = editor;
    // get db data
    console.log(editor.getValue());
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
    editor.getModel()?.updateOptions({ tabsize: 2 });
  }
  const onFormatClick = () => {
    console.log("object");
    // get current value from editor
    const unFormatted = editorRef.current.getValue()
    // format that value
    const formatted = prettier.format(unFormatted, {
      parser: 'babel',
      plugins: [parser],
      singleQuote: true,
      bracketSpacing: true,
      semi: true,
    }).replace(/\n$/, '')
    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  }

  return (
    <div className='editor-wrapper'>
      <button className='button button-format is-primary is-small' onClick={onFormatClick}>Format</button>
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
    </div>
  )
}

export default CodeEditor