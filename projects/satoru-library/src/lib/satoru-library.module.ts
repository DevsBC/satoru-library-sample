import { ModuleWithProviders, NgModule } from '@angular/core';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { ScrumBoardComponent } from './components/scrum-board/scrum-board.component';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor.service';
import { ErrorInterceptor } from './services/error-interceptor.service';

const COMPONENTS = [
  TimeTrackerComponent,
  ScrumBoardComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
  exports: [...COMPONENTS],
})
export class SatoruLibraryModule { 
  public static forRoot(environment: any): ModuleWithProviders<SatoruLibraryModule> {
    return { 
      ngModule: SatoruLibraryModule, 
      providers: [
        { provide: 'environment',  useValue: environment },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ] 
    };
  }
}
