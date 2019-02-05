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

    constructor(id: number, data: any) {
        this.id = id;
        this.name = data.name;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.destination = data.destination;
        this.onChange(data.by);
    }

    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    byUser: boolean;
    byRole: boolean;
    byTeam: boolean;
    destination: string;

    onChange(e: number) {
        switch (Number(e)) {
          case 1:
            this.byUser = true;
            this.byRole = false;
            this.byTeam = false;
            break;
          case 2:
            this.byUser = false;
            this.byRole = true;
            this.byTeam = false;
            break;
          case 3:
            this.byUser = false;
            this.byRole = false;
            this.byTeam = true;
            break;
          default:
            break;
        }
      }
}
