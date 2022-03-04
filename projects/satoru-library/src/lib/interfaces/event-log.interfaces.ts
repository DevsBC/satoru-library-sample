import { IDate } from "./common.interfaces";

export interface IEventLog {
    name: string;
    count: number;
    creationDate: IDate;
    updateDate: IDate;
    origins: IOrigin[];
    values?: any;
    username: string;
    mode?: string;
    context?: string;
    message?: string;
}

export interface IEventData {
    name: string
    origin: IOrigin;
    username: string;
    value: any | null;
}
  
export interface IEventLogValue {
    id?: string;
    text?: string;
    [x: string]: any;
}
  
export interface IOrigin {
    section: string;
    os: string;
    geolocation: IGeolocation,
    count: number;
    timestamp: number;
    user?: any;
}
  
export interface IGeolocation {
    ip: string;
    country: string;
    regionName: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
    timezone: string;
    os?: string;
}
  