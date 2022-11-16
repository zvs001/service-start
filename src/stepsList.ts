export interface StarterStep {
  name: string
  onRun: Function
  isRequired?: boolean
  envWhiteList?: string | string[]
  envBlackList?: string | string[]
}


class StepsList {
  steps: StarterStep[]

  addStep(step: StarterStep) {
    this.steps.push(step)
  }

  getSteps(): StarterStep[] {
    return this.steps
  }
}


const stepsList = new StepsList()
export default stepsList
