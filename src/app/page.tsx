'use client';

import { useState } from 'react';
import { calcularRescisaoCompleta } from '../utils/calculoRescisao';

interface ResultadoCalculo {
  detalhes: {
    salarioProporcional: number;
    decimoTerceiro: number;
    feriasProporcionais: number;
    avisoPrevio: number;
    saldoFGTS: number;
    multaFGTS: number;
    percentualMultaFGTS: number;
  };
  totalReceber: number;
  informacoes: {
    mesesTrabalhados: number;
    motivoRescisao: string;
    temDireitoAvisoPrevio: boolean;
    temDireitoMultaFGTS: boolean;
  };
  explicacaoJuridica: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    dataAdmissao: '',
    dataRescisao: '',
    salario: '',
    motivoRescisao: 'demissao-sem-justa-causa',
    avisoPrevio: true,
    fgts: true,
    valeTransporte: false,
    valeRefeicao: false,
    planoSaude: false
  });

  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calcularRescisao = () => {
    try {
      if (!formData.dataAdmissao || !formData.dataRescisao || !formData.salario) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      const resultadoCalculo = calcularRescisaoCompleta({
        dataAdmissao: formData.dataAdmissao,
        dataRescisao: formData.dataRescisao,
        salario: formData.salario,
        motivoRescisao: formData.motivoRescisao,
        avisoPrevio: formData.avisoPrevio,
        fgts: formData.fgts
      });
      
      setResultado(resultadoCalculo);
    } catch (error) {
      alert('Erro no cálculo: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
              Calculadora de Rescisão Trabalhista
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Calcule com precisão todos os valores de rescisão trabalhista baseados na CLT. 
              Ferramenta gratuita, rápida e confiável para profissionais de RH e trabalhadores.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% Gratuito
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Baseado na CLT
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cálculos Precisos
              </span>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Dados do Trabalhador
                </h2>
              </div>
            
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Data de Admissão *
                  </label>
                  <input
                    type="date"
                    name="dataAdmissao"
                    value={formData.dataAdmissao}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Data de Rescisão *
                  </label>
                  <input
                    type="date"
                    name="dataRescisao"
                    value={formData.dataRescisao}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Salário Bruto Mensal (R$) *
                  </label>
                  <input
                    type="number"
                    name="salario"
                    value={formData.salario}
                    onChange={handleInputChange}
                    placeholder="Ex: 2500.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                    required
                  />
              </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Motivo da Rescisão *
                  </label>
                  <select
                    name="motivoRescisao"
                    value={formData.motivoRescisao}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                  >
                    <option value="demissao-sem-justa-causa" className="bg-gray-800 text-white">Demissão sem justa causa</option>
                    <option value="demissao-com-justa-causa" className="bg-gray-800 text-white">Demissão com justa causa</option>
                    <option value="pedido-demissao" className="bg-gray-800 text-white">Pedido de demissão</option>
                    <option value="acordo-mutuo" className="bg-gray-800 text-white">Acordo mútuo</option>
                    <option value="termino-contrato" className="bg-gray-800 text-white">Término de contrato</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    Benefícios Adicionais
                  </label>
                  
                  <div className="space-y-3">
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        name="valeTransporte"
                        checked={formData.valeTransporte}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-200 group-hover:text-white transition-colors">Vale Transporte</span>
                    </label>
                    
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        name="valeRefeicao"
                        checked={formData.valeRefeicao}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-200 group-hover:text-white transition-colors">Vale Refeição</span>
                    </label>
                    
                    <label className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        name="planoSaude"
                        checked={formData.planoSaude}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-200 group-hover:text-white transition-colors">Plano de Saúde</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="avisoPrevio"
                      checked={formData.avisoPrevio}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm text-white">
                      Considerar aviso prévio
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="fgts"
                      checked={formData.fgts}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="text-sm text-white">
                      Considerar FGTS
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calcularRescisao}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calcular Rescisão
                </button>
            </div>
          </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Resultado do Cálculo
                </h2>
              </div>
            
            {resultado ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-green-300">
                      Valor Total da Rescisão
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    R$ {resultado.totalReceber.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Detalhamento dos Valores
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                      <p className="text-sm text-gray-300 mb-1">Salário Proporcional</p>
                      <p className="font-bold text-white text-lg">
                        R$ {resultado.detalhes.salarioProporcional.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                      <p className="text-sm text-gray-300 mb-1">13º Proporcional</p>
                      <p className="font-bold text-white text-lg">
                        R$ {resultado.detalhes.decimoTerceiro.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                      <p className="text-sm text-gray-300 mb-1">Férias Proporcionais + 1/3</p>
                      <p className="font-bold text-white text-lg">
                        R$ {resultado.detalhes.feriasProporcionais.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    
                    {resultado.detalhes.avisoPrevio > 0 && (
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                        <p className="text-sm text-gray-300 mb-1">Aviso Prévio</p>
                        <p className="font-bold text-white text-lg">
                          R$ {resultado.detalhes.avisoPrevio.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                      <p className="text-sm text-gray-300 mb-1">Saldo FGTS</p>
                      <p className="font-bold text-white text-lg">
                        R$ {resultado.detalhes.saldoFGTS.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    
                    {resultado.detalhes.multaFGTS > 0 && (
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all duration-200">
                        <p className="text-sm text-gray-300 mb-1">Multa FGTS ({resultado.detalhes.percentualMultaFGTS}%)</p>
                        <p className="font-bold text-white text-lg">
                          R$ {resultado.detalhes.multaFGTS.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Informações do Contrato
                  </h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Tempo trabalhado: {Math.floor(resultado.informacoes.mesesTrabalhados / 12)} anos e {resultado.informacoes.mesesTrabalhados % 12} meses
                    </p>
                    {resultado.informacoes.temDireitoAvisoPrevio && (
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Tem direito a aviso prévio
                      </p>
                    )}
                    {resultado.informacoes.temDireitoMultaFGTS && (
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Tem direito à multa do FGTS
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Explicação Jurídica
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {resultado.explicacaoJuridica}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">Aguardando Cálculo</p>
                <p className="text-sm">Preencha os dados e clique em &quot;Calcular Rescisão&quot; para ver o resultado detalhado.</p>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-20 space-y-16">
          {/* About Section */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              O que é Rescisão Trabalhista?
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                A <strong className="text-white">rescisão trabalhista</strong> é o processo legal que marca o fim do contrato de trabalho entre empregador e empregado. Este momento crucial na vida profissional envolve o cálculo preciso de diversos direitos trabalhistas garantidos pela Consolidação das Leis do Trabalho (CLT).
              </p>
              <p>
                Nossa <strong className="text-white">calculadora de rescisão trabalhista</strong> foi desenvolvida para simplificar este processo complexo, oferecendo cálculos precisos e atualizados conforme a legislação brasileira vigente. Seja qual for o motivo da rescisão - demissão sem justa causa, pedido de demissão, acordo mútuo ou término de contrato - nossa ferramenta garante que você conheça exatamente seus direitos.
              </p>
            </div>
          </section>

          {/* Types of Termination */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Tipos de Rescisão Trabalhista
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3">Demissão sem Justa Causa</h3>
                <p className="text-gray-300 mb-4">
                  Quando o empregador decide encerrar o contrato sem que o empregado tenha cometido falta grave. É o tipo mais comum de rescisão.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Aviso prévio (trabalhado ou indenizado)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Saldo de salário e 13º proporcional</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Férias proporcionais + 1/3</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Saque do FGTS + multa de 40%</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Seguro-desemprego (se elegível)</span>
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-300 mb-3">Demissão com Justa Causa</h3>
                <p className="text-gray-300 mb-4">
                  Ocorre quando o empregado comete falta grave prevista em lei, como abandono de emprego, indisciplina ou ato de improbidade.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Saldo de salário</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Férias vencidas (se houver)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span className="text-gray-300">Sem aviso prévio</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span className="text-gray-300">Sem 13º proporcional</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span className="text-gray-300">Sem multa do FGTS</span>
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Pedido de Demissão</h3>
                <p className="text-gray-300 mb-4">
                  Quando o próprio empregado decide sair da empresa por vontade própria, comunicando formalmente sua decisão.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Saldo de salário e 13º proporcional</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Férias proporcionais + 1/3</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span className="text-gray-300">Aviso prévio (deve cumprir ou indenizar)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span className="text-gray-300">Sem multa do FGTS</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span className="text-gray-300">Sem seguro-desemprego</span>
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-300 mb-3">Acordo Mútuo</h3>
                <p className="text-gray-300 mb-4">
                  Modalidade criada pela Reforma Trabalhista de 2017, onde empregador e empregado concordam em encerrar o contrato.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Saldo de salário e 13º proporcional</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Férias proporcionais + 1/3</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">50% do aviso prévio</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">20% de multa do FGTS</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">80% do saque do FGTS</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Rights and Benefits */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Direitos Trabalhistas na Rescisão
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-300 mb-3">Verbas Rescisórias Básicas</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Saldo de salário dos dias trabalhados</li>
                  <li>• 13º salário proporcional</li>
                  <li>• Férias proporcionais + 1/3 constitucional</li>
                  <li>• Férias vencidas (se aplicável)</li>
                  <li>• Horas extras pendentes</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-300 mb-3">FGTS e Benefícios</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Saldo do FGTS acumulado</li>
                  <li>• Multa rescisória (20% ou 40%)</li>
                  <li>• Seguro-desemprego (quando aplicável)</li>
                  <li>• Vale-transporte proporcional</li>
                  <li>• Vale-refeição proporcional</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-300 mb-3">Aviso Prévio</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Mínimo de 30 dias</li>
                  <li>• +3 dias por ano trabalhado</li>
                  <li>• Máximo de 90 dias</li>
                  <li>• Pode ser trabalhado ou indenizado</li>
                  <li>• Redução de 2h/dia ou 7 dias corridos</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Perguntas Frequentes sobre Rescisão Trabalhista
            </h2>
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Quando tenho direito ao seguro-desemprego?</h3>
                <p className="text-gray-300">
                  O seguro-desemprego é devido em casos de demissão sem justa causa, rescisão indireta, suspensão temporária do contrato e acordo mútuo. É necessário ter trabalhado pelo menos 12 meses nos últimos 18 meses (primeira solicitação) ou 9 meses nos últimos 12 meses (demais solicitações).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Como é calculado o aviso prévio proporcional?</h3>
                <p className="text-gray-300">
                  O aviso prévio tem duração mínima de 30 dias, acrescido de 3 dias para cada ano completo de serviço prestado ao mesmo empregador, limitado a 90 dias. Por exemplo: 5 anos de trabalho = 30 + (5 × 3) = 45 dias de aviso prévio.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Qual a diferença entre rescisão e demissão?</h3>
                <p className="text-gray-300">
                  Rescisão é o termo técnico que engloba todas as formas de término do contrato de trabalho. Demissão é uma modalidade específica de rescisão, onde o empregador decide encerrar o contrato (com ou sem justa causa). Outras modalidades incluem pedido de demissão, acordo mútuo e término natural do contrato.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Posso sacar o FGTS em qualquer tipo de rescisão?</h3>
                <p className="text-gray-300">
                  O saque total do FGTS é permitido em demissão sem justa causa, rescisão indireta, término de contrato por prazo determinado, aposentadoria, falecimento e outras situações específicas. No acordo mútuo, pode-se sacar 80% do saldo. Em pedido de demissão e demissão por justa causa, o FGTS permanece na conta.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Information */}
          <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Base Legal e Atualizações
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Nossa calculadora de rescisão trabalhista está sempre atualizada conforme a <strong className="text-white">Consolidação das Leis do Trabalho (CLT)</strong>, a <strong className="text-white">Constituição Federal de 1988</strong> e as alterações introduzidas pela <strong className="text-white">Lei 13.467/2017 (Reforma Trabalhista)</strong>.
              </p>
              <p>
                Os cálculos consideram as mais recentes jurisprudências do <strong className="text-white">Tribunal Superior do Trabalho (TST)</strong> e as orientações do <strong className="text-white">Ministério do Trabalho e Emprego</strong>, garantindo precisão e conformidade legal em todos os resultados apresentados.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
                <p className="text-yellow-200 text-sm">
                  <strong>Importante:</strong> Esta ferramenta oferece cálculos estimativos baseados na legislação vigente. Para situações específicas ou complexas, recomendamos consultar um advogado trabalhista qualificado.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
