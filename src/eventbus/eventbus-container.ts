import { type MessageHandler, RailframeContainer, type RailframeOptions } from 'railframe'
import type { EventMap } from '../types/event-map'
import type { EmitEventPayload } from '../types/event-payload'

/**
 * Eventbus container, directly handle events from the client and emit events to the client
 */
export class EventbusContainer {
  private railframe: RailframeContainer
  public readonly logger: typeof RailframeContainer.prototype.logger
  /**
   * Create a new EventbusContainer
   * @param iframe - iframe element
   * @param options - container options
   * @param options.targetOrigin - target origin
   * @param options.debug - debug mode
   */
  constructor(iframe: HTMLIFrameElement, options?: Omit<RailframeOptions, 'delimitter'>) {
    this.railframe = new RailframeContainer(iframe, { ...options, delimiter: ':' })
    this.logger = this.railframe.logger
  }

  /**
   * Listen to a specific event emitted by the client
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param callback - Callback function to be called when the event is emitted by the client
   */
  on<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]>): void {
    this.railframe.on(event as string, callback)
  }

  /**
   * Emit an event to the client
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param payload - Payload to be sent, payload type is defined based on the event name
   */
  emit<K extends keyof EventMap>(event: K, payload?: EmitEventPayload<EventMap[K]>): void {
    const payloadWithEventType: EventMap[K] = { ...payload, eventType: event }
    this.railframe.emit(event as string, payloadWithEventType)
  }

  /**
   * Remove event listener from the container
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
