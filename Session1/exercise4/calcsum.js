const sleep = require('../utils/sleep')
const constants = require('../utils/constants')

process.on('message', ({ num1, num2 }) => {
  sleep(constants.WAIT_TIME)
  process.send({ sum: num1 + num2 })
})
