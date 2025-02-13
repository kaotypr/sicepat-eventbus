# sicepat-eventbus

Type-safe event bus for communication between parent and iframe. Provide react hooks for easy integration.

## Features

- 🔒 Full TypeScript support with type-safe events
- ⚛️ React hooks for easy integration
- 🔄 Bi-directional communication between parent and iframe
- 🧹 Automatic cleanup of event listeners
- 🎯 Custom events support for flexibility

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

function Container() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { eventBusRef, emit } = useEventbusContainer(iframeRef)

  useEventEffect((payload) => {
    console.log('Received from client:', payload)
  }, [eventBusRef, 'user:login'])

  return <iframe ref={iframeRef} src="client-url.html" />
}
```

### Client (Iframe Window)

```tsx
import { useEventbusClient, useEventEffect } from 'sicepat-eventbus/hooks'

function Client() {
  const { eventBusRef, emit } = useEventbusClient()

  const handleLogin = () => {
    emit('user:login', {
      subject: 'auth',
      data: { userId: '123' },
      metadata: { timestamp: Date.now() }
    })
  }

  return <button onClick={handleLogin}>Login</button>
}
```

## Documentation

- [Hooks Usage](./docs/hooks-usage.md)
- [EventbusClient Usage](./docs/EventbusClient-usage.md)
- [EventbusContainer Usage](./docs/EventbusContainer-usage.md)
- [Available Events](./docs/available-events.md)

## API Reference

### Hooks

- `useEventbusContainer` - Create event bus instance for parent window
- `useEventbusClient` - Create event bus instance for iframe
- `useEventEffect` - Listen to type-safe events
- `useCustomEventEffect` - Listen to custom events

### Event Types

The package includes predefined event types for common scenarios:
- Form events (`form:*`)
- Input events (`input:*`)
- Button events (`button:*`)
- Table events (`table:*`)
- Modal events (`modal:*`)
- Navigation events (`nav:*`)
- API events (`api:*`)
- User events (`user:*`)
- System events (`system:*`)

## License

MIT