const f = require('@funcmaticjs/funcmatic')
const chalk = require('chalk')
const prettify = require('../index')

describe('Func Logger', () => {
  let func = null
  let ctx = null
  beforeEach(async () => {
    func = f.create({ prettify })
    ctx = { }
  })
  it ('should pretty print logs if prettify function passed in', async () => {
    func.request(async (ctx) => {
      let ret = ctx.logger.info("hello world")
      expect(ret).toEqual(expect.stringContaining(`${chalk.green("INFO")} ${chalk.cyan("hello world")}`))
    })
    await func.invokeRequest(ctx)
  })
})

