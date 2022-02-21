import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private defaultLang = 'es';
  subject = new BehaviorSubject<string>(this.defaultLang);

  public getCurrentLang(): Observable<string> {
    return this.subject.asObservable();
  }

  public setCurrentLang(lang: string): void {
    this.subject.next(lang);
  }
}
