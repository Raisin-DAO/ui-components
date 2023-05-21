import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { RaisinConfig } from './RaisinConfig';

export default {
  title: 'RaisinConfig',
  component: RaisinConfig,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => <RaisinConfig {...args} />;

export const Default = Template.bind({});
Default.args = {};
