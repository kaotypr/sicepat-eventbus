# Eventbus Hooks Usage Guide

This guide demonstrates how to use the eventbus hooks in your React application for iframe communication.

## Installation

```bash
npm install sicepat-eventbus
# or
yarn add sicepat-eventbus
# or 
pnpm add sicepat-eventbus
```

## Basic Usage

### Container (Parent Window)

```tsx
import { useRef } from 'react'
import { useEventbusContainer, useEventEffect } from 'sicepat-eventbus/hooks'

function ContainerExample() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { eventBusRef, emit } = useEventbusContainer(iframeRef)

  // Listen to events from client
  useEventEffect((payload) => {
    console.log('Received from client:', payload)
  }, [eventBusRef, 'system:init', 'user:login'])

  // Emit events to client
  const handleClick = () => {
    emit('modal:open', { subject: 'login-modal-id' })
  }

  return <iframe ref={iframeRef} src="client-url.html" />
}
```

### Client (Iframe Window)

```tsx
import { useEventbusClient, useEventEffect } from 'sicepat-eventbus/hooks'

function ClientExample() {
  const { eventBusRef, emit } = useEventbusClient()

  // Listen to events from container
  useEventEffect((payload) => {
    if (payload.subject === 'login-modal-id') {
      // open login modal
    }
  }, [eventBusRef, 'modal:open'])

  // Emit events to container
  const notifyContainer = () => {
    emit('user:login', { 
      data: {
        username: 'kaotypr',
        password: 'DropTableUsers;--'
      }
    })
  }

  return <button onClick={notifyContainer}>Login</button>
}
```

## Advanced Usage

### Multiple Events Example with Type Safety

```tsx
import { useEventbusClient, useEventEffect } from 'sicepat-eventbus/hooks'
import type { EventMap } from 'sicepat-eventbus'

function MultipleEventsExample() {
  const { eventBusRef, emit } = useEventbusClient()

  useEventEffect<keyof Pick<EventMap, 'form:submit' | 'form:validate' | 'form:error'>>((payload) => {
    switch (payload.eventType) {
      case 'api:start':
        console.log('start:', payload.data as EventMap[payload.eventType])
        break
      case 'api:success':
        console.log('success:', payload.data as EventMap[payload.eventType])
        break
      case 'api:error':
        console.log('error:', payload.message as EventMap[payload.eventType])
        break
      default:
        break
    }
  }, [eventBusRef, 'api:start', 'api:success', 'api:error'])

  return null
}
```

### Custom Events and Custom Emit (Non Type-Safe)

```tsx
import { useEventbusClient, useCustomEventEffect } from 'sicepat-eventbus/hooks'

function CustomEventsExample() {
  const { eventBusRef, customEmit } = useEventbusClient()

  // Listen to custom events
  useCustomEventEffect((payload) => {
    console.log('Custom event received:', payload)
  }, [eventBusRef, 'custom:event', 'another:custom:event'])

  // Emit custom events
  const handleCustomEvent = () => {
    customEmit('custom:event', { 
      data: { custom: 'data' },
      metadata: { timestamp: Date.now() }
    })
  }

  return <button onClick={handleCustomEvent}>Trigger Custom Event</button>
}
```

## Automatic Cleanup

The hooks automatically handle cleanup when the component unmounts:

```tsx
function CleanupExample() {
  const { eventBusRef, emit } = useEventbusClient()

  useEventEffect((payload) => {
    // This listener will be automatically removed when component unmounts
    console.log('Event received:', payload)
  }, [eventBusRef, 'api:success'])

  return null
}
```

## Best Practices
1. Use useEventEffect with standard events for type safety
2. Use useCustomEventEffect only when dealing with custom events
3. Prefer emit over customEmit when possible for type safety
4. Always clean up event listeners (handled automatically by hooks)
5. Keep event payloads consistent within your application