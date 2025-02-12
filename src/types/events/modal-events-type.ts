import type { EventPayload } from '../event-payload'

export interface ModalEvents {
  'modal:open': EventPayload
  'modal:close': EventPayload
}
