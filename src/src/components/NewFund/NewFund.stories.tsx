import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { NewFund } from './NewFund';
import { RaisinConfig } from '../RaisinConfig/RaisinConfig';
import { LoginButton } from '../LoginButton/LoginButton';

export default {
  title: 'NewFund',
  component: NewFund,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => {
  return (
    <RaisinConfig>
      <LoginButton />
      <NewFund {...args} />
    </RaisinConfig>
  );
};

export const Default = Template.bind({});
Default.args = {};
