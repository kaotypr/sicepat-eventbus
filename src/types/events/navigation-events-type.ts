import type { EventPayload } from '../event-payload'

export interface NavigationEvents {
  'nav:route:change': EventPayload<{ path: string; params?: Record<string, string> }>
  'nav:back'?: EventPayload<{ to?: string }>
  'nav:forward'?: EventPayload<{ to?: string }>
}
