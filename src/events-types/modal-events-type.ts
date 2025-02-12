import type { EventPayload } from '../event-payload-type';

export interface ModalEvents {
  'modal:open': EventPayload;
  'modal:close': EventPayload;
}
