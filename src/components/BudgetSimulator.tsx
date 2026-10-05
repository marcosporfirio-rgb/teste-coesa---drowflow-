import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, AlertTriangle, ShieldCheck, 
  RotateCcw, Sparkles, ArrowRight, CheckCircle2, Sliders, Info
} from 'lucide-react';
import { BUDGET_SCENARIOS } from '../data/flowData';
import { BudgetScenario } from '../types';

export const BudgetSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('cenario_base');
  const [metaBudget, setMetaBudget] = useState<number>(25000);
  const [googleBudget, setGoogleBudget] = useState<number>(10000);
  const [remarketingBudget, setRemarketingBudget] = useState<number>(5000);
  const [reserveBudget, setReserveBudget] = useState<number>(10000);

  // Apply a preset scenario
  const handleApplyScenario = (scenario: BudgetScenario) => {
    setSelectedScenario(scenario.id);
    setMetaBudget(scenario.meta);
    setGoogleBudget(scenario.google);
    setRemarketingBudget(scenario.remarketing);
    setReserveBudget(scenario.reserva);
  };

  const totalBudget = metaBudget + googleBudget + remarketingBudget + reserveBudget;
  const isBudgetExceeded = totalBudget > 50000;
  const remainingBudget = 50000 - totalBudget;

  // Projections model based on historical averages in solar B2B energy subscriptions
  // Meta: ~R$ 130/MQL
  // Google Search: ~R$ 210/MQL
  // Remarketing: ~R$ 95/MQL
  // Reserva (Testes): ~R$ 250/MQL (fase exploratória)
  const metaMQLs = Math.round(metaBudget / 130);
  const googleMQLs = Math.round(googleBudget / 210);
  const remarketingMQLs = Math.round(remarketingBudget / 95);
  const reserveMQLs = Math.round(reserveBudget / 250);

  const totalMQLs = metaMQLs + googleMQLs + remarketingMQLs + reserveMQLs;
  const avgCostPerMQL = totalBudget > 0 && totalMQLs > 0 ? (totalBudget / totalMQLs).toFixed(2) : '0.00';
  
  // Commercial advance benchmark: ~18% MQL -> Proposal, ~35% Proposal -> Contract
  const estimatedProposals = Math.round(totalMQLs * 0.22);
  const estimatedContracts = Math.max(1, Math.round(estimatedProposals * 0.38));
  const estimatedCAC = estimatedContracts > 0 ? Math.round(totalBudget / estimatedContracts) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold border border-amber-500/30">
            1
          </span>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold">
            Simulador de Governança & Regras
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Arquitetura de Investimento — R$ 50.000 Mensais
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          R$ 50.000 é o teto máximo mensal disponível, não uma obrigação cega de gasto. Simule cenários com aplicação das regras dinâmicas de repasse entre Meta, Google, Remarketing e Reserva de Testes.
        </p>
      </div>

      {/* Preset Scenarios Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {BUDGET_SCENARIOS.map(sc => (
          <button
            key={sc.id}
            onClick={() => handleApplyScenario(sc)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedScenario === sc.id
                ? 'bg-amber-950/40 border-amber-500/60 ring-2 ring-amber-500/30 shadow-xl'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
            }`}
          >
            <span className="text-[11px] font-mono text-amber-400 block font-semibold">Cenário</span>
            <h4 className="text-xs font-bold text-slate-100 mt-0.5 line-clamp-1">
              {sc.name}
            </h4>
            <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {sc.description}
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Proj. MQLs:</span>
              <span className="text-emerald-400 font-bold">{sc.projectedMQLs}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Budget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Panel */}
        <div className="lg:col-span-2 bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Alocação por Frente de Mídia
              </h3>
            </div>
            <button
              onClick={() => handleApplyScenario(BUDGET_SCENARIOS[0])}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Resetar Padrão</span>
            </button>
          </div>

          {/* Slider 1: Meta Ads */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Meta Ads — Captação B2B (50% base)</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Prospecção (META 01) e Escala de Vencedores (META 02)
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-white tabular-nums bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                R$ {metaBudget.toLocaleString('pt-BR')} ({Math.round((metaBudget / 50000) * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="40000"
              step="1000"
              value={metaBudget}
              onChange={(e) => {
                setMetaBudget(Number(e.target.value));
                setSelectedScenario('custom');
              }}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Slider 2: Google Ads */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Google Ads — Alta Intenção (20% base)</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Search Não Marca (3 grupos) + Search Marca Institucional
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-white tabular-nums bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                R$ {googleBudget.toLocaleString('pt-BR')} ({Math.round((googleBudget / 50000) * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={googleBudget}
              onChange={(e) => {
                setGoogleBudget(Number(e.target.value));
                setSelectedScenario('custom');
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Slider 3: Remarketing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>Remarketing Multicanal (10% base)</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Recuperação de LPs e formulários (exclui contratados)
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-white tabular-nums bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                R$ {remarketingBudget.toLocaleString('pt-BR')} ({Math.round((remarketingBudget / 50000) * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={remarketingBudget}
              onChange={(e) => {
                setRemarketingBudget(Number(e.target.value));
                setSelectedScenario('custom');
              }}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Slider 4: Reserva de Testes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Reserva de Testes (20% base)</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Financiamento de novos criativos, PMax e novas LPs
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-white tabular-nums bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                R$ {reserveBudget.toLocaleString('pt-BR')} ({Math.round((reserveBudget / 50000) * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="1000"
              value={reserveBudget}
              onChange={(e) => {
                setReserveBudget(Number(e.target.value));
                setSelectedScenario('custom');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Strict Rules Highlights */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Regras Críticas da Governança Coesa</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong>Google sem consumo forçado:</strong> O canal não recebe R$ 10k automático. Se o volume de busca qualificada em MG for menor, o saldo retorna para Meta ou Reserva.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong>Remarketing sob demanda:</strong> Depende estritamente do volume acumulado de público nos pixels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong>Sem bitributação:</strong> A reserva financia testes executados dentro dos canais, nunca contabilizando a mesma despesa duas vezes.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Projection KPI Summary Card */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Status Orçamentário
            </span>
            <div className="flex items-baseline justify-between">
              <span className={`text-2xl font-black font-mono tabular-nums ${
                isBudgetExceeded ? 'text-rose-400' : 'text-white'
              }`}>
                R$ {totalBudget.toLocaleString('pt-BR')}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                / R$ 50.000 teto
              </span>
            </div>

            {isBudgetExceeded ? (
              <div className="mt-2 text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/30 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Teto de R$ 50.000 excedido em R$ {(totalBudget - 50000).toLocaleString('pt-BR')}!</span>
              </div>
            ) : remainingBudget > 0 ? (
              <div className="mt-2 text-xs text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30 flex items-center justify-between">
                <span>Saldo em caixa não alocado:</span>
                <span className="font-mono font-bold">R$ {remainingBudget.toLocaleString('pt-BR')}</span>
              </div>
            ) : (
              <div className="mt-2 text-xs text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% do teto mensal alocado com equilíbrio</span>
              </div>
            )}

            {/* Projections Matrix */}
            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                Projeção de Performance Estimada
              </h4>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total MQLs Projetados</span>
                  <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                    ~ {totalMQLs} MQLs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Custo Médio / MQL</span>
                  <span className="text-sm font-bold font-mono text-slate-200 tabular-nums">
                    R$ {avgCostPerMQL}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Estudo / Propostas</span>
                  <span className="text-base font-bold font-mono text-slate-200 tabular-nums">
                    ~ {estimatedProposals}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">22% de MQLs</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block">Contratos Assinados</span>
                  <span className="text-base font-bold font-mono text-amber-400 tabular-nums">
                    ~ {estimatedContracts}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">38% de propostas</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">CAC Estimado (Mídia):</span>
                <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                  R$ {estimatedCAC.toLocaleString('pt-BR')} / contrato
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed italic">
            *Projeções baseadas em benchmarks de energia solar por assinatura em Minas Gerais (área Cemig). Resultados finais dependem da taxa de aprovação técnica das faturas e fechamento da equipe comercial.
          </div>
        </div>

      </div>

    </div>
  );
};
