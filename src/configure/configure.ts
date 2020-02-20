import {
  Component,
  Input,
  Inject,
  forwardRef,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';

import { connectConfigure } from '@clinia/vision/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgCviVision, SearchParameters } from '../vision/vision';
import { noop } from '../utils';

export type ConfigureState = {
  refine: Function;
};

@Component({
  selector: 'cvi-configure',
  template: '',
})
export class NgCviConfigure extends BaseWidget {
  // instance options
  private internalSearchParameters: SearchParameters;

  private differ: KeyValueDiffer<string, any>; // SearchParameters (I don't know how to get the values of the type)

  public state: ConfigureState = {
    refine: noop,
  };

  constructor(
    private differs: KeyValueDiffers,
    @Inject(forwardRef(() => NgCviVision))
    public visionParent: NgCviVision
  ) {
    super('Configure');
  }

  @Input()
  set searchParameters(values: SearchParameters) {
    this.internalSearchParameters = values;
    if (!this.differ && values) {
      this.differ = this.differs.find(values).create();
    }
  }

  public ngOnInit() {
    this.createWidget(connectConfigure, {
      searchParameters: this.internalSearchParameters,
    });
    super.ngOnInit();
  }

  ngDoCheck() {
    if (this.differ) {
      const changes = this.differ.diff(this.internalSearchParameters);
      if (changes) {
        this.state.refine(this.internalSearchParameters);
      }
    }
  }
}
