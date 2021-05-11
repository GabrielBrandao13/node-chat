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
    // console.log(`Usuário ${socket.id} se conectou`)

    socket.on('disconnect', () => {
        // console.log(`${users[socket.id]} desconectou-se!`)
        io.emit('warn', `${users[socket.id]} saiu da conversa.`)
        delete users[socket.id]
        io.emit('users', JSON.stringify(users))
    })

    socket.on('chat', msg => {
        const message = {
            author: users[socket.id],
            text: msg
        }
        io.emit('chat', JSON.stringify(message))
    })

    socket.on('login', user => {
        users[socket.id] = user
        io.emit('warn', `${users[socket.id]} entrou na conversa.`)
        io.emit('users', JSON.stringify(users))
        // console.log('usuario logou')
    })

})



const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Projeto rodando em http://localhost:${port}`)
})

