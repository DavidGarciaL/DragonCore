export interface IReport {
    id: number;
    schemas: string;
    fields: string;
    filters: string;
}

export class Report {
    constructor(id: number, data: IReport) {
        this.id = id;
        this.schemas = data.schemas;
        this.fields = data.fields;
        this.filters = data.filters;
    }

    id: number;
    schemas: string;
    fields: string;
    filters: string;
}
