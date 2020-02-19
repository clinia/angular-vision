import { storiesOf } from '@storybook/angular';
import clinia from 'clinia/lite';
import { meta, wrapWithRecords } from './utils';

storiesOf('Vision', module)
  .addDecorator(meta)
  .add('with clinia search client', () => ({
    component: wrapWithRecords({
      template: '',
      searchClient: clinia(
        'demo-pharmacies',
        'KcLxBhVFP8ooPgQODlAxWqfNg657fTz9'
      ),
    }),
  }));
