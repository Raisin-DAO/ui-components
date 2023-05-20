import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { NewFund } from './NewFund';

export default {
  title: 'NewFund',
  component: NewFund,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => <NewFund {...args} />;

export const Default = Template.bind({});
Default.args = {};
