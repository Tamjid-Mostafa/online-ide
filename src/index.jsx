/* eslint-disable jsx-a11y/iframe-has-title */
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import TextEditor from './component/text-editor';
// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const App = () => {

    return (
        <>
            <TextEditor />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))

