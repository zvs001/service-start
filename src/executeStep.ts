// import { Spinner } from 'cli-spinner'
import isEnvOk from './utils/isEnvOk'
import { StartupStep } from './classes/StepsList'
import colors from 'colors'

export interface ExecuteStepConfig {
  successSymbol?: string
  errorSymbol?: string
  env?: string
}

async function executeStep(step: StartupStep, config?: ExecuteStepConfig) {
  const { successSymbol = colors.green('[READY]'), errorSymbol = colors.red('[ERROR]'), env = process.env.NODE_ENV } = config || { }

  const {
    name = '', isRequired = true, envBlackList, envWhiteList,
  } = step

  const fn = step.onRun

  if (!isEnvOk({ envWhiteList, envBlackList, env })) {
    return null
  }

  // const spinner = new Spinner({
  //   text: 'Running',
  // })
  // spinner.start()

  let intervalMs = 30000
  let intervalMsTotal = 0
  let warnInterval = setInterval(() => {
    intervalMsTotal += intervalMs
    console.error('[service-startup]', `Step "${name}" is running too long. Current ms: ${intervalMsTotal}`)
  }, 30000)

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

  clearInterval(warnInterval)
}

export default executeStep
