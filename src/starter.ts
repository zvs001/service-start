// import { Spinner } from 'cli-spinner'
import logSymbols from 'log-symbols'

export interface StarterStep {
  name: string
  onRun: Function
  isRequired?: boolean
}

export interface StarterConfig {
  successSymbol?: string
  errorSymbol?: string
}

async function starter(steps: StarterStep[], config?: StarterConfig) {
  const date = new Date()
  const { successSymbol = logSymbols.success, errorSymbol = logSymbols.error } = config || { }
  console.log(`
********************************************************
***********             Startup             ************
***********     ${date.toISOString()}    ************
********************************************************
`)

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    const { name = '', isRequired = true } = step
    const fn = step.onRun

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
