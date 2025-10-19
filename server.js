const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Token do Webhook (o mesmo que no Meta)
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'realcity_whats_2025';

// Rota de teste (saúde do container)
app.get('/', (req, res) => {
  res.send('ok');
});

// Verificação do webhook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Recebimento de eventos
app.post('/webhook', (req, res) => {
  console.log('Evento recebido:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Porta obrigatória do Cloud Run
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(Servidor ouvindo na porta ${PORT});
});
