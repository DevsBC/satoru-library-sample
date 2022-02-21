import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  production = this.env.production;

  constructor(@Inject('env') private env: any) {}

  public getMode(): string {
    if (this.existsMode()) {
      return sessionStorage.getItem('mode') || 'prod';
    } else {
      const mode = (this.production) ? 'prod' : 'test';
      this.setMode(mode, false);
      return mode;
    }
  }

  public setMode(mode: string, reload?: boolean): void {
    sessionStorage.setItem('mode', mode);
    if (reload) { location.reload(); }
  }

  private existsMode(): boolean {
    return sessionStorage.getItem('mode') ? true : false;
  }
}
