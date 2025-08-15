// Utilitários para cálculo de rescisão trabalhista baseado na CLT



/**
 * Calcula o número de meses trabalhados com maior precisão
 */
function calcularMesesTrabalhados(dataAdmissao, dataRescisao) {
  const admissao = new Date(dataAdmissao);
  const rescisao = new Date(dataRescisao);
  
  // Validação de datas
  if (admissao > rescisao) {
    throw new Error('Data de admissão não pode ser posterior à data de rescisão');
  }
  
  let meses = (rescisao.getFullYear() - admissao.getFullYear()) * 12;
  meses -= admissao.getMonth();
  meses += rescisao.getMonth();
  
  // Se o dia da rescisão for menor que o da admissão, subtrai um mês
  if (rescisao.getDate() < admissao.getDate()) {
    meses--;
  }
  
  return Math.max(0, meses);
}

/**
 * Calcula o 13º salário proporcional
 * Considera que a partir de 15 dias trabalhados no mês, conta o mês completo
 */
function calcular13Proporcional(salario, mesesTrabalhados, dataAdmissao, dataRescisao) {
  const rescisao = new Date(dataRescisao);
  
  let mesesParaCalculo = mesesTrabalhados;
  
  // Se trabalhou 15 dias ou mais no mês da rescisão, conta o mês
  if (rescisao.getDate() >= 15) {
    mesesParaCalculo += 1;
  }
  
  // Máximo de 12 meses para o 13º
  mesesParaCalculo = Math.min(mesesParaCalculo, 12);
  
  return (salario / 12) * mesesParaCalculo;
}

/**
 * Calcula férias proporcionais (1/3 constitucional incluído)
 * Considera que a partir de 15 dias trabalhados no mês, conta o mês completo
 */
function calcularFeriasProporcionais(salario, mesesTrabalhados, dataAdmissao, dataRescisao) {
  const rescisao = new Date(dataRescisao);
  
  let mesesParaCalculo = mesesTrabalhados;
  
  // Se trabalhou 15 dias ou mais no mês da rescisão, conta o mês
  if (rescisao.getDate() >= 15) {
    mesesParaCalculo += 1;
  }
  
  // Máximo de 12 meses para férias proporcionais
  mesesParaCalculo = Math.min(mesesParaCalculo, 12);
  
  const feriasSimples = (salario / 12) * mesesParaCalculo;
  const umTercoConstitucional = feriasSimples / 3;
  return feriasSimples + umTercoConstitucional;
}

/**
 * Calcula o aviso prévio
 */
function calcularAvisoPrevio(salario, mesesTrabalhados, motivoRescisao) {
  // Aviso prévio só é devido em demissão sem justa causa ou acordo mútuo
  if (motivoRescisao !== 'demissao-sem-justa-causa' && motivoRescisao !== 'acordo-mutuo') {
    return 0;
  }
  
  // Validação: mínimo de 1 ano para ter direito ao aviso prévio proporcional
  if (mesesTrabalhados < 12) {
    // Apenas 30 dias de aviso prévio
    return (salario / 30) * 30;
  }
  
  // 30 dias base + 3 dias por ano trabalhado (máximo 90 dias)
  const anosTrabalhados = Math.floor(mesesTrabalhados / 12);
  const diasAvisoPrevio = Math.min(30 + (anosTrabalhados * 3), 90);
  
  return (salario / 30) * diasAvisoPrevio;
}

/**
 * Calcula a multa do FGTS (40% ou 20% conforme o caso)
 */
function calcularMultaFGTS(salario, mesesTrabalhados, motivoRescisao) {
  // FGTS: 8% do salário por mês trabalhado
  const saldoFGTS = salario * 0.08 * mesesTrabalhados;
  
  let percentualMulta = 0;
  
  switch (motivoRescisao) {
    case 'demissao-sem-justa-causa':
      percentualMulta = 0.4; // 40%
      break;
    case 'acordo-mutuo':
      percentualMulta = 0.2; // 20%
      break;
    default:
      percentualMulta = 0; // Sem multa
  }
  
  return {
    saldoFGTS,
    multaFGTS: saldoFGTS * percentualMulta,
    percentualMulta: percentualMulta * 100
  };
}

/**
 * Calcula salário proporcional aos dias trabalhados no mês da rescisão
 */
function calcularSalarioProporcional(salario, dataRescisao) {
  const rescisao = new Date(dataRescisao);
  const diasDoMes = new Date(rescisao.getFullYear(), rescisao.getMonth() + 1, 0).getDate();
  const diasTrabalhados = rescisao.getDate();
  
  return (salario / diasDoMes) * diasTrabalhados;
}

/**
 * Função principal para calcular a rescisão
 */
export function calcularRescisaoCompleta(dados) {
  const {
    dataAdmissao,
    dataRescisao,
    salario,
    motivoRescisao,
    avisoPrevio = true,
    fgts = true
  } = dados;
  
  // Validações básicas
  if (!dataAdmissao || !dataRescisao || !salario || !motivoRescisao) {
    throw new Error('Todos os campos obrigatórios devem ser preenchidos');
  }
  
  const salarioNum = parseFloat(salario);
  if (isNaN(salarioNum) || salarioNum <= 0) {
    throw new Error('Salário deve ser um valor válido e maior que zero');
  }
  
  // Validação de salário mínimo (valor aproximado para 2024)
  const salarioMinimo = 1412; // Valor do salário mínimo 2024
  if (salarioNum < salarioMinimo * 0.5) {
    throw new Error(`Salário informado parece estar muito baixo. Verifique o valor.`);
  }
  const mesesTrabalhados = calcularMesesTrabalhados(dataAdmissao, dataRescisao);
  
  // Cálculos básicos
  const salarioProporcional = calcularSalarioProporcional(salarioNum, dataRescisao);
  const decimoTerceiro = calcular13Proporcional(salarioNum, mesesTrabalhados, dataAdmissao, dataRescisao);
  const feriasProporcionais = calcularFeriasProporcionais(salarioNum, mesesTrabalhados, dataAdmissao, dataRescisao);
  const avisoPrevioValor = avisoPrevio ? calcularAvisoPrevio(salarioNum, mesesTrabalhados, motivoRescisao) : 0;
  
  // FGTS
  const fgtsInfo = fgts ? calcularMultaFGTS(salarioNum, mesesTrabalhados, motivoRescisao) : {
    saldoFGTS: 0,
    multaFGTS: 0,
    percentualMulta: 0
  };
  
  // Total a receber
  const totalReceber = salarioProporcional + decimoTerceiro + feriasProporcionais + avisoPrevioValor + fgtsInfo.multaFGTS;
  
  return {
    detalhes: {
      salarioProporcional,
      decimoTerceiro,
      feriasProporcionais,
      avisoPrevio: avisoPrevioValor,
      saldoFGTS: fgtsInfo.saldoFGTS,
      multaFGTS: fgtsInfo.multaFGTS,
      percentualMultaFGTS: fgtsInfo.percentualMulta
    },
    totalReceber,
    informacoes: {
      mesesTrabalhados,
      motivoRescisao,
      temDireitoAvisoPrevio: avisoPrevioValor > 0,
      temDireitoMultaFGTS: fgtsInfo.multaFGTS > 0
    },
    explicacaoJuridica: gerarExplicacaoJuridica(motivoRescisao, mesesTrabalhados, avisoPrevioValor > 0, fgtsInfo.percentualMulta)
  };
}

/**
 * Gera explicação jurídica baseada no tipo de rescisão
 */
function gerarExplicacaoJuridica(motivoRescisao, mesesTrabalhados, temAvisoPrevio, percentualMultaFGTS) {
  let explicacao = "**Base Legal (CLT - Consolidação das Leis do Trabalho):**\n\n";
  
  const anosTrabalhados = Math.floor(mesesTrabalhados / 12);
  
  switch (motivoRescisao) {
    case 'demissao-sem-justa-causa':
      explicacao += "**Demissão sem Justa Causa (Art. 477 da CLT):**\n";
      explicacao += "• **Saldo de salário:** Proporcional aos dias trabalhados no mês da rescisão\n";
      explicacao += "• **13º salário:** Proporcional aos meses trabalhados (Art. 7º, VIII da CF)\n";
      explicacao += "• **Férias proporcionais:** + 1/3 constitucional (Art. 146 da CLT)\n";
      if (temAvisoPrevio) {
        if (anosTrabalhados >= 1) {
          explicacao += `• **Aviso prévio:** ${30 + (anosTrabalhados * 3)} dias (30 dias + 3 dias por ano - Art. 487 da CLT)\n`;
        } else {
          explicacao += "• **Aviso prévio:** 30 dias (Art. 487 da CLT)\n";
        }
      }
      explicacao += `• **Multa FGTS:** ${percentualMultaFGTS}% sobre o saldo (Art. 18 da Lei 8.036/90)\n`;
      explicacao += "• **FGTS:** Liberação total do saldo para saque\n";
      explicacao += "• **Seguro-desemprego:** Direito garantido (se cumpridos os requisitos)\n";
      break;
      
    case 'demissao-com-justa-causa':
      explicacao += "**Demissão por Justa Causa (Art. 482 da CLT):**\n";
      explicacao += "• **Saldo de salário:** Apenas proporcional aos dias trabalhados\n";
      explicacao += "• **Férias vencidas:** Somente se houver período aquisitivo completo + 1/3\n";
      explicacao += "• **PERDAS:** 13º proporcional, aviso prévio, multa FGTS, seguro-desemprego\n";
      explicacao += "• **FGTS:** Saldo permanece bloqueado na conta\n";
      explicacao += "• **Motivos:** Ato de improbidade, incontinência, negociação habitual, etc.\n";
      break;
      
    case 'pedido-demissao':
      explicacao += "**Pedido de Demissão (Art. 487 da CLT):**\n";
      explicacao += "• **Saldo de salário:** Proporcional aos dias trabalhados\n";
      explicacao += "• **13º salário:** Proporcional aos meses trabalhados\n";
      explicacao += "• **Férias proporcionais:** + 1/3 constitucional\n";
      explicacao += "• **Aviso prévio:** Trabalhador deve cumprir ou indenizar o empregador\n";
      explicacao += "• **FGTS:** Saldo permanece na conta (sem direito a saque)\n";
      explicacao += "• **SEM DIREITO:** Multa FGTS e seguro-desemprego\n";
      break;
      
    case 'acordo-mutuo':
      explicacao += "**Acordo Mútuo (Art. 484-A da CLT - Lei 13.467/17):**\n";
      explicacao += "• **Saldo de salário:** Proporcional aos dias trabalhados\n";
      explicacao += "• **13º salário:** Proporcional aos meses trabalhados\n";
      explicacao += "• **Férias proporcionais:** + 1/3 constitucional\n";
      explicacao += "• **Aviso prévio:** Reduzido pela metade (50%)\n";
      explicacao += `• **Multa FGTS:** ${percentualMultaFGTS}% (metade da multa tradicional)\n`;
      explicacao += "• **FGTS:** Saque de até 80% do saldo disponível\n";
      explicacao += "• **SEM DIREITO:** Seguro-desemprego\n";
      break;
      
    case 'termino-contrato':
      explicacao += "**Término de Contrato por Prazo Determinado:**\n";
      explicacao += "• **Saldo de salário:** Proporcional aos dias trabalhados\n";
      explicacao += "• **13º salário:** Proporcional aos meses trabalhados\n";
      explicacao += "• **Férias proporcionais:** + 1/3 constitucional\n";
      explicacao += "• **FGTS:** Liberação do saldo para saque\n";
      explicacao += "• **SEM DIREITO:** Aviso prévio e multa FGTS\n";
      explicacao += "• **Seguro-desemprego:** Direito garantido (se cumpridos os requisitos)\n";
      break;
      
    default:
      explicacao += "Consulte a legislação trabalhista para casos específicos.";
  }
  
  explicacao += "\n**📋 Informações Importantes:**\n";
  explicacao += "• **Prazo para pagamento:** Até o 1º dia útil após o término do contrato\n";
  explicacao += "• **Homologação:** Obrigatória para contratos com mais de 1 ano\n";
  explicacao += "• **Documentos:** TRCT, Chaves de Conectividade Social, Exame Demissional\n";
  explicacao += "• **Cálculos:** Baseados na legislação trabalhista vigente (CLT)\n";
  explicacao += "\n⚖️ **Para situações específicas ou dúvidas, consulte um advogado trabalhista.**\n";
  
  return explicacao;
}