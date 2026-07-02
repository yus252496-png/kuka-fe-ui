import { useEffect, useRef } from 'react'
import { useStreamChat } from '../hooks/useStreamChat.js'
import type { StreamChatOptions } from '../hooks/useStreamChat.js'
import { ChatMessage } from '../ChatMessage/ChatMessage.js'
import { ChatInput } from '../ChatInput/ChatInput.js'
import { cn } from '../utils/cn.js'
import styles from './Chat.module.css'

export interface ChatProps {
  /** SSE 配置（url / headers / parseChunk / buildBody / onError） */
  options?: StreamChatOptions
  /** 初始消息 */
  initialMessages?: { role: 'user' | 'assistant'; content: string }[]
  /** 占位文案 */
  placeholder?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * 完整聊天组件
 *
 * 串联 useStreamChat + ChatMessage + ChatInput 实现打字机效果。
 * 只需配置 API 端点即可使用。
 */
export function Chat({ options, initialMessages, placeholder, className, style }: ChatProps) {
  const { messages, loading, error, send, abort, clear } = useStreamChat(options)
  const listRef = useRef<HTMLDivElement>(null)

  // 初始消息
  const initialized = useRef(false)
  useEffect(() => {
    if (initialMessages && !initialized.current) {
      initialized.current = true
      // 注意：这里不直接操作 messages，仅做初始化标记
    }
  }, [initialMessages])

  // 自动滚动到底部
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  // 合并初始消息和流消息
  const displayMessages = initialMessages && !initialized.current
    ? initialMessages.map((m, i) => ({
        id: `init-${i}`,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: Date.now() + i,
      }))
    : messages

  return (
    <div className={cn(styles.chat, className)} style={style}>
      {/* 头部 */}
      <div className={styles.header}>
        <span className={styles.title}>AI 对话</span>
        {displayMessages.length > 0 && (
          <button className={styles.clearBtn} onClick={clear} aria-label="清空对话">
            清空
          </button>
        )}
      </div>

      {/* 消息列表 */}
      <div ref={listRef} className={styles.list}>
        {displayMessages.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🤖</div>
            <div className={styles.emptyText}>输入消息开始对话</div>
          </div>
        ) : (
          displayMessages.map((msg, idx) => {
            const isLastAssistant = idx === displayMessages.length - 1 && msg.role === 'assistant'
            return (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                streaming={isLastAssistant && loading}
                error={isLastAssistant && !!error}
              />
            )
          })
        )}
        {error && <div className={styles.errorBar}>{error}</div>}
      </div>

      {/* 输入区 */}
      <div className={styles.inputArea}>
        {loading && (
          <div className={styles.stopBar}>
            <span>AI 正在回复...</span>
            <button className={styles.stopBtn} onClick={abort}>
              中止
            </button>
          </div>
        )}
        <ChatInput onSend={send} disabled={loading} placeholder={placeholder} />
      </div>
    </div>
  )
}
