import {
  Inject,
  Input,
  Component,
  ContentChild,
  TemplateRef,
  forwardRef,
} from '@angular/core';

import { connectRecordsWithInsights } from '@clinia/vision/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgCviVision, Record } from '../vision/vision';

export interface RecordsState {
  records: Record[];
  results: {};
}

@Component({
  selector: 'cvi-records',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li [class]="cx('item')" *ngFor="let record of state.records">
            {{ record.name }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class NgCviRecords extends BaseWidget {
  @ContentChild(TemplateRef) public template?: TemplateRef<any>;

  @Input() public escapeHTML?: boolean;
  @Input() public transformItems?: <U extends Record>(items: Record[]) => U[];

  public state: RecordsState = {
    records: [],
    results: {},
  };

  constructor(
    @Inject(forwardRef(() => NgCviVision))
    public visionParent: NgCviVision
  ) {
    super('Records');
  }

  ngOnInit() {
    this.createWidget(connectRecordsWithInsights, {
      escapeHTML: this.escapeHTML,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }

  updateState = (state, isFirstRendering: boolean) => {
    if (isFirstRendering) {
      return;
    }
    this.state = state;
  };
}
