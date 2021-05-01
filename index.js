const express = require('express')
const http = require('http')

const routes = require('./routes')

const app = express()
app.set('view engine', 'ejs')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.urlencoded({ extended: true }));
app.use(routes)

const users = {}

io.on('connection', socket => {
    console.log(`Usuário ${socket.id} se conectou`)

    socket.on('disconnect', () => {
        console.log(`Usuário ${users[socket.id]} desconectou-se!`)
        delete users[socket.id]
    })

    socket.on('chat', msg => {
        io.emit('chat', `${users[socket.id]}: ${msg}`)
    })

    socket.on('login', user => {
        users[socket.id] = user
        // console.log(users)
    })

})



const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Projeto rodando em http://localhost:${port}`)
})

