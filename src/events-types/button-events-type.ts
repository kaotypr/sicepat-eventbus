import type { EventPayload } from '../event-payload-type';

export interface ButtonEvents {
  'button:click': EventPayload;
  'button:disable': EventPayload;
  'button:enable': EventPayload;
}
