import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgCviInfiniteRecords } from './infinite-records';

@NgModule({
  declarations: [NgCviInfiniteRecords],
  entryComponents: [NgCviInfiniteRecords],
  exports: [NgCviInfiniteRecords],
  imports: [CommonModule],
})
export class NgCviInfiniteRecordsModule {}
