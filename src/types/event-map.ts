import type { ApiEvents } from './events/api-events-type'
import type { ButtonEvents } from './events/button-events-type'
import type { FormEvents } from './events/form-events-type'
import type { InputEvents } from './events/input-events-type'
import type { ModalEvents } from './events/modal-events-type'
import type { NavigationEvents } from './events/navigation-events-type'
import type { SystemEvents } from './events/system-events-type'
import type { TableEvents } from './events/table-events-type'
import type { UserEvents } from './events/user-events-type'

export type EventMap = ApiEvents &
  ButtonEvents &
  FormEvents &
  InputEvents &
  ModalEvents &
  NavigationEvents &
  SystemEvents &
  TableEvents &
  UserEvents

export type EventType = keyof EventMap
