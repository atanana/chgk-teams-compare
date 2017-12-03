import { PapaWrapper } from './PapaWrapper';
import { TeamData, Tour } from '../data/ResultsData';

export default class ResultsParser {
    wrapper: PapaWrapper;

    constructor(wrapper: PapaWrapper) {
        this.wrapper = wrapper;
    }

    parse(file: File): Promise<TeamData[]> {
        return this.wrapper.parseFile(file)
            .then(result => {
                if (!result.errors.length) {
                    return this.processData(result.data);
                } else {
                    throw new Error();
                }
            });
    }

    private processData(data: Array<{}>): TeamData[] {
        const result: Map<number, TeamData> = new Map();
        (data
            .map(this.parseTour)
            .filter(row => row != null) as [number, string, string, Tour][])
            .forEach(row => {
                const [teamId, teamName, teamCity, tour] = row;

                let teamData: TeamData;
                if (result.has(teamId)) {
                    teamData = result.get(teamId) as TeamData;
                } else {
                    teamData = new TeamData(teamId, teamName, teamCity);
                    result.set(teamId, teamData);
                }

                teamData.tours[tour.tour - 1] = tour;
            });

        return Array.from(result.values());
    }

    // noinspection JSMethodCanBeStatic
    private parseTour(data: {}[]): [number, string, string, Tour] | null {
        const [rawId, name, city, tourNumber, ...answers] = data;
        const teamId = +rawId;
        if (isNaN(teamId)) {
            return null;
        } else {
            const tour2 = new Tour(+tourNumber, answers.map(answer => +answer));
            return [teamId, name.toString(), city.toString(), tour2];
        }
    }
}