import React, { useEffect, useState } from 'react'
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './Preview';
import Resizable from './resizable';

const CodeCell = () => {
    // const ref = useRef();
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    // const startService = async () => {
    //     ref.current = 
    // };


    // useEffect(() => {
    //     startService();
    // }, []);


    useEffect(() => {
      const timer = setTimeout(async() => {
        const output = await bundle(input)
        setCode(output);
      }, 750)
      return () => {
        clearTimeout(timer);
      }
    }, [input])
    

    // const onClick = async () => {
    //     if (!ref.current) {
    //         return;
    //     }


    //     const result = 
    //     const output = await bundle(input)
    //     setCode(output);


    // };



    return (
        <Resizable direction="verticle">
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Resizable
                direction="horizontal"
                >
                    <CodeEditor

                        initialValue={'const a = 1;'}
                        onChange={(value) => {
                            setInput(value);
                        }}
                    />
                </Resizable>

                <Preview code={code} />
            </div>
        </Resizable>
    )

}

export default CodeCell