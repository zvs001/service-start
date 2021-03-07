Wait for server ready before start.

[![npm](https://img.shields.io/npm/v/service-startup)](https://www.npmjs.com/package/service-startup)

### Installation

- npm: `npm i -S service-start`
- yarn: `yarn add service-start`

### Usage
You can use it like on example below.
App will exit if there at least on step is failed.
Check all connections before starting server:

`startServices.ts` example
```typescript
import colors from 'colors'
import starter from 'service-startup'
// databases and others...

export default starter([
  {
    name: 'PostgreSQL',
    onRun:  () => client.connect(),
  },
  {
    name: 'MongoDB',
    onRun: () => connectMongo(),
  },
  {
    name: 'Media Service',
    onRun: async () => {
      mediaApi.setCredentials(config.media)
      await mediaApi.me.info()
    },
  },
], {
  successSymbol: colors.green('[READY]'),
})
```

`server.ts` example
```typescript
import startServices from './startServices'

startServices.then(() => {
  server.listen(3000, () => {
    console.log(`Listening port: 3000`)
  })
})
```
