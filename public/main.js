const socket = io()

const input = document.querySelector('input.chatbar')
const form = document.querySelector('form.menu')
const chat = document.querySelector('div.chat')

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
    const msgHTML = document.createElement('p')
    msgHTML.className = 'mensagem'
    msgHTML.loading = 'lazy'
    msgHTML.textContent = msg
    chat.appendChild(msgHTML)
})

