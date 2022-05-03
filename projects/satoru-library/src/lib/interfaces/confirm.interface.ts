export interface Confirm {
    title: string;
    subtitle?: string;
    message?: string;
    confirmText: string;
    cancelText: string;
    extra?: {
        text: string;
        callback: any;
    };
}