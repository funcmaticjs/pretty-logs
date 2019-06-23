// Based on pino-pretty format
// https://github.com/pinojs/pino-pretty

const dateformat = require('dateformat')
const chalk = require('chalk')

const DEFAULT_DATEFORMAT = 'yyyy-mm-dd HH:MM:ss.l o'
const colors = new chalk.constructor({ enabled: true, level: 3 })
const colorize = {
  default: colors.white,
  60: colors.bgRed,
  50: colors.red,
  40: colors.yellow,
  30: colors.green,
  20: colors.blue,
  10: colors.grey,
  message: colors.cyan
}
const STRIP_KEYS = [ 'msg', 'level', 'leveln', 'time' ]

function prettify(line, options) {
  options = options || { }
  let d = new Date(line.time)
  let msg = `[${formatTime(d, options)}] ${formatLevel(line)} ${formatMessage(line.msg)}`
  
  return `${msg}${formatObject(line)}`
}

function formatTime(d, options) {
  options = options || { }
  let format = options.dateformat || DEFAULT_DATEFORMAT
  return dateformat(d, format)
}

function formatLevel(line) {
  return colorize[line.level](line.level_name && line.level_name.toUpperCase() || "?")
}

function formatMessage(msg) {
  return colorize['message'](msg)
} 

function formatObject(line) {
  let copy = JSON.parse(JSON.stringify(line));
  STRIP_KEYS.forEach((key) => { delete copy[key] })
  return JSON.stringify(copy, null, 4).trim().replace(/[{}]/g, '').replace(/\"([^(\")"]+)\":/g,"$1:")
}

module.exports = { 
  prettify,
  formatTime,
  formatLevel,
  formatMessage,
  formatObject,
  DEFAULT_DATEFORMAT
}
