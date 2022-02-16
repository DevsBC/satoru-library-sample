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
        start: { readable: string, unix: number };
        end?: { readable: string, unix: number };
        duration?: number;
    }
}