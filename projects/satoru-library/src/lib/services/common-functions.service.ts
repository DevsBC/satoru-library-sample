import { Injectable } from '@angular/core';
import { IDate } from '../interfaces/common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {


  getDate(): IDate {
    return {
      unix: Date.now(),
      readable: new Date().toLocaleString('es-Es', { timeZone: 'America/Denver' })
    };
  }

}
