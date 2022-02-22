import { IDate } from "./common.interfaces";

export interface ITask {
    id: string;
    description: string;
    user?: {
        name: string;
        job: string;
        email?: string;
        phone?: string;
    };
    projectName?: string;
    tags?: string[];
    billable: boolean;
    amount?: number;
    timeInterval: {
        start: IDate;
        end?: IDate;
        duration?: number;
    }
}