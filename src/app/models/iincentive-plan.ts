export interface IIncentivePlan {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    byUser: boolean;
    byRole: boolean;
    byTeam: boolean;
    destination: string;
}

export class IncentivePlan implements IIncentivePlan {

    constructor(id: number, data: IIncentivePlan) {
        this.id = id;
        this.name = data.name;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.byUser = data.byUser;
        this.byRole = data.byRole;
        this.byTeam = data.byTeam;
        this.destination = data.destination;
    }

    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    byUser: boolean;
    byRole: boolean;
    byTeam: boolean;
    destination: string;
}
