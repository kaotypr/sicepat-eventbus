import { useRef, useCallback, useEffect } from 'react'
import type { RailframeOptions } from 'railframe'
import { EventbusContainer } from '../eventbus/eventbus-container'
import type { EventMap } from '../types'

export function useEventbusContainer(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  options?: RailframeOptions,
) {
  const optionsRef = useRef(options)
  const eventBusRef = useRef<EventbusContainer | null>(null)

  useEffect(() => {
    if (iframeRef.current && !eventBusRef.current) {
      eventBusRef.current = new EventbusContainer(iframeRef.current, optionsRef.current)
    }

    return () => {
      eventBusRef.current?.destroy()
      eventBusRef.current = null
    }
  }, [iframeRef])

  const emitEvent = useCallback(<K extends keyof EventMap>(event: K, payload?: EventMap[K]) => {
    eventBusRef.current?.emit(event, payload)
  }, [])

  return {
    emitEvent,
    eventBusRef,
  }
}
