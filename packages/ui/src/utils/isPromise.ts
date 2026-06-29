/**
 * 判断一个值是否为 Promise
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'then' in value &&
    typeof (value as Promise<unknown>).then === 'function'
  )
}
