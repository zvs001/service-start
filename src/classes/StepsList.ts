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
  stepsEnd: StartupStep[] = []

  addStep(step: StartupStep) {
    if(!step) return null
    this.steps.push(step)
  }

  addLateStep(step: StartupStep) {
    if(!step) return null
    this.stepsEnd.push(step)
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
    const steps = this.steps.concat(this.stepsEnd)
    return this.steps
  }
}


export default StepsList
