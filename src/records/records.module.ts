import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgCviRecords } from './records';

export { NgCviRecords } from './records';

@NgModule({
  declarations: [NgCviRecords],
  entryComponents: [NgCviRecords],
  exports: [NgCviRecords],
  imports: [CommonModule],
})
export class NgCviRecordsModule {}
