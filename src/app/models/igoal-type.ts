export interface IGoalType {
    id: number;
    defaultTarget: string;
    agregation: string;
    condition: boolean;
    fieldCondition: string;
    valueCondition: string;
}

export class GoalType {
    constructor(id: number, data: IGoalType){
        this.id = id;
        this.defaultTarget = data.defaultTarget;
        this.agregation = data.agregation;
        this.condition = data.condition;
        this.fieldCondition = data.fieldCondition;
        this.valueCondition = data.valueCondition;
    }

    id: number;
    defaultTarget: string;
    agregation: string;
    condition: boolean;
    fieldCondition: string;
    valueCondition: string;
}
