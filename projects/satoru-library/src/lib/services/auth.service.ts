import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionName = this.env.sessionName ||  '_default_satoru_session';
  private urlToRedirect = this.env.urlToRedirect || 'access';

  constructor(private http: HttpClient, private router: Router,  @Inject('environment') private env: any) {}

    /**
   * @description Retorna o envia un objeto para ser procesado como un inicio de sesion
   * @param endpoint URL POST donde el objeto sera procesado (Body { eventData })
   * @example https://myamazingserver.com/auth/signin
   * @param payload Objeto enviado
   * @example { user, options } || { user }
   * @param saveToken Bandera para guardar la sesion (por defecto localStorage)
   * @example true || false
   * @returns Token as string || Object as any
  */
  public async access(endpoint: string, payload: any, saveToken = true): Promise<any> {
    const response = await firstValueFrom(this.http.post<any>(endpoint, payload));
    return saveToken ? this.saveSession(response) : response;
  }

  /* Use this in your Guards */
  public isAuthenticated(): boolean {
    if (this.sessionName) {
      return localStorage.getItem(this.sessionName) ? true : false;
    } else {
      console.log('Session Name is not defined, please login again');
      return false;
    }
  }

  /* Get the Session Object */
  public getSession(returnToken?: boolean): any {
    if (this.isAuthenticated()) {
      const session = localStorage.getItem(this.sessionName) || '';
      return returnToken ? session : this.decryptSession(session);
    } else {
      return null;
    }
  }

  public getToken(): string {
    return this.getSession(true) || '';
  }

  public logout(urlToRedirect?: string): void {
    this.urlToRedirect = urlToRedirect || this.urlToRedirect;
    localStorage.removeItem(this.sessionName);
    this.router.navigateByUrl(this.urlToRedirect);
  }

  private saveSession(session: any): string {
    localStorage.setItem(this.sessionName, session);
    return session;
  }

  private decryptSession(token: string): any {
    try {
      const base64 = token.split('.')[1];
      const data = JSON.parse(window.atob(base64));
      return data.user;
    } catch (error) {
      console.log(error);
      console.log('ALERTA EL TOKEN HA SIDO VULNERADO');
      this.logout();
    }

  }

}
