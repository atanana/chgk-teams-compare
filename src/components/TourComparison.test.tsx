import * as React from 'react';
import TourComparison from './TourComparison';
import * as renderer from 'react-test-renderer';
import { TeamData, Tour, TourComplexity } from '../data/ResultsData';

it('renders without crashing', () => {
    const team1 = new TeamData(1, 'test 1', 'test 1');
    team1.tours = [
        new Tour(1, [1, 0, 1, 0, 0, 1, 1]),
        new Tour(2, [1, 0, 1, 0, 0, 1, 1]),
        new Tour(3, [1, 0, 1, 0, 0, 1, 1])
    ];
    const team2 = new TeamData(2, 'test 2', 'test 2');
    team2.tours = [
        new Tour(1, [0, 0, 1, 1, 0, 0, 1]),
        new Tour(2, [0, 0, 1, 1, 0, 0, 1]),
        new Tour(3, [0, 0, 1, 1, 0, 0, 1])
    ];
    const answerComplexity = [
        new TourComplexity(1, [1, 0.22, 0, 0.33, 0.5, 0.65, 0.34]),
        new TourComplexity(2, [1, 0.22, 0, 0.33, 0.5, 0.65, 0.34]),
        new TourComplexity(3, [1, 0.22, 0, 0.33, 0.5, 0.65, 0.34]),
    ];
    const component = renderer.create(<TourComparison teams={[team1, team2]} answerComplexity={answerComplexity}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});