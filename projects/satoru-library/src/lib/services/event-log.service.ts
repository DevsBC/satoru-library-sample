import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEventData, IEventLogValue, IGeolocation } from '../interfaces/event-log.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  private name = this.env.geolocationId || 'tr_id_sat_oru';
  private key = this.env.geolocationKey || '';
  private geolocation!: IGeolocation;

  constructor(@Inject('environment') private env: any, private http: HttpClient) { 
    const reveal = (data: string) => JSON.parse(atob(data));
    if (sessionStorage.getItem(this.name)) {
      this.geolocation = reveal(sessionStorage.getItem(this.name)!);
    } else {
      this.getIp().subscribe({
        next:  (res: any) => this.handleResponse(res,false),
        error: (e) => this.handleResponse(null, false),
      });
    }
  }

  public getIp() {
    if (!this.key) {
      throw new Error('Geolocation key is not defined qliao: missing freegeoip apikey');
    }
    return this.http.get(`https://api.freegeoip.app/json/?apikey=${this.key}`);
  }

  /**
   * @description Retorna o envia un objeto para ser procesado como un registro de evento
   * @param eventName indica el nombre del evento
   * @example SESSION_STARTED
   * @param value objeto a ser agregado a propiedad values (ver @interface IEventLog)
   * @example {id: 'HidUWwnKIUY0q5BUVD4X', email: 'email@example.com', role: 'customer_cat_5' }
   * @param endpoint URL POST donde el objeto sera procesado (Body { eventData })
   * @example https://myamazingserver.com/events/save
   * @param section Seccion de la app donde se dispara el evento
   * @example MAIN_HOME_PAGE
   * @param username Usuario que dispara el evento (aplica para usuarios autenticados)
   * @example satoru || satoru@company.com || Satoru Aranda
   * @returns @instance IEventData || Observable<any>
  */
  public init(eventName: string, value?: IEventLogValue | null, section?: string, username = 'unknown', endpoint?: string) {
    section = section || eventName.toLowerCase();
    const eventData: IEventData = {
      name: eventName,
      origin: this.getOrigin(section),
      username,
      value
    };
    return endpoint ? this.http.post<any>(endpoint, { eventData }) : eventData;
  }

  private handleResponse(geolocation: any, appendOS = false) {
    if (geolocation) {
      this.geolocation = {
        ip: geolocation?.ip || '',
        country: geolocation?.country_name || '',
        regionName: geolocation?.region_name || '',
        city: geolocation?.city || '',
        zip: geolocation?.zip_code || '',
        latitude: geolocation?.latitude || 0,
        longitude: geolocation?.longitude || 0,
        timezone: geolocation?.time_zone || ''
      }
    } else {
      this.geolocation = {} as IGeolocation;
    }
    const geo = {... this.geolocation };
    sessionStorage.setItem(this.name, btoa(JSON.stringify(this.geolocation)));
    if (appendOS) { 
      geo.os = this.getOS();
    }
    return geo;
  }

  private getOrigin(section: string): any {
    return {
      section,
      os: this.getOS(),
      geolocation: this.geolocation,
      count: 1,
      timestamp: Date.now()
    };
  }

  private getOS(): string {
    const userAgent = window.navigator.userAgent;
    const platform = window?.navigator?.platform || navigator.userAgent;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = 'unknown';

    if (macosPlatforms.includes(platform)) {
      os = 'Mac OS';
    } else if (iosPlatforms.includes(platform)) {
      os = 'iOS';
    } else if (windowsPlatforms.includes(platform)) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    } else {
      os = platform;
    }

    return  os;
  }
}
