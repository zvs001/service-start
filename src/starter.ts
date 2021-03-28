// import { Spinner } from 'cli-spinner'
import logSymbols from 'log-symbols'
import isEnvOk from './isEnvOk'

export interface StarterStep {
  name: string
  onRun: Function
  isRequired?: boolean
  envWhiteList?: string | string[]
  envBlackList?: string | string[]
}

export interface StarterConfig {
  successSymbol?: string
  errorSymbol?: string
  env?: string
}

async function starter(steps: StarterStep[], config?: StarterConfig) {
  const date = new Date()
  const { successSymbol = logSymbols.success, errorSymbol = logSymbols.error, env = process.env.NODE_ENV } = config || { }
  console.log(`
********************************************************
***********             Startup             ************
***********     ${date.toISOString()}    ************
********************************************************
`)

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    const {
      name = '', isRequired = true, envBlackList, envWhiteList,
    } = step

    const fn = step.onRun

    if (!isEnvOk({ envWhiteList, envBlackList, env })) {
      continue
    }

    // const spinner = new Spinner({
    //   text: 'Running',
    // })
    // spinner.start()

    try {
      await fn()

      // spinner.stop(true)

      console.log(successSymbol, name)
    } catch (e) {
      // spinner.stop(true)

      console.error(errorSymbol, name)
      console.error(e)
      if (isRequired) {
        console.error('Exiting...')
        process.exit(1)
      }
    }
  }
}

export default starter
