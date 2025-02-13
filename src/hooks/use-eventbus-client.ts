import type { RailframeOptions } from 'railframe'
import { useCallback, useEffect, useRef } from 'react'
import { EventbusClient } from '../eventbus/eventbus-client'
import type { EventMap, EventType } from '../types/event-map'
import type { EmitEventPayload } from '../types/event-payload'

export function useEventbusClient(options?: Omit<RailframeOptions, 'delimitter'>) {
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

  const emit = useCallback(
    <K extends keyof EventMap>(event: K, payload?: EmitEventPayload<EventMap[K]>) => {
      eventBusRef.current?.emit(event, payload)
    },
    [],
  )

  const customEmit = useCallback(<E = string, P = any>(event: E, payload?: P) => {
    eventBusRef.current?.emit(event as EventType, payload as EventMap[EventType])
  }, [])

  return {
    emit,
    customEmit,
    eventBusRef: eventBusRef,
  }
}
