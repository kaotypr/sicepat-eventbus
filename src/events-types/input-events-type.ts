import type { EventPayload } from '../event-payload-type';

export interface InputEvents {
  'input:focus': EventPayload;
  'input:blur': EventPayload;
  'input:change': EventPayload;
  'input:error': EventPayload;
}
