const range = require('lodash/range');
import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectPagination } from '@clinia/vision/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgCviVision } from '../vision/vision';
import { parseNumberInput, noop } from '../utils';

@Component({
  selector: 'cvi-pagination',
  template: `
    <div [ngClass]="[cx(), state.numPages <= 1 ? cx('', 'noRefinement') : '']">
      <ul [class]="cx('list')">
        <li
          *ngIf="showFirst"
          (click)="refine($event, 0)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'firstPage') +
            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(0)"
            [class]="cx('link')"
          >
            ‹‹
          </a>
        </li>

        <li
          *ngIf="showPrevious"
          (click)="refine($event, state.currentRefinement - 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'previousPage') +
            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.currentRefinement - 1)"
            [class]="cx('link')"
          >
            ‹
          </a>
        </li>

        <li
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'page') +
            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')
          "
          *ngFor="let page of pages"
          (click)="refine($event, page)"
        >
          <a
            [class]="cx('link')"
            [href]="state.createURL(page)"
          >
            {{page + 1}}
          </a>
        </li>

        <li
          *ngIf="showNext"
          (click)="refine($event, state.currentRefinement + 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'nextPage') +
            (state.currentRefinement + 1 === state.numPages ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.currentRefinement + 1)"
            [class]="cx('link')"
          >
            ›
          </a>
        </li>

        <li
          *ngIf="showLast"
          (click)="refine($event, state.numPages - 1)"
          [class]="
            cx('item') +
            ' ' +
            cx('item', 'lastPage') +
            (state.currentRefinement + 1 === state.numPages ? ' ' + cx('item', 'disabled') : '')
          "
        >
          <a
            [href]="state.createURL(state.numPages - 1)"
            [class]="cx('link')"
          >
            ››
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class NgCviPagination extends BaseWidget {
  // rendering options
  @Input() public showFirst = true;
  @Input() public showLast = true;
  @Input() public showPrevious = true;
  @Input() public showNext = true;
  @Input() public padding: number | string = 3;

  // instance options
  @Input() public totalPages?: number | string;

  public state = {
    createURL: noop,
    currentRefinement: 0,
    total: 0,
    numPages: 0,
    refine: noop,
  };

  get pages() {
    const { numPages, currentRefinement } = this.state;

    const pagesArray = Array.apply(null, { length: numPages }).map(
      Number.call,
      Number
    );

    const pagesPadding =
      typeof this.padding === 'string'
        ? parseInt(this.padding, 10)
        : this.padding;

    if (pagesPadding && pagesPadding > 0) {
      // should not display pages that does not exists
      if (numPages < pagesPadding * 2 + 1) {
        return pagesArray;
      }

      const minDelta = currentRefinement - pagesPadding - 1;
      const maxDelta = currentRefinement + pagesPadding + 1;

      if (minDelta < 0) {
        return range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
      }

      if (maxDelta > numPages) {
        return range(
          currentRefinement - pagesPadding - (maxDelta - numPages),
          numPages
        );
      }

      return range(
        currentRefinement - pagesPadding,
        currentRefinement + pagesPadding + 1
      );
    }

    return pagesArray;
  }

  constructor(
    @Inject(forwardRef(() => NgCviVision))
    public visionParent: NgCviVision
  ) {
    super('Pagination');
  }

  public ngOnInit() {
    this.createWidget(connectPagination, {
      maxPages: parseNumberInput(this.totalPages),
    });
    super.ngOnInit();
  }

  public refine(event: MouseEvent, page: number) {
    event.stopPropagation();
    event.preventDefault();

    if (
      page < 0 ||
      page === this.state.currentRefinement ||
      page >= this.state.numPages
    ) {
      return;
    }

    this.state.refine(page);
  }
}
