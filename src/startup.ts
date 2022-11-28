import StepsList, { StartupStep } from './classes/StepsList'
import executeStep, { ExecuteStepConfig } from './executeStep'
import fileUtil from './utils/fileUtil'
import logStartupInfo from './utils/logStartupInfo'

export { StartupStep }
export interface StarterConfig extends ExecuteStepConfig {
  startup_path?: string
}


class ServiceStartup extends StepsList {
  async start(config?: StarterConfig) {
    await fileUtil.requireRootDefaultSetupFile({ filePath: config?.startup_path || './startup' })

    logStartupInfo()

    const { steps } = this

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      await executeStep(step, config)
    }
  }
}


const serviceStartup = new ServiceStartup()
export default serviceStartup
