import * as React from 'react';
import { TeamData } from '../data/ResultsData';
import { teamText } from '../utils/UiUtils';
import * as _ from 'lodash';

interface Props {
    teams: TeamData[];
}

// interface TourProps {
//     tours: Tour[];
// }
//
// const TourView = ({ tours }: TourProps) => (
//     <>
//     <tr key={`tour_${tour}`}>Тур {tour}</tr>
//     </>
// );

const TourComparison = ({ teams }: Props) => {
    const toursCount = teams[0].tours.length;
    return (
        <table className="table is-fullwidth is-hoverable is-striped">
            <thead>
            <th/>
            {
                teams.map(team => (
                    <th key={team.id}>{teamText(team)}</th>
                ))
            }
            </thead>
            <tbody>
            {
                _.range(toursCount)
                    .map(tour => (<tr key={`tour_${tour}`}>Тур {tour}</tr>))
            }
            </tbody>
        </table>
    );
};

export default TourComparison;