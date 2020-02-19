import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgCviPagination } from './pagination';

export { NgCviPagination } from './pagination';

@NgModule({
  declarations: [NgCviPagination],
  entryComponents: [NgCviPagination],
  exports: [NgCviPagination],
  imports: [CommonModule],
})
export class NgCviPaginationModule {}
