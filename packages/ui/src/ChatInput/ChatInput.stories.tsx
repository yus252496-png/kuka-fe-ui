import type { Meta, StoryObj } from '@storybook/react'
import { ChatInput } from './ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Components/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  args: { onSend: (text) => console.log('发送:', text), placeholder: '输入消息...' },
}

export const Disabled: Story = {
  args: { onSend: () => {}, disabled: true },
}

export const WithLongPlaceholder: Story = {
  args: { onSend: () => {}, placeholder: '请输入您的问题，按 Enter 发送...' },
}
