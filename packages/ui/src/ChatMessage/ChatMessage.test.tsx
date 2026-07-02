import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChatMessage } from './ChatMessage'

describe('ChatMessage', () => {
  it('渲染用户消息', () => {
    render(<ChatMessage role="user" content="你好" />)
    expect(screen.getByText('你好')).toBeInTheDocument()
    expect(screen.getByText('你')).toBeInTheDocument()
  })

  it('渲染 AI 消息', () => {
    render(<ChatMessage role="assistant" content="你好！有什么可以帮助你的？" />)
    expect(screen.getByText('你好！有什么可以帮助你的？')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('流式输出时显示闪烁光标', () => {
    const { container } = render(<ChatMessage role="assistant" content="正在" streaming />)
    expect(container.querySelector('span')?.className).toContain('cursor')
  })

  it('空内容时不显示光标', () => {
    const { container } = render(<ChatMessage role="assistant" content="" streaming={false} />)
    expect(container.querySelector('span')?.className).toBeUndefined()
  })

  it('错误态显示红色边框', () => {
    render(<ChatMessage role="assistant" content="请求失败" error />)
    const msgEl = screen.getByText('请求失败').parentElement?.parentElement
    expect(msgEl?.className).toContain('error')
  })
})
