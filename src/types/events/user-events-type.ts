import type { EventPayload } from '../event-payload'

export interface UserEvents {
  'user:login': EventPayload
  'user:logout': EventPayload
  'user:register': EventPayload
  'user:profile:update': EventPayload
}
