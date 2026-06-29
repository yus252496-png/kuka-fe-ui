import { useCallback, type Ref, type RefCallback } from 'react'

/**
 * 合并多个 ref 到一个回调 ref
 * 支持 RefObject | RefCallback | null
 */
export function useMergeRefs<T>(...refs: (Ref<T> | null | undefined)[]): RefCallback<T> {
  return useCallback(
    (value: T | null) => {
      for (const ref of refs) {
        if (!ref) continue
        if (typeof ref === 'function') {
          ref(value)
        } else if ('current' in ref) {
          (ref as React.MutableRefObject<T | null>).current = value
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  )
}
