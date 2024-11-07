require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
const {PORT} = process.env
const axios = require('axios')

id = 0;

const baseConsulta = {}


app.get("/logs", (req, res) => {
    res.json(baseConsulta)
})


app.post("/eventos", (req, res) => {
    try{
        const evento = req.body
        console.log(evento)
        baseConsulta[++id] = {"tipo_evento": evento.type, "data_hora": new Date().toISOString()} 
      }
      catch(err){}
      res.json({msg: 'ok'})
})

app.listen(PORT, async () => {
  console.log(`Logs. ${PORT}`)
  const resp = await axios.get('http://tti301-barramento-de-eventos-service:10000/eventos')
  resp.data.forEach((valor, indice, colecao) => {
    try{
      baseConsulta[++id] = {"tipo_evento": valor.type, "data_hora": new Date().toISOString()}
    }
    catch(err){}
  })
})