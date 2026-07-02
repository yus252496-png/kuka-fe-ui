import { cn } from '../utils/cn.js'
import styles from './ChatMessage.module.css'

export type MessageRole = 'user' | 'assistant'

export interface ChatMessageProps {
  role: MessageRole
  content: string
  /** 是否正在流式输出中 */
  streaming?: boolean
  /** 是否显示错误态 */
  error?: boolean
  className?: string
}

/**
 * 消息气泡组件
 *
 * 区分 user / assistant，支持流式输出的闪烁光标、错误状态。
 */
export function ChatMessage({ role, content, streaming = false, error = false, className }: ChatMessageProps) {
  return (
    <div
      className={cn(
        styles.message,
        role === 'user' ? styles.user : styles.assistant,
        error && styles.errorMsg,
        className,
      )}
    >
      <div className={styles.avatar}>{role === 'user' ? '👤' : '🤖'}</div>
      <div className={styles.bubble}>
        <div className={styles.role}>{role === 'user' ? '你' : 'AI'}</div>
        <div className={styles.content}>
          {content || (streaming ? '' : '...')}
          {streaming && <span className={styles.cursor} />}
        </div>
      </div>
    </div>
  )
}
