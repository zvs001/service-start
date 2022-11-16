import _ from 'lodash'

function isEnvOk(params: {
  envWhiteList?: string | string[]
  envBlackList?: string | string[]
  env?: string
}): boolean {
  let { env = process.env.NODE_ENV, envBlackList, envWhiteList } = params
  if (!env) env = process.env.NODE_ENV

  if (envWhiteList) {
    if (_.isString(envWhiteList)) return env === envWhiteList
    if (_.isArray(envWhiteList)) return _.includes(envWhiteList, env)
  }

  if (envBlackList) {
    if (_.isString(envBlackList)) return env !== envBlackList
    if (_.isArray(envBlackList)) return !_.includes(envBlackList, env)
  }

  return true
}

export default isEnvOk
