# Bot WhatsApp - Clínica Amanda Souza

Bot simples que funciona via WhatsApp Web (sem precisar de Facebook!).

## Como funciona

1. O bot gera um QR Code
2. Você escaneia com o WhatsApp da clínica
3. Pronto! O bot começa a responder automaticamente

## Passo a passo para colocar online

### 1. Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome: `clinica-amanda-bot`
3. Crie o repositório
4. Faça upload de todos os arquivos desta pasta

### 2. Hospedar no Render (grátis)

1. Acesse https://render.com
2. Faça login com o GitHub
3. Clique em **New** → **Web Service**
4. Selecione o repositório `clinica-amanda-bot`
5. Configure:
   - **Name**: clinica-amanda-bot
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
6. Clique em **Create Web Service**

### 3. Conectar o WhatsApp

1. Acesse o site do bot: `https://clinica-amanda-bot.onrender.com`
2. Abra o terminal/log do Render
3. Você verá o QR Code
4. No celular da clínica:
   - Abra o WhatsApp
   - Clique nos três pontinhos (⋮)
   - Vá em **Dispositivos conectados**
   - Clique em **Conectar dispositivo**
   - Escaneie o QR Code

### 4. Pronto!

O bot está no ar! Teste enviando uma mensagem para o número da clínica.

## Comandos do Bot

O bot responde automaticamente a:

- **Oi/Olá** - Menu principal
- **Serviços** - Lista completa de serviços
- **Preços** - Tabela de valores
- **Agendar** - Informações de agendamento
- **Localização** - Endereço da clínica
- **Horário** - Horário de funcionamento
- Nomes de serviços específicos:
  - limpeza
  - sobrancelha
  - cílios
  - massagem
  - fio a fio
  - peeling
  - depilação

## Informações da Clínica

Para alterar informações, edite o arquivo `chatbot.js`:

- Telefone
- Endereço
- Preços
- Horário de funcionamento

## Solução de Problemas

### Bot desconectou
O Render desliga o bot após inatividade. Para manter online, configure um "ping" a cada 5 minutos.

### QR Code não aparece
Reinicie o serviço no Render e escaneie novamente.

## Arquivos

- `index.js` - Servidor principal + conexão WhatsApp
- `chatbot.js` - Respostas do bot
- `package.json` - Dependências
- `README.md` - Este arquivo
