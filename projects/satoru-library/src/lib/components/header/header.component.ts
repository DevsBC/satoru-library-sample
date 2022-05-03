import { Component, Input } from '@angular/core';

@Component({
  selector: 'sat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() data: any;
  constructor() { }

}
