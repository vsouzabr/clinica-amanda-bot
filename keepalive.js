const http = require('http');

function ping() {
  const url = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000';
  
  http.get(url, (res) => {
    console.log(`[PING] Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log(`[PING] Erro: ${err.message}`);
  });
}

setInterval(ping, 4 * 60 * 1000);

console.log('Keep-alive iniciado. Ping a cada 4 minutos.');
