import { useState, useRef, useCallback } from 'react'
import { cn } from '../utils/cn.js'
import styles from './ChatInput.module.css'

export interface ChatInputProps {
  /** 发送回调 */
  onSend: (text: string) => void
  /** 是否处于加载态（禁用输入+按钮） */
  disabled?: boolean
  /** 占位文案 */
  placeholder?: string
  /** 最大字符数 */
  maxLength?: number
  className?: string
}

/**
 * 聊天输入框组件
 *
 * 支持 Enter 发送、Shift+Enter 换行、loading 禁用、字数限制。
 */
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = '输入消息...',
  maxLength = 2000,
  className,
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    // 重置高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, disabled, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (val.length <= maxLength) {
      setValue(val)
    }
    // 自动伸缩高度
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [maxLength])

  return (
    <div className={cn(styles.wrapper, className)}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        maxLength={maxLength}
        aria-label="输入消息"
      />
      <button
        className={styles.sendBtn}
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="发送"
      >
        ↑
      </button>
    </div>
  )
}
