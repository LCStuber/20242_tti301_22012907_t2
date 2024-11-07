const express = require(`express`)
const axios = require('axios')
require(`dotenv`).config()

const app = express()

app.use(express.json());

const lembretes = {}

app.get(`/lembretes`, (req, res) => {
    res.json(lembretes)
})

app.post(`/lembretes`, (req, res) => {
    const { texto } = req.body
    const id = Object.keys(lembretes).length
    lembretes[id] = {
        id, texto
    }
    //usar a axios para emitir o evento
    axios.post('http://tti301-barramento-de-eventos-service:10000/eventos', {
        type: 'LembreteCriado',
        payload: {
            id, texto: req.body.texto
        }
    })
    res.status(201).json(lembretes[id])
})

app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.status(200).json({ mensagem: 'ok' })
})

app.listen(process.env.PORT, () => {
    console.log("Nova Versão")
    console.log(`Lembretes. Porta: ${process.env.PORT}`)
})