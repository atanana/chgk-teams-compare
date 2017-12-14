import { TeamData } from '../data/ResultsData';

export const teamText = (team: TeamData): string => `${team.name}(${team.city})`;