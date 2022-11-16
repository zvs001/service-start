import stepsList, { StarterStep } from './stepsList'
import executeStep, { ExecuteStepConfig } from './executeStep'
import resolveUtils from './utils/resolveUtils'

export interface StarterConfig extends  ExecuteStepConfig {
}

async function starter(steps: StarterStep[], config?: StarterConfig) {
  const path = resolveUtils.resolvePathFromRoot('service-startup')
  try {
    require(path)
  } catch (e) {
    // seems file is not created...
  }

  const date = new Date()
  console.log(`
********************************************************
***********             Startup             ************
***********     ${date.toISOString()}    ************
********************************************************
`)


  steps = steps.concat(stepsList.getSteps())

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]

    await executeStep(step, config)
  }
}

export function registerStep(step: StarterStep) {
  stepsList.addStep(step)
}

export default starter
