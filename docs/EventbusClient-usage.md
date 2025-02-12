# EventbusClient Usage Guide

The EventbusClient class provides a type-safe way to handle iframe communication from the client (iframe) side.

## Basic Usage

```typescript
import { EventbusClient } from 'sicepat-eventbus'

const eventbus = new EventbusClient()

// Listen to events from container
eventbus.on('modal:open', (payload) => {
  console.log('Specific modal should open with:', payload.subject)
})

// Emit events to container
eventbus.emit('form:submit', {
  subject: 'user-form',
  data: { name: 'John', email: 'john@example.com' },
  metadata: {
    timestamp: Date.now()
  }
})
```

## API Reference

### Constructor

```typescript
new EventbusClient(options?: RailframeOptions)
```

Parameters:

- `options`:
  - `debug`: boolean - Enable debug logging
  - `targetOrigin`: string or array of string - The target origins for iframe communication

### Methods

#### on<K>(event: K, callback: MessageHandler<EventMap[K]>)

Listen to events from the container.

```typescript
eventbus.on('form:submit', (payload) => {
  // Handle form submission
  console.log(payload.data)
})
```

#### emit<K>(event: K, data?: EventMap[K])

Emit events to the container.

```typescript
eventbus.emit('user:login', {
  subject: 'auth',
  data: { userId: '123' },
  metadata: {
    timestamp: Date.now()
  }
})
```

#### off<K>(event: K, callback?: MessageHandler<EventMap[K]>)

Remove event listener.

```typescript
const handler = (payload) => console.log(payload)
eventbus.on('form:submit', handler)

// Later when you want to remove the listener
eventbus.off('form:submit', handler)
```

#### destroy()

```typescript
// When you're done with the eventbus
eventbus.destroy()
```

## Type Safety

The EventbusClient provides full TypeScript support for event names and payload types:

```typescript
import { EventbusClient } from 'sicepat-eventbus'
import type { EventMap } from 'sicepat-eventbus'

const eventbus = new EventbusClient()

// TypeScript will enforce correct event names
eventbus.on('invalid:event', () => {}) // Error: invalid event name

// Payload type checking
eventbus.on('form:submit', (payload) => {
  // payload is properly typed based on the event name
  const {
    data,
    metadata,
    unkownProperty // Error: Property 'unknownProperty' does not exist on type 'EventMap["form:submit"]'
  } = payload
  console.log(payload.data)
})

// Emit with type checking
eventbus.emit('user:login', {
  data: { userId: '123' },
  metadata: {
    timestamp: Date.now()
  }
})
```

## Example: Form Submission

```typescript
const eventbus = new EventbusClient()

// Listen for form validation requests
eventbus.on('form:validate', (payload) => {
  const { data } = payload
  const errors = validateForm(data)
  
  if (errors.length > 0) {
    eventbus.emit('form:error', {
      subject: 'formId1',
      data: errors,
      metadata: {
        formId: data.formId
      }
    })
    return
  }

  eventbus.emit('form:submit', {
    subject: 'formId1',
    data: data,
    metadata: {
      formId: data.formId,
      timestamp: Date.now()
    }
  })
})

// Clean up when done
window.addEventListener('unload', () => {
  eventbus.destroy()
})
```

## Best Practices

1. Always clean up by calling destroy() when the client is unmounting
2. Use TypeScript to ensure type safety of event names and payloads
3. Handle connection errors and timeouts appropriately
4. Use meaningful subject names in payloads for better debugging
5. Include relevant metadata with each event emission