/* eslint-disable jsx-a11y/iframe-has-title */
import 'bulmaswatch/superhero/bulmaswatch.min.css';

import { useRef } from "react";
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import CodeEditor from "./component/code-editor";
import Preview from './component/Preview';
import bundle from './bundler'


const App = () => {
    const ref = useRef();
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    // const startService = async () => {
    //     ref.current = 
    // };


    // useEffect(() => {
    //     startService();
    // }, []);

    const onClick = async () => {
        // if (!ref.current) {
        //     return;
        // }

   
        // const result = 
        const output = await bundle(input)
        setCode(output);
        

    };

    

    return <div>
        <CodeEditor
        
        initialValue={'const a = 1;'}
        onChange={(value) => {
            setInput(value);
        }}
        />
        
        <div>
            <button onClick={onClick}>
                Submit
            </button>
        </div>
        <Preview code={code} />
    </div>
}

ReactDOM.render(
    <App />, document.querySelector('#root')
);