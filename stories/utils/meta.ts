import { moduleMetadata } from '@storybook/angular';

import { NgCviModule } from '@clinia/angular-vision';

const meta = moduleMetadata({
  imports: [NgCviModule.forRoot()],
});

export default meta;
