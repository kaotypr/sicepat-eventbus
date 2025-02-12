import type { ApiEvents } from './events-types/api-events-type';
import type { ButtonEvents } from './events-types/button-events-type';
import type { FormEvents } from './events-types/form-events-type';
import type { InputEvents } from './events-types/input-events-type';
import type { ModalEvents } from './events-types/modal-events-type';
import type { NavigationEvents } from './events-types/navigation-events-type';
import type { SystemEvents } from './events-types/system-events-type';
import type { TableEvents } from './events-types/table-events-type';
import type { UserEvents } from './events-types/user-events-type';

export type { EventPayload } from './event-payload-type';

export type EventMap = ApiEvents &
  ButtonEvents &
  FormEvents &
  InputEvents &
  ModalEvents &
  NavigationEvents &
  SystemEvents &
  TableEvents &
  UserEvents;

export type EventKey = keyof EventMap;
