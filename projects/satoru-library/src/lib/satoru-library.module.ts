import { ModuleWithProviders, NgModule } from '@angular/core';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { ScrumBoardComponent } from './components/scrum-board/scrum-board.component';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ServerConnectionService } from './services/server-connection.service';
import { AuthService } from './services/auth.service';
import { ContextService } from './services/context.service';
import { ModeService } from './services/mode.service';

const COMPONENTS = [
  TimeTrackerComponent,
  ScrumBoardComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule, 
    FormsModule,
  ],
  exports: [...COMPONENTS]
})
export class SatoruLibraryModule { 
  public static forRoot(environment: any): ModuleWithProviders<SatoruLibraryModule> {
    return { 
      ngModule: SatoruLibraryModule, 
      providers: [
        AuthService, { provide: 'env', useValue: environment },
        ServerConnectionService, { provide: 'env', useValue: environment },
        ContextService, { provide: 'env', useValue: environment },
        ModeService, { provide: 'env', useValue: environment }
      ] 
    };
  }
}
