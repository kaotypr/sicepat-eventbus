import type { EventPayload } from '../event-payload'

export interface ApiEvents {
  'api:request:start': EventPayload
  'api:request:success': EventPayload
  'api:request:error': EventPayload
}
