const cluster = require('cluster')
const http = require('http')
const constants = require('../utils/constants')
const child_process = require('child_process')
const getRandomInt = require('../utils/getRandomNumber')

const clusteredServer = () => {
  if (cluster.isMaster) {
    for (let i = 0; i < constants.WORKERS_NUM; i++) {
      cluster.fork()
    }

    console.log(`[MASTER] Created ${constants.WORKERS_NUM} workers.`)

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
    })
  } else {
    console.log(`Worker ${process.pid} started`)
    http
      .Server((req, res) => {
        const num1 = getRandomInt(10)
        const num2 = getRandomInt(10)
        const forkedCalcSum = child_process.fork('calcsum.js')
        forkedCalcSum.on('message', msg => {
          console.log(`${num1} + ${num2} = ${msg.sum}`)
          res.end(msg.sum.toString())
        })
        forkedCalcSum.send({ num1, num2 })
      })
      .listen(constants.PORT)
  }
}

clusteredServer()
