import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgCviVision } from './vision';

@NgModule({
  declarations: [NgCviVision],
  entryComponents: [NgCviVision],
  exports: [NgCviVision],
  imports: [CommonModule],
})
export class NgCviVisionModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgCviVisionModule,
      providers: [],
    };
  }
}
