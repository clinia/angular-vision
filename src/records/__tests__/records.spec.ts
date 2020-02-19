import { connectRecordsWithInsights } from '@clinia/vision/es/connectors';
import { createRenderer } from '../../../test/test-renderer';
import { NgCviRecords } from '../records';

const defaultState = {
  records: [
    { id: '1', name: 'foo', description: 'foo' },
    { id: '2', name: 'bar', description: 'bar' },
    { id: '3', name: 'foobar', description: 'foobar' },
    { id: '4', name: 'barfoo', description: 'barfoo' },
  ],
  results: { total: 50, page: 0, perPage: 20 },
};

describe('Records', () => {
  it('renders markup without state', () => {
    const render = createRenderer({
      defaultState,
      template: '<cvi-records></cvi-records>',
      TestedWidget: NgCviRecords,
    });
    const fixture = render();
    expect(fixture).toMatchSnapshot();
  });

  it('renders markup with state', () => {
    const render = createRenderer({
      defaultState,
      template: '<cvi-records></cvi-records>',
      TestedWidget: NgCviRecords,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should create widget with connectRecords and pass instance options', () => {
    const createWidget = jest.spyOn(NgCviRecords.prototype, 'createWidget');

    const transformItems = jest.fn(x => x);
    const render = createRenderer({
      defaultState,
      template:
        '<cvi-records [escapeHTML]="false" [transformItems]="transformItems"></cvi-records>',
      TestedWidget: NgCviRecords,
      methods: { transformItems },
    });

    render({});

    expect(createWidget).toHaveBeenCalledWith(connectRecordsWithInsights, {
      escapeHTML: false,
      transformItems,
    });
    createWidget.mockRestore();
  });

  it('should expose records to the passed template', () => {
    const render = createRenderer({
      defaultState,
      template: `
          <cvi-records>
            <ng-template let-records="records">
              <ul>
                <li *ngFor="let record of records">
                  {{record.name}}
                </li>
              </ul>
            </ng-template>
          </cvi-records>
        `,
      TestedWidget: NgCviRecords,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });

  it('should expose results to the passed template', () => {
    const render = createRenderer({
      defaultState,
      template: `
          <cvi-records>
            <ng-template let-results="results">
              {{ results | json }}
            </ng-template>
          </cvi-records>
        `,
      TestedWidget: NgCviRecords,
    });
    const fixture = render({});
    expect(fixture).toMatchSnapshot();
  });
  it('should allow calling insightsClient', () => {
    const render = createRenderer({
      defaultState,
      template: `
          <cvi-records>
            <ng-template let-records="records" let-insights="insights">
              <ul>
                <li *ngFor="let record of records">
                  <button
                    id="add-to-cart-{{record.id}}"
                    (click)="insights('clickedRecordIDsAfterSearch', { eventName: 'Add to cart', ids: [record.id] })">

                  </button>
                </li>
              </ul>
            </ng-template>
          </cvi-records>
        `,
      TestedWidget: NgCviRecords,
    });

    const insights = jest.fn();
    const fixture = render({ insights });

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
