const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const express = require('express');
const pino = require('pino');
const chatbot = require('./chatbot');

const logger = pino({ level: 'silent' });

const app = express();
app.get('/', (req, res) => res.send('Bot Online'));

let sock = null;
let qrCode = null;
let isConnected = false;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: logger
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrCode = qr;
      console.log('\n=== ESCANEIE O QR CODE ABAIXO ===\n');
      qrcode.generate(qr, { small: true });
      console.log('\nAbra o WhatsApp → Três pontinhos → Dispositivos conectados → Conectar dispositivo\n');
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log('Desconectado. Motivo:', reason);

      if (reason !== DisconnectReason.loggedOut) {
        console.log('Reconectando...');
        setTimeout(startBot, 3000);
      } else {
        console.log('Deslogado. Escaneie o QR novamente.');
        isConnected = false;
      }
    }

    if (connection === 'open') {
      isConnected = true;
      qrCode = null;
      console.log('\n✅ BOT CONECTADO COM SUCESSO!');
      console.log('Aguardando mensagens...\n');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || 
                 msg.message.extendedTextMessage?.text || '';

    if (!text) return;

    console.log(`[MSG] ${from}: ${text}`);

    const response = chatbot.getResponse(text);
    await sock.sendMessage(from, { text: response.text });

    console.log(`[RESP] ${from}: ${response.text.substring(0, 50)}...`);
  });
}

app.get('/status', (req, res) => {
  res.json({
    connected: isConnected,
    hasQR: !!qrCode
  });
});

app.get('/qr', (req, res) => {
  if (qrCode) {
    res.json({ qr: qrCode });
  } else {
    res.json({ qr: null, connected: isConnected });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  startBot();
  
  // Iniciar keep-alive no Render
  if (process.env.RENDER_EXTERNAL_URL) {
    require('./keepalive');
  }
});
