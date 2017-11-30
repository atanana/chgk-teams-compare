import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import ResultsParser from './parse/ResultsParser';

const Parser = jest.fn<ResultsParser>();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App parser={new Parser}/>, div);
});

it('renders no error', () => {
    const app = shallow(<App parser={new Parser}/>);
    const errors = app.find('.notification.is-danger');
    expect(errors).toHaveLength(0);
});

it('renders error', () => {
    const app = shallow(<App parser={new Parser}/>);
    app.setState({ error: 'test error' });
    const errors = app.find('.notification.is-danger');
    expect(errors).toHaveLength(1);
    expect(errors.text()).toEqual('test error :(');
});