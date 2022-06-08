import { Component } from '@angular/core';
import { Department } from './models/Department.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'satoru';
  department = new Department();
  form = this.department.getForm();
  table = this.department.getTable([{ id: 'id', name: 'description', description: 'desc', head: 'Yo mero'}]);
  constructor() {}

  
}
