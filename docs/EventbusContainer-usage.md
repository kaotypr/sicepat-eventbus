# EventbusContainer Usage Guide

The EventbusContainer class provides a type-safe way to handle iframe communication from the parent (container) side.

## Basic Usage

```typescript
import { EventbusContainer } from 'sicepat-eventbus'

// Get reference to your iframe element
const iframe = document.getElementById('myIframe') as HTMLIFrameElement
const eventbus = new EventbusContainer(iframe)

// Listen to events from client (iframe)
eventbus.on('form:submit', (payload) => {
  console.log('Form submitted from iframe:', payload.data)
})

// Emit events to client
eventbus.emit('modal:open', {
  subject: 'login-modal',
  data: { title: 'Welcome Back' },
  metadata: {
    timestamp: Date.now()
  }
})
```

## API Reference

### Constructor

```typescript
new EventbusContainer(iframe: HTMLIFrameElement, options?: RailframeOptions)
```

Parameters:

- `iframe` : HTMLIFrameElement - Reference to the iframe element
- `options` : RailframeOptions (optional)
  - `debug` : boolean - Enable debug logging
  - `targetOrigin` : string or array of string - The target origins for iframe communication

### Methods

#### on(event: K, callback: MessageHandler<EventMap[K]>)

Listen to events from the client (iframe).

```typescript
eventbus.on('user:login', (payload) => {
  // Handle user login from iframe
  console.log('User logged in:', payload.data)
})
```

#### emit (event: K, data?: EventMap[K])

Emit events to the client iframe.

```typescript
eventbus.emit('api:request:success', {
  subject: 'user-data',
  data: { profile: { name: 'John' } },
  metadata: {
    timestamp: Date.now()
  }
})
```

#### off(event: K, callback?: MessageHandler<EventMap[K]>)

Remove event listener.

```typescript
const handler = (payload) => console.log(payload)
eventbus.on('table:row:select', handler)

// Later when you want to remove the listener
eventbus.off('table:row:select', handler)
```

#### destroy()

Clean up and remove all event listeners.

```typescript
// When you're done with the eventbus
eventbus.destroy()
```

## ype Safety

The EventbusContainer provides full TypeScript support:

```typescript
import { EventbusContainer } from 'sicepat-eventbus'
import type { EventMap, EventPayload } from 'sicepat-eventbus'

const iframe = document.getElementById('myIframe') as HTMLIFrameElement
const eventbus = new EventbusContainer(iframe)

// TypeScript will enforce correct event names
eventbus.on('invalid:event', () => {}) // Error: invalid event name

// Payload type checking
eventbus.on('form:submit', (payload: EventPayload) => {
  // payload.data and payload.metadata are properly typed
  const { data, metadata } = payload
  console.log(data, metadata.timestamp)
})
```

## Example: Modal Management

```typescript
const iframe = document.getElementById('myIframe') as HTMLIFrameElement
const eventbus = new EventbusContainer(iframe)

// Listen for modal requests from iframe
eventbus.on('modal:open', (payload) => {
  const { data, subject } = payload
  openModal(subject, data)
})

// Handle modal close
eventbus.on('modal:close', (payload) => {
  const { subject } = payload
  closeModal(subject)
})

// Clean up when container unmounts
window.addEventListener('unload', () => {
  eventbus.destroy()
})
```

## Best Practices

Always validate the iframe element exists before creating the EventbusContainer
Clean up by calling destroy() when the container unmounts
Use TypeScript for type safety of event names and payloads
Set appropriate targetOrigin for security
Handle iframe loading states appropriately
Use meaningful subject names in payloads for better debugging
Include relevant metadata with each event emission