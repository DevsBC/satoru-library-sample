import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private production = this.env.production;

  constructor(@Inject('env') private env: any) {}

  public getContext(): string {
    if (this.existsContext()) {
      return sessionStorage.getItem('context') || '1';
    } else {
      const context = (this.production) ? '1' : '0';
      this.setContext(context, false);
      return context;
    }
  }

  public setContext(context: string, reload?: boolean): void {
    sessionStorage.setItem('context', context);
    if (reload) { location.reload(); }
  }

  private existsContext(): boolean {
    return sessionStorage.getItem('context') ? true : false;
  }
}
