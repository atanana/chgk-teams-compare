import * as React from 'react';
import ReactSelectClass, { Option } from 'react-select';
import 'react-select/dist/react-select.css';
import { TeamData } from '../data/ResultsData';

const teamToOption = (data: TeamData): Option => {
    return {
        label: `${data.name}(${data.city})`,
        value: data.id
    };
};

const TeamsSelect = ({ teams }: { teams: TeamData[] }) => (
    <div>
        <ReactSelectClass options={teams.map(teamToOption)}/>
    </div>
);

export default TeamsSelect;