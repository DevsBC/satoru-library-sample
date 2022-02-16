import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from '../../interfaces/task.interface';

/** Satoru Time Tracker: Seguimiento de tareas por tiempo */
@Component({
  selector: 'sat-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeTrackerComponent implements OnInit {

  @Output() startTaskEvent = new EventEmitter();
  @Output() stopTaskEvent = new EventEmitter();

  task = {} as ITask;
  hours = 0;
  minutes = 0; 
  seconds = 0;
  time = '00:00:00';
  timer: any;
  key = 'sat_time_tracking_init_task';

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem(this.key)) {
      this.setTimer();
      this.startTimer();
    }
  }

  initTask(form: NgForm) {
    if (form.invalid) { return; }
    this.task.id = 'ID';
    this.task!.timeInterval = {
      start: this.getDate()
    }
    this.task.billable = this.task.billable ?? false;
    localStorage.setItem(this.key, JSON.stringify(this.task));
    this.startTimer();
    this.startTaskEvent.emit(this.task);
  }

  startTimer() {
    const addZero = (value: number) => value < 10 ? '0' + String(value) : String(value);
   
    this.timer = setTimeout(() => {
      this.seconds++;
      if (this.seconds > 59) {
        this.seconds = 0; 
        this.minutes++;
        if (this.minutes > 59) {
          this.minutes = 0;
          this.hours++;
        }
      }
      this.time = addZero(this.hours) + ':' + addZero(this.minutes) + ':' + addZero(this.seconds);
      this.startTimer();
    },1000);
  }

  stopTask() {
    const newTask = { ...this.task };
    newTask.timeInterval.end = this.getDate();
    newTask.timeInterval.duration = this.getDuration();
    this.task = {} as ITask;
    this.time = '00:00:00'
    clearTimeout(this.timer);
    this.hours = 0;  
    this.minutes = 0;
    this.seconds =0;
    localStorage.removeItem(this.key);
    this.stopTaskEvent.emit(newTask);
  }

  setTimer() {
    this.task = JSON.parse(localStorage.getItem(this.key)!) as ITask;
    const date1 = new Date(this.task.timeInterval.start.unix);
    const date2 = new Date();
    this.hours = Math.abs(date2.getHours() - date1.getHours());
    this.minutes = Math.abs(date2.getMinutes() - date1.getMinutes());
    this.seconds = Math.abs(date2.getSeconds() - date1.getSeconds());

    if (this.hours >= 8) { this.stopTask(); }
  }

  getDuration() {
    return (this.hours * 3600) + (this.minutes * 60) + this.seconds;
  }

  getDate() {
    return {
      unix: Date.now(),
      readable: new Date().toLocaleString('es-Es', { timeZone: 'America/Denver' })
    };
  }

}
