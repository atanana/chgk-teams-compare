import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import ResultsParser from './parse/ResultsParser';
import PapaWrapper from './parse/PapaWrapper';

const parser = new ResultsParser(PapaWrapper);

ReactDOM.render(
    <App parser={parser}/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
