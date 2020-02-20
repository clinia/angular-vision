import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgCviModule } from '@clinia/angular-vision';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCviModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
