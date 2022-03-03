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

  /** URL to access and Payload generic ex. { user, options } || { user } */
  public async access(endpoint: string, payload: any): Promise<string> {
    const token = await firstValueFrom(this.http.post<string>(endpoint, payload));
    this.saveSession(token);
    return token;
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

  private saveSession(session: any): void {
    localStorage.setItem(this.sessionName, session);
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
