import _ from 'lodash'

export interface StartupStep {
  name: string
  onRun: Function
  isRequired?: boolean
  envWhiteList?: string | string[]
  envBlackList?: string | string[]
}


class StepsList {
  steps: StartupStep[] = []

  addStep(step: StartupStep) {
    if(!step) return null
    this.steps.push(step)
  }

  addSteps(steps: StartupStep[]) {
    steps = _.compact(steps)
    this.steps = this.steps.concat(steps)
  }

  addPrioritizedSteps(steps: StartupStep[]) {
    steps = _.compact(steps)
    this.steps = steps.concat(this.steps)
  }

  getSteps(): StartupStep[] {
    return this.steps
  }
}


export default StepsList
