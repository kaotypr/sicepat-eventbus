import type { RailframeOptions } from 'railframe'
import { useCallback, useEffect, useRef } from 'react'
import { EventbusContainer } from '../eventbus/eventbus-container'
import type { EventMap, EventType } from '../types/event-map'
import type { EmitEventPayload } from '../types/event-payload'

export function useEventbusContainer(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  options?: Omit<RailframeOptions, 'delimitter'>,
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
    eventBusRef,
  }
}
