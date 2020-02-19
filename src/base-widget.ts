import { Input, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { bem, noop } from './utils';
import { NgCviVision } from './vision/vision';
import { Widget } from '@clinia/vision/es/types';
export { Widget };

export type Connector = (
  renderFn: (state: object, isFirstRendering: boolean) => void,
  unmountFn: () => void
) => (widgetOptions?: object) => Widget;

export abstract class BaseWidget implements OnInit, OnDestroy {
  @Input() public autoHideContainer?: boolean;

  public widget?: Widget;
  public state?: object = {};
  public cx: ReturnType<typeof bem>;
  public abstract visionParent: NgCviVision;

  constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  get parent() {
    return this.visionParent;
  }

  public createWidget(connector: Connector, options: object = {}) {
    this.widget = connector(this.updateState, noop)(options);
  }

  public ngOnInit() {
    this.parent.addWidgets([this.widget]);
  }

  public ngOnDestroy() {
    if (isPlatformBrowser(this.visionParent.platformId)) {
      this.parent.removeWidgets([this.widget]);
    }
  }

  public updateState = (
    state: {},
    isFirstRendering: boolean
  ): Promise<void> | void => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }

    this.state = state;
  };

  /**
   * Helper to generate class names for an item
   * @param item element to generate a class name for
   */
  public getItemClass(item: { isRefined?: boolean }) {
    const className = this.cx('item');

    if (item.isRefined) {
      return `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
