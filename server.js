const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(__dirname))

//expecting json to be coming with http request
app.use(bodyParser.json())

let messages = [
  { name: 'John', message: 'hello world' },
  { name: 'John doe', message: 'What do you mean?' }
]

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  messages.push(req.body)
  res.sendStatus(200)
})

const server = app.listen(3000, () => {
  console.log('I am listening to the port ' + server.address().port)
})
