import type { EventPayload } from '../event-payload'

export interface FormEvents {
  'form:submit': EventPayload
  'form:validate': EventPayload
  'form:reset': EventPayload
  'form:change': EventPayload
  'form:error': EventPayload
}
