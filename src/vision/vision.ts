import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  VERSION as AngularVersion,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import vision from '@clinia/vision/es';

import { Widget } from '../base-widget';
import { VERSION } from '../version';
import { VisionOptions, Vision } from '@clinia/vision/es/types';

export interface Record {
  [attribute: string]: any;
  id: string;
  _distinctSeqID?: number;
  __position: number;
  __queryID?: string;
}

export type VisionConfig = VisionOptions;

export type VisionInstance = Vision;

@Component({
  selector: 'cvi-vision',
  template: '<ng-content></ng-content>',
})
export class NgCviVision implements AfterViewInit, OnInit, OnDestroy {
  @Input() public config: VisionConfig;
  @Input() public instanceName = 'default';

  @Output()
  change: EventEmitter<{ results: {}; state: {} }> = new EventEmitter<{
    results: {};
    state: {};
  }>();

  public visionInstance: VisionInstance;

  constructor(@Inject(PLATFORM_ID) public platformId: Object) {}

  public ngOnInit() {
    this.createVisionInstance(this.config);
  }

  public ngAfterViewInit() {
    this.visionInstance.start();
  }

  public ngOnDestroy() {
    this.visionInstance.removeListener('render', this.onRender);
    this.visionInstance.dispose();
  }

  public createVisionInstance(config: VisionConfig) {
    // remove URLSync widget if on SSR
    if (!isPlatformBrowser(this.platformId)) {
      if (typeof config.routing !== 'undefined') {
        delete config.routing;
      }
    }

    if (typeof config.searchClient.addCliniaAgent === 'function') {
      config.searchClient.addCliniaAgent(`angular (${AngularVersion.full})`);
      config.searchClient.addCliniaAgent(`angular-vision (${VERSION})`);
    }

    this.visionInstance = vision(config);
    this.visionInstance.on('render', this.onRender);
  }

  public addWidgets(widgets: Widget[]) {
    this.visionInstance.addWidgets(widgets);
  }

  public removeWidgets(widgets: Widget[]) {
    this.visionInstance.removeWidgets(widgets);
  }

  public refresh() {
    this.visionInstance.refresh();
  }

  onRender = () => {
    this.change.emit({
      results: this.visionInstance.helper.lastResults,
      state: this.visionInstance.helper.state,
    });
  };
}
