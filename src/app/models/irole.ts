export interface IRole {
    name: string;
    id: number;
}

export class Role {
    constructor(id: number, data: IRole) {
        this.id = id;
        this.name = data.name;
    }

    id: number;
    name: string;
}