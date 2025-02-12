import { useRef, useCallback, useEffect } from 'react'
import type { RailframeOptions } from 'railframe'
import { EventbusClient } from '../eventbus/eventbus-client'
import type { EventMap } from '../types'

export function useEventbusClient(options?: RailframeOptions) {
  const optionsRef = useRef(options)
  const eventBusRef = useRef<EventbusClient | null>(null)

  useEffect(() => {
    if (!eventBusRef.current) {
      eventBusRef.current = new EventbusClient(optionsRef.current)
    }

    return () => {
      eventBusRef.current?.destroy()
      eventBusRef.current = null
    }
  }, [])

  const emitEvent = useCallback(<K extends keyof EventMap>(event: K, payload?: EventMap[K]) => {
    eventBusRef.current?.emit(event, payload)
  }, [])

  return {
    emitEvent,
    eventBusRef: eventBusRef,
  }
}
