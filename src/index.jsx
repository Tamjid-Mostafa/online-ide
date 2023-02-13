/* eslint-disable jsx-a11y/iframe-has-title */
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom'
import CodeCell from './component/code-cell';

const App = () => {

    return (
        <>
            <CodeCell />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);