function getResponse(message) {
  const lower = message.toLowerCase().trim();

  // Saudações
  if (['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi', 'eai', 'fala', 'opa', 'eae'].some(g => lower.includes(g))) {
    return {
      text: 'Oi! Bem-vinda à Clínica Amanda Souza! 💖\n\nComo posso te ajudar?\n\nDigite:\n• *serviços* - Ver nossos serviços\n• *preços* - Ver valores\n• *agendar* - Marcar horário\n• *localização* - Endereço\n• *horário* - Horário de funcionamento'
    };
  }

  // Serviços
  if (['serviço', 'serviços', 'servico', 'servicos', 'o que faz', 'quais', 'tudo'].some(k => lower.includes(k))) {
    return {
      text: '美容 *Nossos Serviços:*\n\n🌸 *Limpeza de Pele* - Limpeza profunda com extração\n\n✨ *Design de Sobrancelhas* - Design personalizado com henna\n\n💄 *Extensão de Cílios* - Fio a fio ou volume russo\n\n💆 *Massagem Relaxante* - Alívio de tensões\n\n🖌️ *Sobrancelha Fio a Fio* - Microblading natural\n\n💫 *Peeling Facial* - Renovação celular\n\n🧴 *Depilação* - Cera quente ou fria\n\nDigite o nome do serviço para ver detalhes!'
    };
  }

  // Preços
  if (['preço', 'precos', 'preç', 'quanto', 'valor', 'custa', 'taxa'].some(k => lower.includes(k))) {
    return {
      text: '💰 *Nossos Preços:*\n\n🌸 Limpeza de Pele: a partir de *R$ 80*\n\n✨ Design de Sobrancelhas: a partir de *R$ 35*\n\n💄 Extensão de Cílios: a partir de *R$ 120*\n\n💆 Massagem Relaxante: a partir de *R$ 100*\n\n🖌️ Sobrancelha Fio a Fio: a partir de *R$ 200*\n\n🧴 Depilação: a partir de *R$ 25*\n\n💫 Peeling Facial: a partir de *R$ 150*\n\n📅 Deseja agendar? Envie *agendar*!'
    };
  }

  // Agendamento
  if (['agendar', 'agendamento', 'marcar', 'horário', 'horario', 'reservar', 'quer marcar', 'quero agendar'].some(k => lower.includes(k))) {
    return {
      text: '📅 *Para agendar:*\n\n📱 *WhatsApp:* (21) 99999-0000\n📍 *Local:* Rua Example, 123 - Centro, Belford Roxo\n\n⏰ *Horário:*\nSeg-Sex: 9h às 19h\nSáb: 9h às 14h\n\nQual serviço você deseja agendar?'
    };
  }

  // Localização
  if (['onde', 'localização', 'localizacao', 'endereço', 'endereco', 'fica', 'como chegar', 'mapa', 'chegar'].some(k => lower.includes(k))) {
    return {
      text: '📍 *Localização:*\n\nRua Example, 123 - Centro\nBelford Roxo - RJ\n\n⏰ *Horário:*\nSeg-Sex: 9h às 19h\nSáb: 9h às 14h\n\n📱 WhatsApp: (21) 99999-0000'
    };
  }

  // Horário
  if (['horário', 'horario', 'funcionamento', 'abre', 'fecha', 'que horas', 'hora'].some(k => lower.includes(k))) {
    return {
      text: '⏰ *Horário de Funcionamento:*\n\n📅 Segunda a Sexta: 9h às 19h\n📅 Sábado: 9h às 14h\n📅 Domingo: Fechado'
    };
  }

  // Limpeza de Pele
  if (['limpeza', 'limpar', 'pele', 'extrair', 'facial'].some(k => lower.includes(k))) {
    return {
      text: '🌸 *Limpeza de Pele*\n\n✅ Limpeza profunda\n✅ Extração de impurezas\n✅ Máscara personalizada\n✅ Hidratação\n\n⏱️ Duração: ~60 min\n💰 A partir de *R$ 80*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Design de Sobrancelhas
  if (['sobrancelha', 'sobrancelhas', 'design', 'henna'].some(k => lower.includes(k))) {
    return {
      text: '✨ *Design de Sobrancelhas*\n\n✅ Análise do formato do rosto\n✅ Design sob medida\n✅ Henna ou fio a fio\n\n⏱️ Duração: ~30 min\n💰 A partir de *R$ 35*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Cílios
  if (['cílio', 'cílios', 'cilio', 'cilios', 'alongamento', 'extensão', 'extensao', 'volume russo'].some(k => lower.includes(k))) {
    return {
      text: '💄 *Extensão de Cílios*\n\n✅ Fio a fio natural\n✅ Volume russo\n✅ Volume molhado\n\n⏱️ Duração: ~120 min\n💰 A partir de *R$ 120*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Massagem
  if (['massagem', 'massage', 'relaxar', 'relaxante', 'tensão', 'tensao', 'stress', 'estresse'].some(k => lower.includes(k))) {
    return {
      text: '💆 *Massagem Relaxante*\n\n✅ Alívio de tensões\n✅ Óleos essenciais\n✅ Ambiente acolhedor\n\n⏱️ Duração: ~60 min\n💰 A partir de *R$ 100*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Fio a Fio
  if (['fio a fio', 'microblading', 'micropigmentação', 'micropigmentacao'].some(k => lower.includes(k))) {
    return {
      text: '🖌️ *Sobrancelha Fio a Fio (Microblading)*\n\n✅ Resultado ultra natural\n✅ Duração de 1-2 anos\n✅ Pós-procedimento incluído\n\n⏱️ Duração: ~90 min\n💰 A partir de *R$ 200*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Peeling
  if (['peeling', 'peel', 'mancha', 'cicatriz', 'renovação', 'renovacao'].some(k => lower.includes(k))) {
    return {
      text: '💫 *Peeling Facial*\n\n✅ Renovação celular\n✅ Tratamento de manchas\n✅ Melhora da textura da pele\n\n⏱️ Duração: ~45 min\n💰 A partir de *R$ 150*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Depilação
  if (['depilação', 'depilacao', 'cera', 'pelos', 'depilar'].some(k => lower.includes(k))) {
    return {
      text: '🧴 *Depilação*\n\n✅ Cera quente ou fria\n✅ Diversas regiões\n✅ Resultado duradouro\n\n⏱️ Duração: varia\n💰 A partir de *R$ 25*\n\n📅 Quer agendar? Envie *agendar*!'
    };
  }

  // Obrigado
  if (['obrigado', 'obrigada', 'vlw', 'valeu', 'agradeço'].some(k => lower.includes(k))) {
    return {
      text: 'De nada! 💖\nFoi um prazer ajudar!\n\nSe precisar de algo mais, é só enviar uma mensagem!'
    };
  }

  // Tchau
  if (['tchau', 'bye', 'até logo', 'ate logo', 'adeus', 'flw'].some(k => lower.includes(k))) {
    return {
      text: 'Foi um prazer! 💖\nAté mais! Cuide-se! 🌸\n\nQualquer coisa, é só chamar!'
    };
  }

  // Fallback
  return {
    text: 'Desculpe, não entendi. 😊\n\nPosso ajudar com:\n\n• *serviços* - Ver nossos serviços\n• *preços* - Ver valores\n• *agendar* - Marcar horário\n• *localização* - Endereço\n• *horário* - Horário de funcionamento\n\nOu envie o nome de um serviço:\n• limpeza\n• sobrancelha\n• cílios\n• massagem\n• fio a fio\n• peeling\n• depilação'
  };
}

module.exports = { getResponse };
