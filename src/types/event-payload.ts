import type { EventType } from './event-map'

export interface PSubject<T = string> {
  subject: T
}

export interface PData<T = any> {
  data: T
}

export interface PMetadata<T = Record<string, any>> {
  metadata: T
}

export type EventPayload<T = Partial<PSubject & PData & PMetadata>> = {
  eventType: EventType
} & T

export type EmitEventPayload<T = EventPayload> = Omit<T, 'eventType'>
