import { useRef, useCallback } from 'react'
import { useEffectCompat } from '../utils/hooks-compat'
import type { RailframeOptions, MessageHandler } from 'railframe'
import { EventbusContainer } from '../eventbus/eventbus-container'
import type { EventMap } from '../types'

export function useEventbusContainer(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  options?: RailframeOptions,
) {
  const eventBusRef = useRef<EventbusContainer | null>(null)

  useEffectCompat(() => {
    if (iframeRef.current && !eventBusRef.current) {
      eventBusRef.current = new EventbusContainer(iframeRef.current, options)
    }

    return () => {
      eventBusRef.current?.destroy()
      eventBusRef.current = null
    }
  }, [iframeRef, options])

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
      }, [callback, ...events])
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
