Wait for server ready before start.

[![npm](https://img.shields.io/npm/v/service-startup)](https://www.npmjs.com/package/service-startup)

### Installation

- npm: `npm i -S service-startup`
- yarn: `yarn add service-startup`

### Usage
You can use it like on example below.
App will exit if there at least on step is failed.
Check all connections before starting server:

You can create file for your services like `service-startup.ts`. 
Note that this file will be important automatically, 
so you don't need to import it. But you can create own separate files

```typescript
import serviceStartup from 'service-startup'
// databases and others...

serviceStartup.addPrioritizedSteps([
  {
    name: 'PostgreSQL',
    onRun:  () => client.connect(),
  },
  {
    name: 'MongoDB',
    onRun: () => connectMongo(),
  },
])
```

Also you can add steps from inside single library files to support dynamic import:

```tsx
// lib/media.ts
import serviceStartup from 'service-startup'

serviceStartup.addStep({
  name: 'Media Service',
  envBlackList: ['test'],
  onRun: async () => {
    mediaApi.setCredentials(config.media)
    await mediaApi.me.info()
  },
})
```


You can use it to wait for services start at `server.ts`:
```typescript
import serviceStartup from 'service-startup'

serviceStartup.start().then(() => {
  server.listen(3000, () => {
    console.log(`Listening port: 3000`)
  })
})
```



### Api

Step interface:
```typescript
interface StarterStep {
  name: string
  onRun: Function
  isRequired?: boolean
  envWhiteList?: string | string[]
  envBlackList?: string | string[]
}
```

Config interface:
```typescript
interface StarterConfig {
  successSymbol?: string
  errorSymbol?: string
  env?: string
}
```
