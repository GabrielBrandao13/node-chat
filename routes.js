const router = require('express/lib/router')
const express = require('express')

const routes = new router()

routes.post('/chat', (req, res) => {
    res.render('../public/chat', { nome: req.body.nome })
})

routes.use(express.static('public'))



module.exports = routes