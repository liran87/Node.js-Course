const cluster = require('cluster')
const server = require('../exercise1/server')
const constants = require('../utils/constants')

function clusteredServer() {
  if (cluster.isMaster) {
    for (let i = 0; i < constants.WORKERS_NUM; i++) {
      cluster.fork()
    }

    console.log(`[MASTER] Created ${constants.WORKERS_NUM} workers.`)

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
    })
  } else {
    server.init()
    console.log(`Worker ${process.pid} started`)
  }
}

clusteredServer()
