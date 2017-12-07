import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import ResultsParser from './parse/ResultsParser';
import { TeamData } from './data/ResultsData';
import Uploader from './components/Uploader';

const Parser = jest.fn<ResultsParser>();

const FileMock = jest.fn<File>();

const TeamsDataMock = jest.fn<TeamData[]>();

const createFileListMock = (file: File) => {
    const Clazz = jest.fn<FileList>(() => ({
        0: file,
        length: 1
    }));
    return new Clazz;
};

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

it('saves parsed teams', done => {
    const fileMock = new FileMock;
    const teamsData = new TeamsDataMock;
    const CustomParser = jest.fn<ResultsParser>(() => ({
        parse(file: File): Promise<TeamData[]> {
            return file === fileMock ? Promise.resolve(teamsData) : Promise.reject(new Error());
        }
    }));
    const app = shallow(<App parser={new CustomParser}/>);
    app.find(Uploader).prop('onFileSelected')(createFileListMock(fileMock));
    setImmediate(() => {
        expect(app.state('teams')).toBe(teamsData);
        done();
    });
});

it('saves parser error', done => {
    const fileMock = new FileMock;
    const CustomParser = jest.fn<ResultsParser>(() => ({
        parse(): Promise<TeamData[]> {
            return Promise.reject(new Error());
        }
    }));
    const app = shallow(<App parser={new CustomParser}/>);
    app.find(Uploader).prop('onFileSelected')(createFileListMock(fileMock));
    setImmediate(() => {
        expect(app.state('error')).toBe('Не получилось прочитать файл');
        done();
    });
});