const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.bodyParser())

io.on('connection', socket => {
  console.log('socket connection')
})

server.listen(3000)
