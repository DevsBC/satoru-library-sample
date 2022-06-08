import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionPayload } from '../interfaces/action.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  /** Action Payload */
  private payload: ActionPayload = { data: null, functionName: '' };
  /** Behavior Subject */
  private subject = new BehaviorSubject<ActionPayload>(this.payload);

  /** Get an observable Action Payload */
  public getPayload(): Observable<ActionPayload> {
    return this.subject.asObservable();
  }

  /** Set payload to subject */
  public setPayload(payload: ActionPayload): void {
    this.subject.next(payload);
  }

}
