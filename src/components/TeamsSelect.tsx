import * as React from 'react';
import ReactSelectClass, { Option } from 'react-select';
import 'react-select/dist/react-select.css';
import { TeamData } from '../data/ResultsData';

const teamToOption = (data: TeamData): Option => {
    return {
        label: `${data.id} ${data.name}(${data.city})`,
        value: data.id
    };
};

const bindSelect = (onSelect: (selectedTeams: number[]) => void) => (options: Option<number>[]): void => {
    const selectedTeams = options.map<number>(option => option.value || 0); // todo flatmap
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