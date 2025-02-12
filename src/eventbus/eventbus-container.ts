import { RailframeContainer, type RailframeOptions, type MessageHandler } from 'railframe';
import type { EventMap } from '../types';

/**
 * Eventbus container, directly handle events from the client and emit events to the client
 */
export class EventbusContainer {
  /**
   * Create a new EventbusContainer
   * @param iframe - iframe element
   * @param options - container options
   * @param options.targetOrigin - target origin
   * @param options.debug - debug mode
   */
  }

  /**
   * Listen to a specific event emitted by the client
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param callback - Callback function to be called when the event is emitted by the client
   */
  on<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]>): void {
    this.railframe.on(event as string, callback);
  }

  /**
   * Emit an event to the client
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param payload - Payload to be sent, payload type is defined based on the event name
   */
  emit<K extends keyof EventMap>(event: K, payload?: EventMap[K]): void {
    this.railframe.emit(event as string, payload);
  }

  /**
   * Remove event listener from the container
   * @param event - Event name, use ":" as delimiter for namespaces
   * @param callback - Specific callback function to be removed from the event listeners, if not provided, all callback functions on given event name will be removed
   */
  off<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]> = () => {}): void {
    this.railframe.off(event as string, callback);
  }

  /**
   * Destroy the event bus client and remove all listeners from the container
   */
  destroy() {
    this.railframe.destroy();
  }
}
