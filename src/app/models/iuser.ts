export interface IUser {
    name: string;
    id: number;
    lastName: string;
    role: number;
    email: string;
    phone: string;
    manager: number;
    employmentDate: Date;
    sendEmails: boolean;
    team: number;
    password: string;
}

export class User {

    constructor(id: number, data: IUser) {
        this.name = data.name;
        this.id = id;
        this.lastName = data.lastName;
        this.role = data.role;
        this.email = data.email;
        this.phone = data.phone;
        this.manager = data.manager;
        this.employmentDate = data.employmentDate;
        this.sendEmails = data.sendEmails;
        this.team = data.team;
        this.password = data.password;    
    }
    name: string;
    id: number;
    lastName: string;
    role: number;
    email: string;
    phone: string;
    manager: number;
    employmentDate: Date;
    sendEmails: boolean;
    team: number;
    password: string;
}
