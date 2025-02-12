import type { EventPayload } from '../event-payload-type'

export interface ApiEvents {
  'api:request:start': EventPayload
  'api:request:success': EventPayload
  'api:request:error': EventPayload
}
