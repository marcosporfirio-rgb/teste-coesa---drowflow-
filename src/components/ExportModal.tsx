import React, { useState } from 'react';
import { X, Download, FileText, Code, Check, Printer, Copy, Sparkles } from 'lucide-react';
import { FLOW_NODES, FLOW_CONNECTIONS, MACRO_AREAS } from '../data/flowData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isOpen) return null;

  const generateMarkdownSummary = () => {
    return `# Coesa Solar — Arquitetura de Campanhas e Mídia (R$ 50.000)

## 1. Contexto & Diretrizes
- Produto: Energia solar por assinatura (sem obras, sem placas, sem investimento inicial).
- Praça: Concessão Cemig em Minas Gerais.
- Foco: Empresas B2B (Residencial B2C em teste apartado).
- Teto Orçamentário Mensal: R$ 50.000,00 (não é obrigação de gasto).

## 2. Distribuição do Investimento
- Meta Ads (Captação): R$ 25.000,00 (50%)
- Google Ads (Alta Intenção): R$ 10.000,00 (20%) — *Regra: saldo não consumido volta para Meta ou Reserva*
- Remarketing Multicanal: R$ 5.000,00 (10%) — *Regra: ativado proporcionalmente ao tamanho dos públicos*
- Reserva de Testes: R$ 10.000,00 (20%) — *Regra: financia testes internos sem duplicidade contábil*

## 3. Campanhas & Segmentos
- META 01 (Prospecção B2B): Alimentação, Varejo, Saúde & Serviços.
- META 02 (Escala dos Vencedores): Recebe conjuntos e criativos validados.
- GOOGLE 01 (Search Não Marca): 3 grupos (Energia por assinatura, Economia para empresas, Clientes Cemig).
- GOOGLE 02 (Search Marca): Termos institucionais e variações.
- META 03 (Remarketing): Visitantes de LP e abandonos de formulário (exclui contratados e em atendimento).
- TESTE 03 (PMax): Experimento condicionado via reserva de testes.

## 4. Faixas de Consumo e Escada de Ofertas
- Acima de R$ 2.000/mês -> 30% desconto planejado
- Acima de R$ 1.000/mês -> 25% desconto planejado
- Acima de R$ 500/mês -> 20% desconto planejado
- Acima de R$ 300/mês -> 15% desconto planejado
- Abaixo de R$ 300/mês -> Corte / Orientação comercial definida
*Premissa sujeita a confirmação comercial formal da Coesa Solar.*

## 5. Metodologia de Testes A/B
- Teste 1: Criativos (Economia Financeira vs Facilidade / Sem Placas)
- Teste 2: Landing Pages (LP Sessão Única vs LP Calculadora)
- Teste 3: Apresentação da Oferta (Formatos de comunicação do benefício na mesma faixa)

## 6. Governança e Rastreamento CRM
- 15 Atributos gravados por lead (Canal, Campanha, Conjunto, Hipótese, Segmento Declarado, Criativo, LP, Distribuidora, Cidade, Conta, Faixa, MQL, Proposta, Contrato, Motivo Perda).
- Losangos de decisão: MQL validado? Critérios de escala atingidos para transferência para META 02?
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownSummary());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleDownloadJson = () => {
    const data = {
      client: 'Coesa Solar',
      budget: 50000,
      currency: 'BRL',
      exportedAt: new Date().toISOString(),
      macroAreas: MACRO_AREAS,
      nodes: FLOW_NODES,
      connections: FLOW_CONNECTIONS
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coesa_solar_drawflow_blueprint_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-fadeIn">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Exportar Arquitetura de Mídia
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Baixe a documentação executiva completa da estrutura de campanhas da Coesa Solar em múltiplos formatos para compartilhamento interno ou configuração em plataformas de anúncio.
        </p>

        <div className="space-y-3">
          
          {/* Action 1: Print / Save to PDF */}
          <button
            onClick={handlePrint}
            className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Printer className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-white">
                  Imprimir / Salvar em PDF
                </h4>
                <p className="text-[11px] text-slate-400">
                  Gera visualização pronta para impressão ou PDF executivo
                </p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-medium">Imprimir</span>
          </button>

          {/* Action 2: Copy Markdown Brief */}
          <button
            onClick={handleCopyMarkdown}
            className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-white">
                  Copiar Resumo em Markdown
                </h4>
                <p className="text-[11px] text-slate-400">
                  Texto estruturado com regras, campanhas e faixas
                </p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
              {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMarkdown ? 'Copiado!' : 'Copiar'}</span>
            </span>
          </button>

          {/* Action 3: Download JSON Blueprint */}
          <div className="flex gap-2">
            <button
              onClick={handleDownloadJson}
              className="flex-1 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Code className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-white">
                    Baixar Blueprint em JSON
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Arquivo .json estruturado completo
                  </p>
                </div>
              </div>
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </span>
            </button>

            <button
              onClick={() => {
                const data = {
                  client: 'Coesa Solar',
                  version: '1.0.0',
                  budget: 50000,
                  currency: 'BRL',
                  presentation: PRESENTATION_SLIDES,
                  macroAreas: MACRO_AREAS,
                  nodes: FLOW_NODES,
                  connections: FLOW_CONNECTIONS,
                  budgetScenarios: BUDGET_SCENARIOS
                };
                navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                setCopiedJson(true);
                setTimeout(() => setCopiedJson(false), 2000);
              }}
              className="px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              title="Copiar JSON para Área de Transferência"
            >
              {copiedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
