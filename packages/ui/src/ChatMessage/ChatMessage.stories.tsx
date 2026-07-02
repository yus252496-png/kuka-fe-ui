import type { Meta, StoryObj } from '@storybook/react'
import { ChatMessage } from './ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  argTypes: {
    role: { control: 'select', options: ['user', 'assistant'] },
    content: { control: 'text' },
    streaming: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ChatMessage>

export const User: Story = {
  args: { role: 'user', content: '帮我查一下今天的生产计划' },
}

export const Assistant: Story = {
  args: { role: 'assistant', content: '好的，今天的生产计划是 A 线 200 件，B 线 150 件。' },
}

export const Streaming: Story = {
  args: { role: 'assistant', content: '正在查询生产数据...', streaming: true },
}

export const Error: Story = {
  args: { role: 'assistant', content: '请求超时，请重试', error: true },
}

export const Conversation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
      <ChatMessage role="user" content="机器人的故障率是多少？" />
      <ChatMessage role="assistant" content="根据最新数据，当前机器人平均故障率为 2.3%，较上月下降 0.5%。" />
      <ChatMessage role="user" content="帮我生成一份报告" />
      <ChatMessage role="assistant" content="正在生成中..." streaming />
    </div>
  ),
}
