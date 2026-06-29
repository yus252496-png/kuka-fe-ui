import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

/* ═══════════════════════════════════════════════════════
   Button 测试
   覆盖：渲染、事件、状态、样式
   ═══════════════════════════════════════════════════════ */

describe('Button', () => {
  /* ── 渲染 ── */

  it('渲染 children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('默认 variant 为 primary', () => {
    render(<Button>OK</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('primary')
  })

  /* ── 事件 ── */

  it('点击触发 onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Hit</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('disabled 时不触发 onClick', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>No</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('loading 时不触发 onClick', () => {
    const onClick = vi.fn()
    render(<Button loading onClick={onClick}>Load</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  /* ── 状态 ── */

  it('loading 时渲染 spinner', () => {
    render(<Button loading>Wait</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-busy', 'true')
    // spinner 元素存在
    expect(btn.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('disabled 时设置 aria-disabled', () => {
    render(<Button disabled>Off</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })

  /* ── Props 传递 ── */

  it('不同 variant 产生不同 class', () => {
    const { rerender } = render(<Button variant="outline">Out</Button>)
    expect(screen.getByRole('button').className).toContain('outline')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button').className).toContain('danger')
  })

  it('不同 size 产生不同 class', () => {
    const { rerender } = render(<Button size="lg">Big</Button>)
    expect(screen.getByRole('button').className).toContain('lg')

    rerender(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button').className).toContain('sm')
  })

  it('block 添加 block class', () => {
    render(<Button block>Full</Button>)
    expect(screen.getByRole('button').className).toContain('block')
  })

  it('传递 className 合并到根元素', () => {
    render(<Button className="my-class">Custom</Button>)
    expect(screen.getByRole('button').className).toContain('my-class')
  })

  it('传递额外的 HTML 属性', () => {
    render(<Button data-testid="btn-1">Test</Button>)
    expect(screen.getByTestId('btn-1')).toBeInTheDocument()
  })
})
