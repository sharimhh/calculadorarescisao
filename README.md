# 📊 Calculadora de Rescisão Trabalhista

Uma aplicação web moderna para calcular rescisões trabalhistas de acordo com a CLT (Consolidação das Leis do Trabalho).

## 🚀 Funcionalidades

- ✅ **Cálculo Preciso**: Baseado na legislação trabalhista brasileira (CLT)
- 📱 **Design Responsivo**: Interface otimizada para desktop e mobile
- ⚖️ **Explicação Jurídica**: Detalhamento dos direitos por tipo de rescisão
- 🔢 **Validações**: Verificação de dados de entrada e valores mínimos
- 📋 **Resultados Detalhados**: Breakdown completo de todos os valores

## 💼 Tipos de Rescisão Suportados

1. **Demissão sem Justa Causa**
   - Saldo de salário proporcional
   - 13º salário proporcional
   - Férias proporcionais + 1/3
   - Aviso prévio (30 dias + 3 dias por ano)
   - Multa de 40% sobre FGTS
   - Seguro-desemprego

2. **Demissão com Justa Causa**
   - Apenas saldo de salário
   - Férias vencidas (se houver)

3. **Pedido de Demissão**
   - Saldo de salário proporcional
   - 13º salário proporcional
   - Férias proporcionais + 1/3

4. **Acordo Mútuo**
   - Todos os direitos com reduções específicas
   - Aviso prévio reduzido (50%)
   - Multa de 20% sobre FGTS
   - Saque de 80% do FGTS

5. **Término de Contrato**
   - Direitos básicos sem aviso prévio
   - Liberação do FGTS

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Hooks** - Gerenciamento de estado

## 📦 Instalação e Execução

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd calculadorarescisao

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 🚀 Deploy na Vercel

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push na branch main

## 📊 Cálculos Implementados

### Salário Proporcional
- Baseado nos dias trabalhados no mês da rescisão
- Fórmula: `(salário / dias do mês) * dias trabalhados`

### 13º Salário Proporcional
- Considera meses completos trabalhados
- A partir de 15 dias no mês, conta o mês completo
- Fórmula: `(salário / 12) * meses trabalhados`

### Férias Proporcionais
- Inclui 1/3 constitucional
- A partir de 15 dias no mês, conta o mês completo
- Fórmula: `((salário / 12) * meses) * 1.333`

### Aviso Prévio
- 30 dias base + 3 dias por ano trabalhado
- Máximo de 90 dias
- Apenas para demissão sem justa causa e acordo mútuo

### FGTS e Multa
- Saldo: 8% do salário por mês trabalhado
- Multa: 40% (demissão) ou 20% (acordo mútuo)

## ⚖️ Base Legal

- **CLT** - Consolidação das Leis do Trabalho
- **Constituição Federal** - Art. 7º
- **Lei 8.036/90** - FGTS
- **Lei 13.467/17** - Reforma Trabalhista

## 📝 Observações Importantes

- Os cálculos são estimativas baseadas na legislação vigente
- Para casos específicos, consulte um advogado trabalhista
- Convenções coletivas podem alterar alguns direitos
- Valores podem variar conforme acordos individuais

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**⚠️ Disclaimer**: Esta ferramenta é apenas para fins informativos e educacionais. Para questões legais específicas, sempre consulte um profissional qualificado.
