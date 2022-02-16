import { ModuleWithProviders, NgModule } from '@angular/core';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { ScrumBoardComponent } from './components/scrum-board/scrum-board.component';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  TimeTrackerComponent,
  ScrumBoardComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  exports: [...COMPONENTS]
})
export class SatoruLibraryModule { 
  public static forRoot(environment: any): ModuleWithProviders<SatoruLibraryModule> {
    return { ngModule: SatoruLibraryModule, providers: [] };
  }
}
