import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ConfirmationModal, ConfirmationModalProps } from './ConfirmationModal';

export default {
  title: 'ConfirmationModal',
  component: ConfirmationModal,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ConfirmationModalProps> = (args) => <ConfirmationModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  description: 'Description',
  question: 'Question?',
  leftButton: 'Left Button',
  rightButton: 'Right button',
  function: () => {
    console.log('Hello World!');
  },
};
