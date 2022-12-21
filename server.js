const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
require('dotenv').config()

var port = process.env.PORT || 3010


app.use(express.static(__dirname))
//expecting json to be coming with http request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbUrl = process.env.dbUrl
// capital M indicate model object
const Message = mongoose.model('Message', {
  name: String,
  message: String
})

//let messages = [{ name: 'John', message: 'hello world' }]

app.get('/messages', (req, res) => {
  Message.find({}, (err,messages) => {
    res.send(messages)
  })
  
})

app.post('/messages', (req, res) => {
  const message = new Message(req.body)
  message.save(err => {
    if (err) {
      res.sendStatus(500)
    } else {
      // messages.push(req.body)
      io.emit('message', req.body)
      res.sendStatus(200)
    }
  })
})

io.on('connection', socket => {
  console.log('User connected')
})

mongoose.connect(dbUrl, err => {
  console.log('Mongodb connection is succesfull');
})

const server = http.listen(port, () => {
  console.log('I am listening to the port %d ', port)
})
