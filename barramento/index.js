require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const { PORT } = process.env

const eventos = []

app.post('/eventos', async (req, res) => {
  const evento = req.body
  try {
    await axios.post('http://tti301-logs-clusterip-service:2000/eventos', evento)
  }
  catch(err){}
  try {
    await axios.post('http://tti301-lembretes-clusterip-service:4000/eventos', evento)
  }
  catch(err){}
  try{
    await axios.post('http://tti301-observacoes-clusterip-service:5000/eventos', evento)
  }
  catch(err){
  }
  try{
    await axios.post('http://tti301-consulta-clusterip-service:6000/eventos', evento)
  }
  catch(err){
  }
  try {
    await axios.post('http://tti301-classificacao-clusterip-service:7000/eventos', evento)
  }
  catch (err) {}
  res.status(200).json({mensagem: 'ok'})
})

app.get('/eventos', function(req, res){
  res.json(eventos)
})

app.listen(PORT, () => {
  console.log(`Barramento. Porta ${PORT}.`)
});