import type { EventPayload } from '../event-payload'

export interface SystemEvents {
  'system:init'?: EventPayload<any>
  'system:error'?: EventPayload<any>
  'system:shutdown'?: EventPayload<any>
}
