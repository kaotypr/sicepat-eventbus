import type { EventPayload } from '../event-payload'

export interface ButtonEvents {
  'button:click': EventPayload
  'button:disable': EventPayload
  'button:enable': EventPayload
}
