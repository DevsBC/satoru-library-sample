import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from '../../interfaces/task.interface';

declare var M: any;

/** Satoru Time Tracker: Seguimiento de tareas por tiempo */
@Component({
  selector: 'sat-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeTrackerComponent implements OnInit {

  @Input() projects: string[] = [];
  @Input() tags: string[] = [];

  @Output() startTaskEvent = new EventEmitter();
  @Output() stopTaskEvent = new EventEmitter();

  task = {} as ITask;
  hours = 0;
  minutes = 0; 
  seconds = 0;
  time = '00:00:00';
  timer: any;
  key = 'sat_time_tracking_init_task';
  chipsInstance: any;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem(this.key)) {
      this.setTimer();
      this.startTimer();
    }
    this.initForm();
  }

  private initForm() {
    console.log(this.task);
    const getData = (array: string[]) => {
      const obj: any = {};
      for (const item of array) {
        obj[item] = null;
      }
      return obj;
    }
    let elems: any;

    /** PROJECTS */
    elems = document.querySelector('#projectName');
    M.Autocomplete.init(elems, { 
      data: getData(this.projects), 
      minLength: 0, 
      limit: 10, 
      onAutocomplete: (projectName: any) => this.task.projectName = projectName 
    });

    /** TAGS */
    elems = document.querySelectorAll('#tags');
    M.Chips.init(elems, { 
      autocompleteOptions: { data: getData(this.tags), limit: 20, minLength: 0 }, 
      placeholder: 'Etiquetas',
      onChipAdd: (e: any) => this.setTags(e[0].M_Chips.chipsData),
      onChipSelect: (e: any) => this.setTags(e[0].M_Chips.chipsData),
      onChipDelete: (e: any) => this.setTags(e[0].M_Chips.chipsData)
    });
    if (this.task.tags) {
      this.chipsInstance = M.Chips.getInstance(elems[0]);
      for (const tag of this.task.tags) {
        this.chipsInstance.addChip({tag});
      }
    }
  }

  public initTask(form: NgForm) {
    if (form.invalid) { return; }
    this.task.id = Date.now().toString();
    this.task!.timeInterval = {
      start: this.getDate()
    }
    this.task.billable = this.task.billable ?? false;
    localStorage.setItem(this.key, JSON.stringify(this.task));
    this.startTimer();
    this.startTaskEvent.emit(this.task);
  }

  private startTimer() {
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

  public stopTask() {
    const newTask = { ...this.task };
    newTask.timeInterval.end = this.getDate();
    newTask.timeInterval.duration = this.getDuration();
    this.task = {} as ITask;
    this.time = '00:00:00'
    clearTimeout(this.timer);
    this.hours = 0;  
    this.minutes = 0;
    this.seconds = 0;
    localStorage.removeItem(this.key);
    this.stopTaskEvent.emit(newTask);
  }

  private setTimer() {
    this.task = JSON.parse(localStorage.getItem(this.key)!) as ITask;
    const date1 = new Date(this.task.timeInterval.start.unix);
    const date2 = new Date();
    this.hours = Math.abs(date2.getHours() - date1.getHours());
    this.minutes = Math.abs(date2.getMinutes() - date1.getMinutes());
    this.seconds = Math.abs(date2.getSeconds() - date1.getSeconds());

    if (this.hours >= 8) { this.stopTask(); }
  }

  private getDuration() {
    return (this.hours * 3600) + (this.minutes * 60) + this.seconds;
  }

  private getDate() {
    return {
      unix: Date.now(),
      readable: new Date().toLocaleString('es-Es', { timeZone: 'America/Denver' })
    };
  }

  private setTags(array: any) {
    this.task.tags = array.map((a: any) => a.tag);
  }

  private randomString(length = 24) {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...Array(length)].reduce(a=> a + p[~~(Math.random() * length)],'');
  }


}
