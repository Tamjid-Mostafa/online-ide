import './text-editor.css';
import React, { useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'

const TextEditor = () => {
  const ref = useRef(null);
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('# Header')

  useEffect(() => {
    const listener = (event) => {
      if (ref.current && event.target && ref.current.contains(event.target)) {
        console.log('element clicked on is inside editor');
        return
      }
      console.log('element clicked is not inside editor')
      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };

  }, [])

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    )
  }

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
      <MDEditor.Markdown source={value} />
      </div>
    </div>
  )
}

export default TextEditor