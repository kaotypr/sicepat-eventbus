import { RailframeClient, type RailframeOptions, type MessageHandler } from 'railframe';
import type { EventMap } from '../types';

export class EventbusClient {
  private railframe: RailframeClient;
  public readonly logger: typeof RailframeClient.prototype.logger;
  constructor(options?: RailframeOptions) {
    this.railframe = new RailframeClient(options);
    this.logger = this.railframe.logger;
  }

  /**
   * Listen to a specific event emitted by the container
   */
  on<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]>): void {
    this.railframe.on(event as string, callback);
  }

  /**
   * Emit an event to the container
   */
  emit<K extends keyof EventMap>(event: K, data?: EventMap[K]): void {
    this.railframe.emit(event as string, data);
  }

  /**
   * Remove event listener from the client
   */
  off<K extends keyof EventMap>(event: K, callback: MessageHandler<EventMap[K]> = () => {}): void {
    this.railframe.off(event as string, callback);
  }

  /**
   * Destroy the event bus client and remove all listeners from the client
   */
  destroy() {
    this.railframe.destroy();
  }
}
