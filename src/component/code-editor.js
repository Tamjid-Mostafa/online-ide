import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import './code-editor.css'



const CodeEditor = ({ initialValue, onChange }) => {
  const editorRef = useRef(null);
  console.log(editorRef)
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const onEditorDidMount = (getValue, monacoEditor) => {
    // get db data
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    


   
  }
  function handleChange(value, event) {
    onChange(value);
  }
  function showValue() {
    alert(editorRef.current.getValue());
    console.log(editorRef.current.getValue())
  }
  const onFormatClick = () => {
    console.log("object");
    // get current value from editor
    const unFormatted = editorRef.current.getModel().getValue()
    // format that value
    const formatted = prettier.format(unFormatted, {
      parser: 'babel',
      plugins: [parser],
      singleQuote: true,
      bracketSpacing: true,
      useTabs: false,
      semi: true,  
    }).replace(/\n$/, '');
    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  }

  return (
   <div className="editor-wrapper">
    <button
    className="button button-format is-primary is-small"
    onClick={onFormatClick}>Format</button>
     <MonacoEditor
    theme="vs-dark"
    height="500px"
    options={{
      wordWrap: "on",
      minimap: { enabled: false },
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
    }}
    onChange={handleChange}
    language="javascript"
    defaultValue={initialValue}
    onMount={handleEditorDidMount}
    
    />
   </div>
  )
}

export default CodeEditor