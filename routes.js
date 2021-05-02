const router = require('express/lib/router')
const express = require('express')
const fs = require('fs')

const routes = new router()

routes.post('/chat', (req, res) => {
    res.render('../public/chat', { nome: req.body.nome })
})

routes.get('/chat', (req, res) => {
    res.end(fs.readFileSync(`${__dirname}/public/chat.html`))
})

routes.use(express.static('public'))



module.exports = routes