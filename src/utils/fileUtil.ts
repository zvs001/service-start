import resolveUtils from '../lib/resolveUtils'

function requireRootDefaultSetupFile() {
  const path = resolveUtils.resolvePathFromRoot('service-startup')
  try {
    require(path)
  } catch (e) {
    // seems file is not created...
  }
}

function getInfoFromRootPackageJson() {
  const packageJsonPath  = resolveUtils.resolvePathFromRoot('package.json')
  try {
    const packageJson = require(packageJsonPath)

    if(!packageJson) return  null
    return {
      name: packageJson.name,
      version: packageJson.version,
    }
  } catch (e) {
    // seems file is not created...
  }

  return  null
}


export default {
  requireRootDefaultSetupFile,
  getInfoFromRootPackageJson,
}
