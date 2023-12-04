import rootRequireUtil from "root-require-utils"

function requireRootDefaultSetupFile({ filePath }: { filePath: string}) {
  const isConfigExists = rootRequireUtil.exists(filePath)
  if(!isConfigExists) return null

  try {
    rootRequireUtil.require(filePath)
  } catch (e) {
    console.error('[service-startup] Failed to load config:', filePath + '!', e)
  }
}

function getInfoFromRootPackageJson() {
  try {
    const packageJson = rootRequireUtil.require('package.json')

    if(!packageJson) return null
    return {
      name: packageJson.name,
      version: packageJson.version,
    }
  } catch (e) {
    // seems file is not created...
  }

  return null
}


export default {
  requireRootDefaultSetupFile,
  getInfoFromRootPackageJson,
}
