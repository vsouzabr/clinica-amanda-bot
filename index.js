const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
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
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger)
    },
    printQRInTerminal: false,
    logger: logger,
    browser: ['Clínica Amanda Souza', 'Chrome', '120.0.0'],
    generateHighQualityLinkPreview: false
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrCode = qr;
      console.log('\n=== ESCANEIE O QR CODE ABAIXO ===\n');
      console.log(qr);
      console.log('\nAbra o WhatsApp → Três pontinhos → Dispositivos conectados → Conectar dispositivo\n');
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      
      console.log('Desconectado. Código:', statusCode);
      
      if (shouldReconnect) {
        console.log('Reconectando em 5 segundos...');
        setTimeout(startBot, 5000);
      } else {
        console.log('Deslogado. Reinicie o bot.');
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
  res.json({ connected: isConnected, hasQR: !!qrCode });
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
  
  if (process.env.RENDER_EXTERNAL_URL) {
    require('./keepalive');
  }
});
