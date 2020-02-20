import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgCviConfigure } from './configure';

@NgModule({
  declarations: [NgCviConfigure],
  entryComponents: [NgCviConfigure],
  exports: [NgCviConfigure],
  imports: [CommonModule],
})
export class NgCviConfigureModule {}
