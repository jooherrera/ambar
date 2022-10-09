import clc from 'cli-color'
import emoji from 'node-emoji'

export function cliError(message) {
  console.log(clc.white.bgRed(`${emoji.get('boom')} ${message}`))
}

export function cliNotice(message) {
  console.log(clc.blue.italic(`${emoji.get('loudspeaker')} ${message}`))
}

export function cliSuccess(message) {
  console.log(clc.green.bold(`${emoji.get('tada')} ${message}`))
}

export function cliWarn(message) {
  console.log(clc.yellow.blink(`${emoji.get('warning')} ${message}`))
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
