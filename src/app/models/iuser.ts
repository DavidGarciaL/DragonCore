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
