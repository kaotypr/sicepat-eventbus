export interface NavigationEvents {
  'nav:route:change': { path: string; params?: Record<string, string> };
  'nav:back'?: { to?: string };
  'nav:forward'?: { to?: string };
}
