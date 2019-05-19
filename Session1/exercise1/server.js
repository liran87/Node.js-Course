const http = require('http')
const sleep = require('../utils/sleep')
const constants = require('../utils/constants')

const server = http.createServer((req, res) => {
  sleep(constants.WAIT_TIME)
  res.end()
})

const init = () => {
  server.listen(constants.PORT, () => {
    console.log(`Server listen on port ${constants.PORT}`)
  })
}

module.exports.init = init
