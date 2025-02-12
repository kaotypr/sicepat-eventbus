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
  const { eventBusRef, emitEvent } = useEventbusContainer(iframeRef)

  // Listen to events from client
  useEventEffect((payload) => {
    console.log('Received from client:', payload)
  }, [eventBusRef, 'system:init', 'user:login'])

  // Emit events to client
  const handleClick = () => {
    emitEvent('modal:open', { subject: 'login-modal-id' })
  }

  return <iframe ref={iframeRef} src="client-url.html" />
}
```

### Client (Iframe Window)

```tsx
import { useEventbusClient, useEventEffect } from 'sicepat-eventbus/hooks'

function ClientExample() {
  const { eventBusRef, emitEvent } = useEventbusClient()

  // Listen to events from container
  useEventEffect((payload) => {
    if (payload.subject === 'login-modal-id') {
      // open login modal
    }
  }, [eventBusRef, 'modal:open'])

  // Emit events to container
  const notifyContainer = () => {
    emitEvent('user:login', { 
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
  const { eventBusRef, emitEvent } = useEventbusClient()

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

## Automatic Cleanup

The hooks automatically handle cleanup when the component unmounts:

```tsx
function CleanupExample() {
  const { eventBusRef, emitEvent } = useEventbusClient()

  useEventEffect((payload) => {
    // This listener will be automatically removed when component unmounts
    console.log('Event received:', payload)
  }, [eventBusRef, 'api:success'])

  return null
}
```

