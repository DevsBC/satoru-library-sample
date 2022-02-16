import { Component, OnInit } from '@angular/core';

/** Satoru Time Tracker: Seguimiento de tareas por tiempo */
@Component({
  selector: 'sat-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {

  ready = false;
  totalSeconds = 0;
  constructor() { }

  ngOnInit(): void {
  }

  activate() {
    this.ready = true;
    setInterval(() => ++this.totalSeconds, 1000);
  }

}
