const router = require('express/lib/router')
const express = require('express')
const fs = require('fs')

const routes = new router()

routes.post('/chat', (req, res) => {
    const name = req.body.nome
    if (name) {
        res.render('../public/chat', { nome: req.body.nome })
    } else {
        res.end(fs.readFileSync(`${__dirname}/public/chat.html`))
    }

})


routes.use(express.static('public'))



module.exports = routes