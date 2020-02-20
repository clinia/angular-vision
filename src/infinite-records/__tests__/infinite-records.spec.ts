import { connectInfiniteRecordsWithInsights } from '@clinia/vision/es/connectors';
import { createRenderer } from '../../../test/test-renderer';
import { NgCviInfiniteRecords } from '../infinite-records';

const defaultState = {
  records: [
    { id: '1', name: 'foo', description: 'foo' },
    { id: '2', name: 'bar', description: 'bar' },
    { id: '3', name: 'foobar', description: 'foobar' },
    { id: '4', name: 'barfoo', description: 'barfoo' },
  ],
  showMore: jest.fn(),
  isLastPage: false,
};

describe('InfiniteHits', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<cvi-infinite-records></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<cvi-infinite-records></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should create widget with connectInfiniteRecordsWithInsights and pass instance options', () => {
    const createWidget = jest.spyOn(
      NgCviInfiniteRecords.prototype,
      'createWidget'
    );

    const transformItems = jest.fn(x => x);
    const render = createRenderer({
      defaultState,
      template:
        '<cvi-infinite-records [transformItems]="transformItems"></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
      methods: { transformItems },
    });

    render({});

    expect(createWidget).toHaveBeenCalledWith(
      connectInfiniteRecordsWithInsights,
      {
        transformItems,
      }
    );
    createWidget.mockRestore();
  });

  it('should call `showMore()` on button click', () => {
    const render = createRenderer({
      defaultState,
      template: '<cvi-infinite-records></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const showMore = jest.fn();
    const fixture = render({ showMore });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.cvi-InfiniteRecords-loadMore'
    );
    button.click();

    expect(button.disabled).toEqual(false);
    expect(showMore).toHaveBeenCalled();
  });

  it('should disable `showMore` button', () => {
    const render = createRenderer({
      defaultState,
      template: '<cvi-infinite-records></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });

    const showMore = jest.fn();
    const fixture = render({ showMore, isLastPage: true });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.cvi-InfiniteRecords-loadMore'
    );
    button.click();

    expect(button.disabled).toEqual(true);
    expect(showMore).not.toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });

  it('should display `showPrevious()` button', () => {
    const showPrevious = jest.fn();
    const render = createRenderer({
      defaultState,
      template:
        '<cvi-infinite-records [showPrevious]=true></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render({ showPrevious });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.cvi-InfiniteRecords-loadPrevious'
    );

    expect(button).toBeTruthy();
  });

  it('should display `showPrevious()` button with custom label', () => {
    const showPrevious = jest.fn();
    const render = createRenderer({
      defaultState,
      template:
        '<cvi-infinite-records [showPrevious]=true showPreviousLabel="Load previous"></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render({ showPrevious });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.cvi-InfiniteRecords-loadPrevious'
    );

    expect(button.innerHTML).toMatchInlineSnapshot(`" Load previous "`);
  });

  it('should call `showPrevious()` on button click', () => {
    const showPrevious = jest.fn();
    const render = createRenderer({
      defaultState,
      template:
        '<cvi-infinite-records [showPrevious]=true></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render({ showPrevious });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.cvi-InfiniteRecords-loadPrevious'
    );
    button.click();

    expect(button.disabled).toEqual(false);
    expect(showPrevious).toHaveBeenCalledTimes(1);
  });

  it('should disable `showPrevious` button on first page', () => {
    const showPrevious = jest.fn();
    const render = createRenderer({
      defaultState,
      template:
        '<cvi-infinite-records [showPrevious]=true></cvi-infinite-records>',
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render({ showPrevious, isFirstPage: true });

    const button = fixture.debugElement.nativeElement.querySelector(
      '.cvi-InfiniteRecords-loadPrevious'
    );

    expect(button.className).toMatchInlineSnapshot(
      `"cvi-InfiniteRecords-loadPrevious cvi-InfiniteRecords-loadPrevious--disabled"`
    );
    expect(button.disabled).toEqual(true);
    expect(showPrevious).toHaveBeenCalledTimes(0);
    expect(fixture).toMatchSnapshot();
  });

  it('should render with custom templates', () => {
    const render = createRenderer({
      defaultState,
      template: `
        <cvi-infinite-records>
          <ng-template
            let-records="records"
            let-showMore="showMore"
            let-showPrevious="showPrevious"
            let-isFirstPage="isFirstPage"
            let-isLastPage="isLastPage"
          >
            <button (click)="showPrevious()" [disabled]="isFirstPage">Load previous</button>
            <div *ngFor="let record of records">
              <strong>{{record.name}}</strong>
            </div>
            <button (click)="showMore()" [disabled]="isLastPage">Load more</button>
          </ng-template>
        </cvi-infinite-records>
      `,
      TestedWidget: NgCviInfiniteRecords,
    });
    const fixture = render({});

    expect(fixture).toMatchSnapshot();
  });

  it('should allow calling insightsClient', () => {
    const render = createRenderer({
      defaultState,
      template: `
        <cvi-infinite-records>
          <ng-template
            let-records="records"
            let-insights="insights"
          >
            <ul>
              <li *ngFor="let record of records">
                <button
                  id="add-to-cart-{{record.id}}"
                  (click)="insights('clickedRecordIDsAfterSearch', { eventName: 'Add to cart', ids: [record.id] })">

                </button>
              </li>
            </ul>
          </ng-template>
        </cvi-infinite-records>
      `,
      TestedWidget: NgCviInfiniteRecords,
    });
    const insights = jest.fn();
    const fixture = render({ insights });
    expect(fixture).toMatchSnapshot();

    const button = fixture.debugElement.nativeElement.querySelector(
      '#add-to-cart-2'
    );
    button.click();

    expect(insights).toHaveBeenCalledWith('clickedRecordIDsAfterSearch', {
      eventName: 'Add to cart',
      ids: ['2'],
    });
  });
});
