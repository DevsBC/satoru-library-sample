import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { CommonFunctionsService } from '../../services/common-functions.service';
declare var M: any;

/** Satoru Time Tracker: Seguimiento de tareas por tiempo */
@Component({
  selector: 'sat-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeTrackerComponent implements OnInit {

  @Input() projects!: string[] | string;
  @Input() tags!: string[] | string;
  @Input() saveLocal = true;

  @Output() startTaskEvent = new EventEmitter();
  @Output() stopTaskEvent = new EventEmitter();

  task = {} as ITask;
  hours = 0;
  minutes = 0; 
  seconds = 0;
  time = '00:00:00';
  key = 'sat_time_tracking_init_task';
  timer: any;
  chipsInstance: any;

  constructor(public functions: CommonFunctionsService) {}

  ngOnInit(): void {
    if (localStorage.getItem(this.key)) {
      this.setTimerFromTaskSaved();
      this.startTimer();
    }
    this.initForm();
  }

  public initTask() {
    this.task.id = Date.now().toString();
    this.task!.timeInterval = {
      start: this.functions.getDate()
    }
    this.task.billable = this.task.billable ?? false;
    if (this.saveLocal) {
      localStorage.setItem(this.key, JSON.stringify(this.task));
    } 
    this.startTimer();
    this.startTaskEvent.emit(this.task);
  }

  public stopTask() {
    const getDuration = () => (this.hours * 3600) + (this.minutes * 60) + this.seconds;

    const newTask = { ...this.task };
    newTask.timeInterval.end = this.functions.getDate();
    newTask.timeInterval.duration = getDuration();
    localStorage.removeItem(this.key);
    this.task = {} as ITask;

    this.stopTimer();

    const length = newTask.tags ? (newTask.tags?.length - 1) : 0;
    for (let i = length; i >= 0; i--) {
      this.chipsInstance.deleteChip(i);
    }

    this.stopTaskEvent.emit(newTask);
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
    }, 1000);
  }

  private stopTimer() {
    clearTimeout(this.timer);
    this.time = '00:00:00'
    this.hours = 0;  
    this.minutes = 0;
    this.seconds = 0;
  }

  private setTimerFromTaskSaved() {
    this.task = JSON.parse(localStorage.getItem(this.key)!) as ITask;
    const date1 = new Date(this.task.timeInterval.start.unix);
    const date2 = new Date();
    this.hours = Math.abs(date2.getHours() - date1.getHours());
    this.minutes = Math.abs(date2.getMinutes() - date1.getMinutes());
    this.seconds = Math.abs(date2.getSeconds() - date1.getSeconds());
  }

  private initForm() {
    const getObject = (array: string[]) => array.reduce((accumulator, value) => ({ ...accumulator, [value]: null}), {});
    const transform = (array: string) => array.split(',');
    const getData = (array: string[] | string) => array ? (Array.isArray(array) ? getObject(array) : getObject(transform(array))) : {};
    const setTags = (array: any[]) => this.task.tags = array.map((a: any) => a.tag);

    let elem: Element | null;

    /** PROJECTS */
    elem = document.querySelector('#projectName');
    M.Autocomplete.init(elem, { 
      data: getData(this.projects), 
      minLength: 0, 
      limit: 10, 
      onAutocomplete: (projectName: any) => this.task.projectName = projectName 
    });

    /** TAGS */
    elem = document.querySelector('#tags');
    this.chipsInstance = M.Chips.init(elem, { 
      autocompleteOptions: { data: getData(this.tags), limit: 20, minLength: 0 }, 
      placeholder: 'Etiquetas',
      onChipAdd: (e: any) => setTags(e[0].M_Chips.chipsData),
      onChipSelect: (e: any) => setTags(e[0].M_Chips.chipsData),
      onChipDelete: (e: any) => setTags(e[0].M_Chips.chipsData)
    });

    if (this.task.tags) {
      for (const tag of this.task.tags) {
        this.chipsInstance.addChip({ tag });
      }
    }
  }

}
