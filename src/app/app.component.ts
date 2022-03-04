import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService, EventLogService, ServerConnectionService } from 'satoru-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'satoru';

  constructor( private server: ServerConnectionService, private eventLog: EventLogService) {}

  saveTask(task: any) {
    console.log(task);
  }

  saveEvent() {
    const endpoint = this.server.initServerConnection('cp', 'event-log', 1);
    const obs = this.eventLog.init('TEST', null, 'APP_COMPONENT', 'test', endpoint + '/set') as Observable<any>;
    obs.subscribe(() => console.log('ok'));
  }
}
