import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { meta, MemoryRouter, wrapWithRecords } from './utils';

storiesOf('InfiniteHits', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithRecords({
      template: '<cvi-infinite-records></cvi-infinite-records>',
    }),
  }))
  .add('with custom template', () => ({
    component: wrapWithRecords({
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
    }),
  }))
  .add('with previous button enabled', () => ({
    component: wrapWithRecords({
      template:
        '<cvi-infinite-records [showPrevious]=true></cvi-infinite-records>',
      routing: {
        router: new MemoryRouter({ page: 3 }),
      },
    }),
  }))
  .add('with insights', () => ({
    component: wrapWithRecords({
      template: `
      <cvi-infinite-records>
        <ng-template let-records="records" let-showMore="showMore" let-insights="insights">
          <div *ngFor="let record of records">
            Record {{record.id}}:
            {{record.name}}

            <button (click)="insights('clickedRecordIDsAfterSearch', { eventName: 'Add to cart', ids: [record.id] })">
              Add to favorite
            </button>
          </div>
          <button (click)="showMore()">Load more</button>
        </ng-template>
      </cvi-infinite-records>
      `,
      insightsClient: (method: string, payload: any) => {
        action(`[InsightsClient] sent ${method} with payload`)(payload);
      },
      searchParameters: {
        clickAnalytics: true,
      },
    }),
  }));
