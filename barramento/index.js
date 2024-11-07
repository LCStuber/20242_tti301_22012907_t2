require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const { PORT } = process.env

app.post('/eventos', async (req, res) => {
  const evento = req.body
  try {
    await axios.post('http://tti301-lembretes-clusterip-service:4000/eventos', evento)
  }
  catch(err){}
  // axios.post('http://localhost:5000/eventos', evento)
  // axios.post("http://localhost:6000/eventos", evento)
  // axios.post('http://localhost:7000/eventos', evento)
  res.status(200).json({mensagem: 'ok'})
})

app.get('/eventos', function(req, res){
  res.json(eventos)
})

app.listen(PORT, () => {
  console.log(`Barramento. Porta ${PORT}.`)
});