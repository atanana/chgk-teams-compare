import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TeamsSelect from './TeamsSelect';
import { TeamData } from '../data/ResultsData';
import ReactSelectClass from 'react-select';

const onTeamsSelect = jest.fn();

it('renders without crashing', () => {
    const component = renderer.create(<TeamsSelect selectedTeams={[]} onSelect={onTeamsSelect} teams={[]}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('shows correct teams options', () => {
    const teams = [
        new TeamData(123, 'test team 1', 'test city 1'),
        new TeamData(321, 'test team 2', 'test city 2')
    ];
    const teamsSelect = shallow(<TeamsSelect selectedTeams={[]} onSelect={onTeamsSelect} teams={teams}/>);
    const options = teamsSelect.find(ReactSelectClass).prop('options');
    expect(options).toEqual([
        { label: '123 test team 1(test city 1)', value: 123 },
        { label: '321 test team 2(test city 2)', value: 321 }
    ]);
});

it('pass selected teams', () => {
    const selectedTeams = [
        new TeamData(123, 'test team 1', 'test city 1'),
        new TeamData(321, 'test team 2', 'test city 2')
    ];
    const teamsSelect = shallow(<TeamsSelect selectedTeams={selectedTeams} onSelect={onTeamsSelect} teams={[]}/>);
    const value = teamsSelect.find(ReactSelectClass).prop('value');
    expect(value).toEqual([123, 321]);
});

it('select teams', () => {
    const teamsSelect = shallow(<TeamsSelect selectedTeams={[]} onSelect={onTeamsSelect} teams={[]}/>);
    let options = [
        { value: 123 },
        { value: 321 }
    ];
    teamsSelect.find(ReactSelectClass).simulate('change', options);
    expect(onTeamsSelect.mock.calls.length).toBe(1);
    expect(onTeamsSelect.mock.calls[0][0]).toEqual([123, 321]);
});