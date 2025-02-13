import { type MessageHandler, RailframeGlobal, type RailframeOptions } from 'railframe'
import type { EventMap } from '../types/event-map'
import type { EmitEventPayload } from '../types/event-payload'

/**
 * Eventbus Global, a global event bus for the container or client
 */
export class EventbusGlobal {
  private railframe: RailframeGlobal
  public readonly logger: typeof RailframeGlobal.prototype.logger
  /**
   * Create a new EventbusGlobal
   * @param options - container options
   * @param options.targetOrigin - target origin
   * @param options.debug - debug mode
   */
  constructor(options?: Omit<RailframeOptions, 'delimitter'>) {
    this.railframe = new RailframeGlobal({ ...options, delimiter: ':' })
    this.logger = this.railframe.logger
  }

  /**
   * Listen to a specific event
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param callback - Callback function to be called when the event is emitted by the client
   */
  on<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]>): void {
    this.railframe.on(event as string, callback)
  }

  /**
   * Emit an event to the client
   * @param iframe - iframe element
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param payload - Payload to be sent, payload type is defined based on the event name
   */
  emitToClient<K extends keyof EventMap>(
    iframe: HTMLIFrameElement,
    event: K,
    payload?: EmitEventPayload<EventMap[K]>,
  ): void {
    const payloadWithEventType: EventMap[K] = { ...payload, eventType: event }
    this.railframe.emitToClient(iframe, event, payloadWithEventType)
  }

  /**
   * Emit an event to the container
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param payload - Payload to be sent, payload type is defined based on the event name
   */
  emitToContainer<K extends keyof EventMap>(
    event: K,
    payload?: EmitEventPayload<EventMap[K]>,
  ): void {
    const payloadWithEventType: EventMap[K] = { ...payload, eventType: event }
    this.railframe.emitToContainer(event, payloadWithEventType)
  }

  /**
   * Remove event listener
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param callback - Specific callback function to be removed from the event listeners, if not provided, all callback functions on given event name will be removed
   */
  off<K extends keyof EventMap>(event: K, callback?: MessageHandler<EventMap[K]>): void {
    this.railframe.off(event as string, callback)
  }

  /**
   * Destroy the event bus client and remove all listeners from the container
   */
  destroy() {
    this.railframe.destroy()
  }
}
