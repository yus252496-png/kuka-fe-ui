import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatInput } from './ChatInput'

describe('ChatInput', () => {
  it('渲染输入框和发送按钮', () => {
    render(<ChatInput onSend={() => {}} />)
    expect(screen.getByLabelText('输入消息')).toBeInTheDocument()
    expect(screen.getByLabelText('发送')).toBeInTheDocument()
  })

  it('输入文字后点击发送触发 onSend', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    const input = screen.getByLabelText('输入消息')
    fireEvent.change(input, { target: { value: '你好' } })
    fireEvent.click(screen.getByLabelText('发送'))
    expect(onSend).toHaveBeenCalledWith('你好')
  })

  it('Enter 键触发发送', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    const input = screen.getByLabelText('输入消息')
    fireEvent.change(input, { target: { value: '测试' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSend).toHaveBeenCalledWith('测试')
  })

  it('Shift+Enter 不触发发送', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    const input = screen.getByLabelText('输入消息')
    fireEvent.change(input, { target: { value: '换行' } })
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })
    expect(onSend).not.toHaveBeenCalled()
  })

  it('空内容时发送按钮 disabled', () => {
    render(<ChatInput onSend={() => {}} />)
    expect(screen.getByLabelText('发送')).toBeDisabled()
  })

  it('disabled 时输入框和按钮都禁用', () => {
    render(<ChatInput onSend={() => {}} disabled />)
    expect(screen.getByLabelText('输入消息')).toBeDisabled()
    expect(screen.getByLabelText('发送')).toBeDisabled()
  })

  it('发送后清空输入框', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    const input = screen.getByLabelText('输入消息') as HTMLTextAreaElement
    fireEvent.change(input, { target: { value: '消息' } })
    fireEvent.click(screen.getByLabelText('发送'))
    expect(input.value).toBe('')
  })
})
