import React, { useEffect, useRef } from 'react'

const Preview = ({code}) => {

    const iframe = useRef();

    useEffect(() => {
        iframe.current.srcdoc = html;

        iframe.current.contentWindow.postMessage(code, '*')
      
    }, [code])
    

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                 window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                        console.error(err);
                    }
                  })
                </script>
            </body>
        </html>
    `

  return (
    <iframe
    title="Preview"
    ref={iframe}
    sandbox="allow-scripts"
    srcDoc={html}
    />
  )
}

export default Preview