import * as React from 'react';
import ReactSelectClass, { Option } from 'react-select';
import 'react-select/dist/react-select.css';
import { TeamData } from '../data/ResultsData';
import * as _ from 'lodash';
import { teamText } from '../utils/UiUtils';

const teamToOption = (data: TeamData): Option => {
    return {
        label: teamText(data),
        value: data.id
    };
};

const bindSelect = (onSelect: (selectedTeams: number[]) => void) => (options: Option<number>[]): void => {
    const selectedTeams = _.flatMap<Option<number>, number>(options, option => {
        if (option.value) {
            return [option.value];
        } else {
            return [];
        }
    });
    onSelect(selectedTeams);
};

interface Props {
    teams: TeamData[];
    onSelect: (selectedTeams: number[]) => void;
    selectedTeams: TeamData[];
}

const TeamsSelect = ({ teams, onSelect, selectedTeams }: Props) => (
    <div>
        <ReactSelectClass
            multi={true}
            options={teams.map(teamToOption)}
            onChange={bindSelect(onSelect)}
            value={selectedTeams.map(team => team.id)}
        />
    </div>
);

export default TeamsSelect;