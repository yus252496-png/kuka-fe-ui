/**
 * 合并 classNames — 过滤 falsy 值，用空格拼接
 * 轻量替代 classnames/deps 库
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
