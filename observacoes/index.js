const express = require(`express`);
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')
require(`dotenv`).config();
const app = express();
app.use(express.json());

const observacoesPorLembrete = {};

const funcoes = {
    ObservacaoClassificada:(observacao) => {
        const observacoes = observacoesPorLembrete[observacao.lembreteId]
        const obsParaAtualizar = observacoes.find(o => o.id === observacao.id)
        obsParaAtualizar.status = observacao.status
        axios.post('http://localhost:10000/eventos', {
          type: "ObservacaoAtualizada",
          payload: {
            id: observacao.id,
            texto: observacao.texto,
            lembreteId: observacao.lembreteId,
            status: observacao.status
          }
        })  
    }
}

app.get(`/lembretes/:idLembrete/observacoes`, (req, res) => {
    const id = req.params.id;
    res.json(observacoesPorLembrete[req.params.idLembrete] || []);
});

app.post('/lembretes/:idLembrete/observacoes', async (req, res) => {
    const { texto } = req.body;
    const observacaoId = uuidv4();
    const observacoesDoLembrete = observacoes[req.params.idLembrete] || []
    observacoesDoLembrete.push({
        id: idObservacacao,
        texto,
        status: 'aguardando'
    })
    observacoes[req.params.idLembrete] = observacoesDoLembrete
    await axios.post('http://localhost:10000/eventos', {
        type: 'ObservacaoCriada',
        payload: {
            id: observacaoId,
            texto,
            lembreteId: req.params.idLembrete,
            status: 'aguardando'
        }
    })
    res.status(201).json(observacoesDoLembrete);
});

app.post('/eventos', (req, res) => {
    try {
        const evento = req.body
        console.log(evento)
        funcoes[evento.type](evento.payload)
    }
    catch (err) { }
    res.json({ msg: 'ok' })
})

app.listen(process.env.PORT, () => {
    console.log(`Observações. Porta: ${process.env.PORT}`);
});