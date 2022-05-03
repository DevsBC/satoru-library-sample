import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor.service';
import { ErrorInterceptor } from './services/error-interceptor.service';

/** COMPONENTS */
import { ToggleModeComponent } from './components/toggle-mode/toggle-mode.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

/** ANGULAR MATERIAL  */
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [
  ToggleModeComponent,
  HeaderComponent,
  ConfirmDialogComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule
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
