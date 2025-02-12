import { useEffect, useRef, type RefObject } from 'react'
import type { MessageHandler } from 'railframe'
import type { EventMap } from '../types/event-map'
import type { EventbusClient } from '../eventbus/eventbus-client'
import type { EventbusContainer } from '../eventbus/eventbus-container'

type EventBusRef = RefObject<EventbusClient | EventbusContainer | null>

export function useEventEffect<K extends keyof EventMap>(
  callback: MessageHandler<EventMap[K]>,
  [eventBusRef, ...events]: [EventBusRef, ...K[]],
) {
  const refEvents = useRef(events)
  const refCallback = useRef(callback)

  // biome-ignore lint/correctness/useExhaustiveDependencies: eventBusRef is a RefObject
  useEffect(() => {
    if (!eventBusRef.current) return

    refEvents.current.forEach((event) => {
      if (!eventBusRef.current) return
      eventBusRef.current.on(event, refCallback.current)
    })

    return () => {
      refEvents.current.forEach((event) => {
        if (!eventBusRef.current) return
        eventBusRef.current.off(event, refCallback.current)
      })
    }
  }, [])
}
