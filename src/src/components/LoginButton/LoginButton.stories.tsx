import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { LoginButton } from './LoginButton';
import { RaisinConfig } from '../RaisinConfig/RaisinConfig';

export default {
  title: 'LoginButton',
  component: LoginButton,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => {
  return (
    <RaisinConfig>
      <LoginButton {...args} />
    </RaisinConfig>
  );
};

export const Default = Template.bind({});
Default.args = {};
