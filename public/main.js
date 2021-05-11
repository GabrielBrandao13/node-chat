const socket = io()

const input = document.querySelector('input.chatbar')
const form = document.querySelector('form.menu')
const chat = document.querySelector('div.chat')

var id = ''

socket.on('connect', () => {
    socket.emit('login', nome)
    id = socket.id
})

form.addEventListener('submit', sendMessage)

function sendMessage(e) {
    e.preventDefault()

    const msg = input.value
    input.value = ''


    if (msg) {
        socket.emit('chat', msg)
    }

}


socket.on('chat', msg => {
    const { author, text } = JSON.parse(msg)
    if (author == nome) {
        loadMessage(`Você: ${text}`, 'self')
    } else {
        loadMessage(`${author}: ${text}`, 'mensagem')
    }
})

socket.on('warn', warning => {
    loadMessage(warning, 'aviso')
})

socket.on('users', users => {
    // console.table(JSON.parse(users))
})

function loadMessage(msg, type) {
    const msgHTML = document.createElement('p')
    msgHTML.className = type
    msgHTML.loading = 'lazy'

    msgHTML.textContent = msg
    chat.appendChild(msgHTML)
}
