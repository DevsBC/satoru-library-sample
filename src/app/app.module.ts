import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/** LOCAL REFERENCE FOR TESTING */
import { SatoruLibraryModule } from 'satoru-library';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SatoruLibraryModule.forRoot(environment)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
