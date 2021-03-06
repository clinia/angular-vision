import { ModuleWithProviders, NgModule } from '@angular/core';

// Modules
import { NgCviConfigureModule } from './configure/configure.module';
export { NgCviConfigureModule };
import { NgCviInfiniteRecordsModule } from './infinite-records/infinite-records.module';
export { NgCviInfiniteRecordsModule };
import { NgCviPaginationModule } from './pagination/pagination.module';
export { NgCviPaginationModule };
import { NgCviRecordsModule } from './records/records.module';
export { NgCviRecordsModule };
import { NgCviSearchBoxModule } from './search-box/search-box.module';
export { NgCviSearchBoxModule };
import { NgCviVisionModule } from './vision/vision.module';
export { NgCviVisionModule };

// Components
export { NgCviConfigure } from './configure/configure';
export { NgCviInfiniteRecords } from './infinite-records/infinite-records';
export { NgCviPagination } from './pagination/pagination';
export { NgCviRecords } from './records/records';
export { NgCviSearchBox } from './search-box/search-box';
import { NgCviVision } from './vision/vision';
export { NgCviVision };

// Server-side rendering search client

// Custom widget with BaseWidget class
export { BaseWidget, Widget, Connector } from './base-widget';

const NGCVI_MODULES = [
  NgCviConfigureModule,
  NgCviInfiniteRecordsModule,
  NgCviPaginationModule,
  NgCviRecordsModule,
  NgCviSearchBoxModule,
  NgCviVisionModule,
];

@NgModule({
  exports: NGCVI_MODULES,
  imports: [NgCviVisionModule.forRoot()],
})
export class NgCviRootModule {}

@NgModule({ imports: NGCVI_MODULES, exports: NGCVI_MODULES })
export class NgCviModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgCviRootModule };
  }
}
