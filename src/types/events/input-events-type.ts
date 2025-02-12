import type { EventPayload } from '../event-payload'

export interface InputEvents {
  'input:focus': EventPayload
  'input:blur': EventPayload
  'input:change': EventPayload
  'input:error': EventPayload
}
