import type { EventPayload } from '../event-payload-type'

export interface UserEvents {
  'user:login': EventPayload
  'user:logout': EventPayload
  'user:register': EventPayload
  'user:profile:update': EventPayload
}
