import * as React from 'react';
import { Fragment } from 'react';
import { TeamData, Tour } from '../data/ResultsData';
import { teamText } from '../utils/UiUtils';

import * as _ from 'lodash';

interface ComponentProps {
    teams: TeamData[];
}

interface TourProps {
    tours: Tour[];
}

interface AnswersProps {
    answers: number[];
    keyPrefix: string;
}

const AnswersRow = ({answers, keyPrefix}: AnswersProps) => (
    <>
    {
        answers.map((answer, i) => (
            <td key={`${keyPrefix}_${i}`}>{answer}</td>
        ))
    }
    </>
);

const TourView = ({tours}: TourProps) => {
    const tour = tours[0].tour;
    const answers = tours[0].answers.length;
    return (
        <>
        <tr>
            <td colSpan={100} className="has-text-centered">Тур {tour}</td>
        </tr>
        {
            _.range(answers)
                .map(answer => (
                    <Fragment key={`answer_${tour}_${answer}`}>
                        <tr>
                            <td>{answer + 1}</td>
                            <AnswersRow
                                keyPrefix={`answer_${tour}_${answer}`}
                                answers={tours.map(item => item.answers[answer])}
                            />
                        </tr>
                    </Fragment>
                ))
        }
        </>
    );
};

const TourComparison = ({teams}: ComponentProps) => {
    const toursCount = teams[0].tours.length;
    return (
        <table className="table is-fullwidth is-hoverable is-striped">
            <thead>
            <tr>
                <th/>
                {
                    teams.map(team => (
                        <th key={team.id}>
                            <abbr title={teamText(team)}>{team.name}</abbr>
                        </th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                _.range(toursCount)
                    .map(tour => (
                        <TourView key={`tour_${tour}`} tours={teams.map(team => team.tours[tour])}/>
                    ))
            }
            </tbody>
        </table>
    );
};

export default TourComparison;