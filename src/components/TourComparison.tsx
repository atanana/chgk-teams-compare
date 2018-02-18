import * as React from 'react';
import { Fragment } from 'react';
import { TeamData, Tour, TourComplexity } from '../data/ResultsData';
import { teamText } from '../utils/UiUtils';

import * as _ from 'lodash';

interface ComponentProps {
    teams: TeamData[];
    answerComplexity: TourComplexity[];
}

interface TourProps {
    tours: Tour[];
    tourComplexity: TourComplexity;
}

interface AnswersProps {
    answers: number[];
    keyPrefix: string;
}

const AnswersRow = ({answers, keyPrefix}: AnswersProps) => (
    <>
        {
            answers.map((answer, i) => (
                <td key={`${keyPrefix}_${i}`}>
                <span className={`tag is-rounded ${answer === 1 ? 'is-success' : 'is-danger'}`}>
                    <i className={`fa ${answer === 1 ? 'fa-check-circle-o' : 'fa-times-circle-o'}`}/>
                </span>
                </td>
            ))
        }
    </>
);

const TourView = ({tours, tourComplexity}: TourProps) => {
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
                                <td>
                                    {answer + 1 + answers * (tour - 1)}
                                    <span className="has-text-grey is-size-7 ml">
                                        {answer + 1}
                                    </span>
                                </td>
                                <td>{(tourComplexity.answersComplexity[answer] * 100).toFixed(2) + '%'}</td>
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

const TourComparison = ({teams, answerComplexity}: ComponentProps) => {
    const toursCount = teams[0].tours.length;
    return (
        <table className="table is-fullwidth is-hoverable is-striped">
            <thead>
            <tr>
                <th/>
                <th><abbr title="100% - (количество взявших вопрос команд)">Сложность</abbr></th>
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
                        <TourView
                            key={`tour_${tour}`}
                            tours={teams.map(team => team.tours[tour])}
                            tourComplexity={answerComplexity[tour]}
                        />
                    ))
            }
            </tbody>
        </table>
    );
};

export default TourComparison;