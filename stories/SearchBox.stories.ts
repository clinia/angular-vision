import { storiesOf } from '@storybook/angular';
import { meta, wrapWithRecords } from './utils';

storiesOf('SearchBox', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithRecords({
      template:
        "<cvi-search-box placeholder='Search for pharmacies'></cvi-search-box>",
    }),
  }))
  .add('search on enter', () => ({
    component: wrapWithRecords({
      template: `
        <cvi-search-box
          [autofocus]="true"
          placeholder="Search for products"
          [searchAsYouType]="false"
        >
        </cvi-search-box>
      `,
    }),
  }));
