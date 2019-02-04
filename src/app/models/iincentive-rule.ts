export interface IIncentiveRule {
    id: number;
    name: string;
    condition: string;
    incentivePlanId: number;
}

export class IncentiveRule implements IIncentiveRule {

    constructor(id: number, data: IIncentiveRule) {
        this.id = id;
        this.name = data.name;
        this.condition = data.condition;
        this.incentivePlanId = data.incentivePlanId;
    }

    id: number;    
    name: string;
    condition: string;
    incentivePlanId: number;
} 
