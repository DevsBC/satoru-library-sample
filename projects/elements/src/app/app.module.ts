import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { SatoruLibraryModule, TimeTrackerComponent } from 'satoru-library';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    SatoruLibraryModule
  ],
  providers: [],
})
export class AppModule { 

  constructor(private injector: Injector) {}

  ngDoBootstrap(){
    const element = createCustomElement(TimeTrackerComponent, { injector: this.injector })
    customElements.define('sat-time-tracker', element);
  }
}
