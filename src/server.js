const express = require('express');
const mustache = require('mustache-express')
const path = require('path')
const server = express();
// rotas
const mainRouts = require('./routes/index')

server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

server.use(express.static(path.join(__dirname, '../src')))

server.use(express.urlencoded({ extended: true }))

server.use(mainRouts.router)

server.use((req , res)=>{
    res.status(404).send('Página não encontrada')
})

server.listen(3000, () => {
    console.log(`server online`)
})