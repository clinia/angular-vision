import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  Inject,
  forwardRef,
} from '@angular/core';

import { connectInfiniteRecordsWithInsights } from '@clinia/vision/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgCviVision, Record } from '../vision/vision';
import { noop } from '../utils';

export type InfiniteHitsState = {
  records: Record[];
  results: any;
  isFirstPage: boolean;
  isLastPage: boolean;
  showMore: Function;
  showPrevious: Function;
};

@Component({
  selector: 'cvi-infinite-records',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <button
        [ngClass]="[
          cx('loadPrevious'),
          this.state.isFirstPage ? cx('loadPrevious', 'disabled') : ''
        ]"
        (click)="showPreviousHandler($event)"
        [disabled]="state.isFirstPage"
        *ngIf="showPrevious && !template"
      >
        {{ showPreviousLabel }}
      </button>

      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li [class]="cx('item')" *ngFor="let record of state.records">
            {{ record.name }}
          </li>
        </ul>
      </div>

      <button
        [ngClass]="[
          cx('loadMore'),
          this.state.isLastPage ? cx('loadMore', 'disabled') : ''
        ]"
        (click)="showMoreHandler($event)"
        [disabled]="state.isLastPage"
        *ngIf="!template"
      >
        {{ showMoreLabel }}
      </button>
    </div>
  `,
})
export class NgCviInfiniteRecords extends BaseWidget {
  @ContentChild(TemplateRef) public template?: any;

  // rendering options
  @Input() public showPrevious: boolean = false;
  @Input() public showPreviousLabel: string = 'Show previous results';
  @Input() public showMoreLabel: string = 'Show more results';
  @Input() public transformItems?: <U extends Record>(items: Record[]) => U[];

  // inner widget state returned from connector
  public state: InfiniteHitsState = {
    records: [],
    isFirstPage: false,
    isLastPage: false,
    showMore: noop,
    showPrevious: noop,
    results: {},
  };

  constructor(
    @Inject(forwardRef(() => NgCviVision))
    public visionParent: NgCviVision
  ) {
    super('InfiniteRecords');
  }

  ngOnInit() {
    this.createWidget(connectInfiniteRecordsWithInsights, {
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }

  public showMoreHandler(event: MouseEvent) {
    event.preventDefault();
    this.state.showMore();
  }

  public showPreviousHandler(event: MouseEvent) {
    event.preventDefault();
    this.state.showPrevious();
  }

  updateState = (state, isFirstRendering: boolean) => {
    if (isFirstRendering) return;
    this.state = state;
  };
}
