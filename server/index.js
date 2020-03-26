const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const db = new Map()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/remote/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'controller.html'))
})

io.on('connection', socket => {
  console.log('adding', socket.id)
  db.set(socket.id, socket)

  socket.on('disconnect', () => {
    console.log('removing', socket.id)
    db.delete(socket.id)
  })

  socket.on('remote:keydown', event => {
    console.log(event)
    const s = db[event.id]
    if (s) {
      s.emit('ext:keydown', event)
    }
  })
})

server.listen(3000)
