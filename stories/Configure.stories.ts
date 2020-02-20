import { storiesOf } from '@storybook/angular';
import { meta, wrapWithRecords } from './utils';

storiesOf('Configure', module)
  .addDecorator(meta)
  .add('with 1 record per page', () => ({
    component: wrapWithRecords({
      template: `
      <p>This widget renders nothing, here we are forcing perPage to 1</p>
      <cvi-configure [searchParameters]="{ perPage: 1 }">
      </cvi-configure>
    `,
    }),
  }))
  .add('Toggle between perPage', () => ({
    component: wrapWithRecords({
      template: `
      <p>Toggle <code>perPage</code></p>
      <pre>{{searchParams | json}}</pre>
      <button (click)="toggleSearchParams()">toggle</button>
      <cvi-configure [searchParameters]="searchParams"></cvi-configure>
    `,
      methods: {
        searchParams: { perPage: 1 },
        toggleSearchParams() {
          this.searchParams.perPage = this.searchParams.perPage === 1 ? 10 : 1;
        },
      },
    }),
  }));
