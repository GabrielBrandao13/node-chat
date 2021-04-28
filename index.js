const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)


const { Server } = require('socket.io')
const io = new Server(server)



app.use('/', express.static('public'))

io.on('connection', socket => {
    console.log('Usuário se conectou!')
    console.log(socket.id)

    socket.on('disconnect', () => {
        console.log(`Usuário ${socket.id} desconectou-se`)
    })

    socket.on('chat', msg => {
        console.log(`${socket.id}: ${msg}`)
        io.emit('chat', `${socket.id}: ${msg}`)
    })

})


const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Projeto rodando em http://localhost:${port}`)
})