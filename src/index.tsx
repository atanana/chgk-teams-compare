import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import ResultsParser from './parse/ResultsParser';
import PapaWrapper from './parse/PapaWrapper';
import ComplexityCalculator from './calculate/ComplexityCalculator';

const parser = new ResultsParser(PapaWrapper);
const calculator = new ComplexityCalculator();

ReactDOM.render(
    <App parser={parser} complexityCalculator={calculator}/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
