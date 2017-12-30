import ComplexityCalculator from './ComplexityCalculator';
import { TeamData, Tour, TourComplexity } from '../data/ResultsData';

const calculator = new ComplexityCalculator();

it('should return empty results on no teams', () => {
    expect(calculator.calculate([])).toHaveLength(0);
});

it('should calculate answer complexity', () => {
    const team1 = new TeamData(1, 'name 1', 'city 1');
    team1.tours = [
        new Tour(1, [0, 1]),
        new Tour(2, [0, 1])
    ];
    const team2 = new TeamData(2, 'name 2', 'city 2');
    team2.tours = [
        new Tour(1, [0, 1]),
        new Tour(2, [1, 0])
    ];
    const team3 = new TeamData(3, 'name 3', 'city 3');
    team3.tours = [
        new Tour(1, [0, 1]),
        new Tour(2, [0, 1])
    ];

    expect(calculator.calculate([team1, team2, team3])).toEqual([
        new TourComplexity(1, [1, 0]),
        new TourComplexity(2, [+(2 / 3).toFixed(2), +(1 / 3).toFixed(2)])
    ]);
});