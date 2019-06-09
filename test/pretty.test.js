const func = require('@funcmaticjs/funcmatic')
const { prettify, formatTime, formatObject, DEFAULT_DATEFORMAT } = require('../lib/pretty')

describe('Prettify', () => {
  let line = null 
  beforeEach(async () => {
    line = {
      level: 'info',
      leveln: 20,
      time: Date.now()
    }
  })
  it ('should pretty print a plain line of text', async () => {
    line.msg = "hello world"
    let l = prettify(line)
    console.log(l)
  })
})

describe('Format Time', () => {
  it ('should use default time', async () => {
    let d = new Date(1560043683345)
    let s = formatTime(d)
    expect(s).toEqual("2019-06-08 18:28:03.345 -0700")
  })
  it ('should allow other time formats allowed by dateformat', async () => {
    let d = new Date(1560043683345)
    let s = formatTime(d, { dateformat: `UTC:${DEFAULT_DATEFORMAT}`})
    expect(s).toEqual("2019-06-09 01:28:03.345 +0000")
  })
})

describe('Format Object', () => {
  it ('should format a simple object', async () => {
    let s = formatObject({ hello: "world", foo: "bar" })
    expect(s).toEqual(expect.stringContaining("hello: \"world\""))
    expect(s).toEqual(expect.stringContaining("foo: \"bar\""))
  })
  it ('should format a nested object', async () => {
    let s = formatObject({ hello: { foo: "bar" } })
    expect(s).toEqual(expect.stringContaining("hello:"))
    expect(s).toEqual(expect.stringContaining("foo: \"bar\""))
  })
})

