import { RailframeContainer, type RailframeOptions, type MessageHandler } from 'railframe';
import type { EventMap } from '../types';

export class EventbusContainer {
  private railframe: RailframeContainer;
  public readonly logger: typeof RailframeContainer.prototype.logger;
  constructor(iframe: HTMLIFrameElement, options?: RailframeOptions) {
    this.railframe = new RailframeContainer(iframe, options);
    this.logger = this.railframe.logger;
  }

  /**
   * Listen to a specific event emitted by the client
   */
  on<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]>): void {
    this.railframe.on(event as string, callback);
  }

  /**
   * Emit an event to the client
   */
  emit<K extends keyof EventMap>(event: K, payload?: EventMap[K]): void {
    this.railframe.emit(event as string, payload);
  }

  /**
   * Remove event listener from the container
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
