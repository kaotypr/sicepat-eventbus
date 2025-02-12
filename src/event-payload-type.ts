export interface EventPayload<T = any, P = Record<string, any>> {
  subject: string
  data?: T
  metadata?: P
}
