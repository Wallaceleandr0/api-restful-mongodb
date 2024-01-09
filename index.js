// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person',  personRoutes)

// rota inical / endpoint

// entregar uma porta
const DB_USER = 'wallace'
const DB_PASSWORD = encodeURIComponent('1KQZXR1Tp6Aq55i4')
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.viffx1o.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
.then(() => {
    console.log('conectamos ao MongoDB')
    app.listen(3001, (req, res) => {
        console.log("Servidor rodando na porta 3001")
    })
})
.catch((err) => console.error(err))

