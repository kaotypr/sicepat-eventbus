import { useEffect, useRef, type RefObject } from 'react'
import type { MessageHandler } from 'railframe'
import type { EventType } from '../types/event-map'
import type { EventbusClient } from '../eventbus/eventbus-client'
import type { EventbusContainer } from '../eventbus/eventbus-container'

type EventBusRef = RefObject<EventbusClient | EventbusContainer | null>

export function useCustomEventEffect<K extends string>(
  callback: MessageHandler,
  [eventBusRef, ...events]: [EventBusRef, ...K[]],
) {
  const refEvents = useRef(events)
  const refCallback = useRef(callback)

  // biome-ignore lint/correctness/useExhaustiveDependencies: eventBusRef is a RefObject
  useEffect(() => {
    if (!eventBusRef.current) return

    refEvents.current.forEach((event) => {
      if (!eventBusRef.current) return
      eventBusRef.current.on(event as EventType, refCallback.current)
    })

    return () => {
      refEvents.current.forEach((event) => {
        if (!eventBusRef.current) return
        eventBusRef.current.off(event as EventType, refCallback.current)
      })
    }
  }, [])
}
