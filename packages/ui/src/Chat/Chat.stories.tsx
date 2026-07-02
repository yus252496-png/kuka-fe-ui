import type { Meta, StoryObj } from '@storybook/react'
import { Chat } from './Chat'

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Chat>

export const Empty: Story = {
  args: {},
}

export const WithInitialMessages: Story = {
  args: {
    initialMessages: [
      { role: 'assistant', content: '你好！我是 AI 助手，可以帮你查询设备状态、故障记录等信息。' },
      { role: 'user', content: '帮我看看三号机器人的状态' },
    ],
  },
}

export const LongConversation: Story = {
  args: {
    initialMessages: [
      { role: 'assistant', content: '欢迎使用库卡智能诊断系统，有任何问题请随时问我。' },
    ],
  },
}

export const Styled: Story = {
  args: {
    initialMessages: [
      { role: 'assistant', content: '这是一个 400px 宽的聊天窗口示例。' },
      { role: 'user', content: '看起来不错' },
    ],
    style: { width: 400, height: 500 },
  },
}
