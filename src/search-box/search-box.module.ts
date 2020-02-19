import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgCviSearchBox } from './search-box';

export { NgCviSearchBox } from './search-box';

@NgModule({
  declarations: [NgCviSearchBox],
  entryComponents: [NgCviSearchBox],
  exports: [NgCviSearchBox],
  imports: [CommonModule],
})
export class NgCviSearchBoxModule {}
