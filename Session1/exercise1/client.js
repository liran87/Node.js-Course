const http = require('http')
const constants = require('../utils/constants')

const callServer = () => {
  for (let i = 0; i < 10; i++) {
    console.log(`callServer ${i}`)
    http.get(`http://localhost:${constants.PORT}`, res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        console.log(`http call ${i} completed`)
      })
    })
  }
}

module.exports.callServer = callServer
