import { cn } from '../utils/cn.js'
import styles from './Table.module.css'

interface PaginationInnerProps {
  current: number
  pageSize: number
  total: number
  onChange?: (page: number, pageSize: number) => void
}

/**
 * 简易分页器
 * 上一页 / 页码 / 下一页
 */
export function Pagination({ current, pageSize, total, onChange }: PaginationInnerProps) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const pages: number[] = []
  const start = Math.max(1, current - 2)
  const end = Math.min(totalPages, current + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className={styles.pagination}>
      <button
        className={cn(styles.pageBtn, current <= 1 && styles.disabled)}
        disabled={current <= 1}
        onClick={() => onChange?.(current - 1, pageSize)}
        aria-label="上一页"
      >
        ‹
      </button>

      {start > 1 && (
        <>
          <button className={styles.pageBtn} onClick={() => onChange?.(1, pageSize)}>1</button>
          {start > 2 && <span className={styles.ellipsis}>…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={cn(styles.pageBtn, p === current && styles.active)}
          onClick={() => onChange?.(p, pageSize)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={styles.ellipsis}>…</span>}
          <button className={styles.pageBtn} onClick={() => onChange?.(totalPages, pageSize)}>{totalPages}</button>
        </>
      )}

      <button
        className={cn(styles.pageBtn, current >= totalPages && styles.disabled)}
        disabled={current >= totalPages}
        onClick={() => onChange?.(current + 1, pageSize)}
        aria-label="下一页"
      >
        ›
      </button>

      <span className={styles.pageInfo}>
        {current}/{totalPages}
      </span>
    </div>
  )
}
