import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import ResultsParser from './parse/ResultsParser';
import { TeamData } from './data/ResultsData';
import Uploader from './components/Uploader';
import TeamsSelect from './components/TeamsSelect';
import TourComparison from './components/TourComparison';

const Parser = jest.fn<ResultsParser>();

const FileMock = jest.fn<File>();

const createFileListMock = (file: File) => {
    const Clazz = jest.fn<FileList>(() => ({
        0: file,
        length: 1
    }));
    return new Clazz;
};

function createApp(parser: ResultsParser = new Parser) {
    return shallow(<App parser={parser}/>);
}

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App parser={new Parser}/>, div);
});

it('renders no error', () => {
    const app = createApp();
    const errors = app.find('.notification.is-danger');
    expect(errors).toHaveLength(0);
});

it('renders error', () => {
    const app = createApp();
    app.setState({error: 'test error'});
    const errors = app.find('.notification.is-danger');
    expect(errors).toHaveLength(1);
    expect(errors.text()).toEqual('test error :(');
});

it('saves parsed teams', done => {
    const fileMock = new FileMock;
    const teamsData = [
        new TeamData(1, 'test', 'test')
    ];
    const CustomParser = jest.fn<ResultsParser>(() => ({
        parse(file: File): Promise<TeamData[]> {
            return file === fileMock ? Promise.resolve(teamsData) : Promise.reject(new Error());
        }
    }));
    const app = createApp(new CustomParser);
    app.find(Uploader).prop('onFileSelected')(createFileListMock(fileMock));
    setImmediate(() => {
        expect(app.state('teams')).toEqual(teamsData);
        done();
    });
});

it('sorts teams', done => {
    const fileMock = new FileMock;
    const teamsData = [
        new TeamData(1, 'c', 'c'),
        new TeamData(2, 'b', 'b'),
        new TeamData(3, 'b', 'a')
    ];
    const CustomParser = jest.fn<ResultsParser>(() => ({
        parse(): Promise<TeamData[]> {
            return Promise.resolve(teamsData);
        }
    }));
    const app = createApp(new CustomParser);
    app.find(Uploader).prop('onFileSelected')(createFileListMock(fileMock));
    setImmediate(() => {
        expect(app.state('teams')).toEqual([
            teamsData[2],
            teamsData[1],
            teamsData[0]
        ]);
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
    const app = createApp(new CustomParser);
    app.find(Uploader).prop('onFileSelected')(createFileListMock(fileMock));
    setImmediate(() => {
        expect(app.state('error')).toBe('Не получилось прочитать файл');
        done();
    });
});

it('not show team selector when no teams', () => {
    const app = createApp();
    expect(app.find(TeamsSelect).exists()).toBe(false);
});

it('show team selector when has teams', () => {
    const app = createApp();
    const teams = [new TeamData(1, 'test', 'test')];
    app.setState({teams});
    expect(app.find(TeamsSelect).exists()).toBe(true);
});

it('pass selected teams', () => {
    const app = createApp();
    const selectedTeams = [new TeamData(1, 'test', 'test')];
    app.setState({teams: selectedTeams, selectedTeams});
    expect(app.find(TeamsSelect).prop('selectedTeams')).toBe(selectedTeams);
});

it('select teams', () => {
    const app = createApp();
    const teams = [
        new TeamData(1, 'test 1', 'test 1'),
        new TeamData(2, 'test 2', 'test 2')
    ];
    app.setState({teams});
    app.find(TeamsSelect).prop('onSelect')([2]);
    expect(app.state('selectedTeams')).toEqual([teams[1]]);
});

it('not render teams compare when no selected teams', done => {
    const app = createApp();
    const teams = [
        new TeamData(1, 'test 1', 'test 1'),
        new TeamData(2, 'test 2', 'test 2')
    ];
    app.setState({teams});
    setImmediate(() => {
        expect(app.find(TourComparison)).toHaveLength(0);
        done();
    });
});

it('pass selected teams for compare', done => {
    const app = createApp();
    const teams = [
        new TeamData(1, 'test 1', 'test 1'),
        new TeamData(2, 'test 2', 'test 2')
    ];
    app.setState({teams});
    app.setState({selectedTeams: teams});
    setImmediate(() => {
        expect(app.find(TourComparison).prop('teams')).toEqual(teams);
        done();
    });
});