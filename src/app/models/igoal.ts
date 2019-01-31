export interface IGoal {
    id: number;
    goalTypeId: number;
    name: string;
    user: number;
}

export class Goal {
    constructor(id: number, data: IGoal) {
        this.id = id;
        this.goalTypeId = data.goalTypeId;
        this.name = data.name;
        this.user = data.user;
    }

    id: number;
    goalTypeId: number;
    name: string;
    user: number;
}
