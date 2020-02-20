import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { meta, wrapWithRecords } from './utils';

storiesOf('Records', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithRecords({
      template: '<cvi-records></cvi-records>',
    }),
  }))
  .add('customized records', () => ({
    component: wrapWithRecords({
      template: `
      <cvi-records>
        <ng-template let-records="records">
          <div *ngFor="let record of records">
            Record {{record.id}}:
            {{record.name}}
          </div>
        </ng-template>
      </cvi-records>
      `,
    }),
  }))
  .add('with transformItems', () => ({
    component: wrapWithRecords({
      template: `
      <cvi-records [transformItems]="transformItems">
        <ng-template let-records="records">
          <div *ngFor="let record of records">
            Record {{record.name}}
          </div>
        </ng-template>
      </cvi-records>
      `,
      methods: {
        transformItems: items =>
          items.map(item => ({ ...item, name: `${item.name} (transformed)` })),
      },
    }),
  }))
  .add('with insights', () => ({
    component: wrapWithRecords({
      template: `
      <cvi-records>
        <ng-template let-records="records" let-insights="insights">
          <div *ngFor="let record of records">
            Record {{record.id}}:
            {{record.name}}

            <button (click)="insights('clickedRecordIDsAfterSearch', { eventName: 'Add to cart', ids: [record.id] })">
              Add to favorite
            </button>
          </div>
        </ng-template>
      </cvi-records>
      `,
      insightsClient: (method: string, payload: any) => {
        action(`[InsightsClient] sent ${method} with payload`)(payload);
      },
      searchParameters: {
        clickAnalytics: true,
      },
    }),
  }));
