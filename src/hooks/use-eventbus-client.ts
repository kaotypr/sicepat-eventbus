import { useRef, useCallback } from 'react'
import type { RailframeOptions, MessageHandler } from 'railframe'
import { EventbusClient } from '../eventbus/eventbus-client'
import type { EventMap } from '../types'
import { useEffectCompat } from '../utils/hooks-compat'

export function useEventbusClient(options?: RailframeOptions) {
  const eventBusRef = useRef<EventbusClient | null>(null)

  useEffectCompat(() => {
    if (!eventBusRef.current) {
      eventBusRef.current = new EventbusClient(options)
    }

    return () => {
      eventBusRef.current?.destroy()
      eventBusRef.current = null
    }
  }, [options])

  const useEventEffect = useCallback(
    <K extends keyof EventMap>(callback: MessageHandler<EventMap[K]>, events: K[]) => {
      useEffectCompat(() => {
        if (!eventBusRef.current) return

        events.forEach((event) => {
          eventBusRef.current?.on(event, callback)
        })

        return () => {
          events.forEach((event) => {
            eventBusRef.current?.off(event, callback)
          })
        }
      }, [callback, events])
    },
    [],
  )

  const emitEvent = useCallback(<K extends keyof EventMap>(event: K, payload?: EventMap[K]) => {
    eventBusRef.current?.emit(event, payload)
  }, [])

  return {
    useEventEffect,
    emitEvent,
    eventBus: eventBusRef.current,
  }
}
