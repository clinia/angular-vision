import { storiesOf } from '@storybook/angular';
import { meta, wrapWithRecords } from './utils';

storiesOf('Pagination', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithRecords({
      template: '<cvi-pagination></cvi-pagination>',
    }),
  }));
