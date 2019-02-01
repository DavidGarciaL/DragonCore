export interface ITeam {
    id: number;
    name: string;
    teamLeader: number;
}

export class Team implements ITeam {
    constructor(id: number, data: ITeam) {
        this.id = id;
        this.name = data.name;
        this.teamLeader = data.teamLeader;
    }

    id: number;    
    name: string;
    teamLeader: number;
}
