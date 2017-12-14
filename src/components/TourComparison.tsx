import * as React from 'react';
import { TeamData } from '../data/ResultsData';
import { teamText } from '../utils/UiUtils';

interface Props {
    teams: TeamData[];
}

const TourComparison = ({ teams }: Props) => (
    <table className="table is-fullwidth is-hoverable is-striped">
        <thead>
        <th/>
        {
            teams.map(team => (
                <th>{teamText(team)}</th>
            ))
        }
        </thead>
    </table>
);

export default TourComparison;