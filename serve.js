const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Token usado na verificação do webhook (defina como variável de ambiente no Cloud Run)
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'reality_whats_2025';

// Verificação (GET /webhook)
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

// Recebimento de eventos (POST /webhook)
app.post('/webhook', (req, res) => {
  console.log('Evento recebido:', JSON.stringify(req.body, null, 2));
  // Aqui no futuro: salvar no Supabase, responder mensagens, etc.
  res.sendStatus(200);
});

// O Cloud Run exige escutar process.env.PORT (geralmente 8080) e em 0.0.0.0
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(Servidor ouvindo na porta ${PORT});
});
