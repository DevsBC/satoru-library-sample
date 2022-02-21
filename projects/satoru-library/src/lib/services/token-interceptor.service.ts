import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exceptions: string[] = ['storage.googleapis'];

  constructor(public auth: AuthService) {}

  public setExceptions(exceptions: string[]): void {
    this.exceptions = exceptions;
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.exceptions.some(e => request.url.includes(e))) { 
      request = request.clone({ setHeaders: { Authorization: `Bearer ${this.auth.getToken()}`} });
    }
    return next.handle(request);
  }

}
