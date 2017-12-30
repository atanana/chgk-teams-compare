import { TeamData, TourComplexity } from '../data/ResultsData';

export default class ComplexityCalculator {
    calculate(teams: TeamData[]): TourComplexity[] {
        if (teams.length > 0) {
            const tours = teams[0].tours;
            return tours.map((tour, i) => {
                const answerComplexity = tour.answers.map((_, j) => {
                    const answers = teams.map(team => team.tours[i].answers[j]);
                    const rightAnswers = answers.filter(answer => answer === 1);
                    return +(1 - rightAnswers.length / answers.length).toFixed(4);
                });
                return new TourComplexity(tour.tour, answerComplexity);
            });
        } else {
            return [];
        }
    }
}