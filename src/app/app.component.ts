import { Component } from '@angular/core';
import { AuthService } from 'satoru-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'satoru';

  constructor( private auth: AuthService) {}

  saveTask(task: any) {
    console.log(task);
  }
}
