export class Tour {
    tour: number;
    answers: number[];

    constructor(tour: number, answers: number[]) {
        this.tour = tour;
        this.answers = answers;
    }
}

export class TeamData {
    id: number;
    name: string;
    city: string;
    tours: Tour[];

    constructor(id: number, name: string, city: string) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.tours = [];
    }
}