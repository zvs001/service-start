import fileUtil from './fileUtil'

function buildCentralizedMessage (message: string, { txtBefore, txtAfter, length } : {
  length: number
  txtBefore: string,
  txtAfter: string
}) {
  let msg = message
  while (msg.length < length - (txtBefore.length + txtAfter.length)) {
    if(msg.length % 2 === 0) {
      msg += ' '
    } else {
      msg = " " + msg
    }
  }

  return `${txtBefore}${msg}${txtAfter}`
}

function logStartupInfo() {
  const info = fileUtil.getInfoFromRootPackageJson()

  const date = new Date()
  let logList = [
    "********************************************************",
    "***********             Startup             ************",
  ]
  let borderTxt = '***********'
  const length = logList[0].length

  if(info) {
    const infoTxt = buildCentralizedMessage(` ${info.name} (${info.version}) `, {
      txtAfter: borderTxt,
      txtBefore: borderTxt,
      length
    })

    logList.splice(2, 0, infoTxt)
  }


  logList.push(buildCentralizedMessage(date.toISOString(), {
    txtAfter: borderTxt,
    txtBefore: borderTxt,
    length
  }))
  logList.push(logList[0])

  console.log(logList.join('\n'))
}


export default logStartupInfo
