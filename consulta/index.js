require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())

const {PORT} = process.env

const baseConsulta = {}

const funções = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.Id] = lembrete
    },
    ObservaçãoCriada: (observação) => {
        const observações = baseConsulta[observação.lembreteId]['observacoes'] || []
        observações.push(observação)
        baseConsulta[observação.lembreteId]['observacoes'] = observações
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]["observacoes"]
        const indice = observacoes.findIndex((o) => o.id === observacao.id)
        observacoes[indice] = observacao
    
      }
}

app.get("/lembretes", (req, res) => {
    res.json(baseConsulta)
})


app.post("/eventos", (req, res) => {
    try{
        const evento = req.body
        console.log(evento)
        funcoes[evento.type](evento.payload)  
      }
      catch(err){}
      res.json({msg: 'ok'})
})

app.listen(PORT, async () => {
  console.log(`Consulta. ${PORT}`)
  const resp = await axios.get('http://localhost:10000/eventos')
  resp.data.forEach((valor, indice, colecao) => {
    try{
      funcoes[valor.type](valor.payload)
    }
    catch(err){}
  })
})