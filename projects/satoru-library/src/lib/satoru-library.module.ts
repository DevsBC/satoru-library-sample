import { ModuleWithProviders, NgModule } from '@angular/core';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { ScrumBoardComponent } from './components/scrum-board/scrum-board.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** ANGULAR MATERIAL */
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; //
import { MatIconModule } from '@angular/material/icon'; //
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  TimeTrackerComponent,
  ScrumBoardComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule, 
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  exports: [...COMPONENTS]
})
export class SatoruLibraryModule { 
  public static forRoot(environment: any): ModuleWithProviders<SatoruLibraryModule> {
    return { ngModule: SatoruLibraryModule, providers: [] };
  }
}
