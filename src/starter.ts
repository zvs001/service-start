import stepsList, { StarterStep } from './stepsList'
import executeStep, { ExecuteStepConfig } from './executeStep'

export interface StarterConfig extends  ExecuteStepConfig {
}

async function starter(steps: StarterStep[], config?: StarterConfig) {
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
