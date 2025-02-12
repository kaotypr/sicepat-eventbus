import { useEffect, useRef } from 'react'

// Compatibility layer for useEffect cleanup
export function useEffectCompat(effect: () => void | (() => void), deps?: any[]) {
  const cleanup = useRef<void | (() => void)>(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Clear previous cleanup if exists
    if (cleanup.current) {
      cleanup.current()
    }
    // Run effect and store cleanup
    cleanup.current = effect()

    return () => {
      if (cleanup.current) {
        cleanup.current()
      }
    }
  }, deps)
}
