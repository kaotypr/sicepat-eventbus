import type { EventPayload } from '../event-payload-type';

export interface FormEvents {
  'form:submit': EventPayload<Record<string, any>>;
  'form:validate': EventPayload;
  'form:reset': EventPayload;
  'form:change': EventPayload<Record<string, any>>;
  'form:error': EventPayload;
}
