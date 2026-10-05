import React, { useState } from 'react';
import { 
  Building2, TrendingUp, Layers, CheckCircle2, AlertTriangle, 
  HelpCircle, ArrowRight, ShieldAlert, Sparkles, Filter, ChevronRight,
  Database, UserCheck, Flame, Zap
} from 'lucide-react';
import { MACRO_AREAS, FLOW_NODES } from '../data/flowData';
import { FlowNode } from '../types';

interface AreaOverviewProps {
  onSelectNode: (node: FlowNode) => void;
  onNavigateToCanvas: (areaId: number) => void;
}

export const AreaOverview: React.FC<AreaOverviewProps> = ({
  onSelectNode,
  onNavigateToCanvas
}) => {
  const [selectedAreaId, setSelectedAreaId] = useState<number>(1);
  const currentArea = MACRO_AREAS.find(a => a.id === selectedAreaId) || MACRO_AREAS[0];
  const areaNodes = FLOW_NODES.filter(n => n.area === currentArea.id);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      {/* 5 Macro Areas Navigation Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto shadow-lg">
        {MACRO_AREAS.map(area => {
          const isActive = area.id === selectedAreaId;
          return (
            <button
              key={area.id}
              onClick={() => setSelectedAreaId(area.id)}
              className={`flex-1 min-w-[170px] p-3 rounded-xl text-left transition-all ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  Área 0{area.id}
                </span>
                <span className="text-[10px] font-mono opacity-80">{area.badge}</span>
              </div>
              <h4 className="text-xs font-bold mt-1.5 truncate">
                {area.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Selected Area Hero Header */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Área {currentArea.id} de 5
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {currentArea.badge}
            </span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight">
            {currentArea.title}
          </h2>

          <p className="text-base text-slate-300 font-medium">
            {currentArea.subtitle}
          </p>

          <p className="text-sm text-slate-400 leading-relaxed pt-1">
            {currentArea.description}
          </p>

          <div className="pt-3 flex items-center gap-3">
            <button
              onClick={() => onNavigateToCanvas(currentArea.id)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Ver no Draw Flow Interativo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentArea.metrics.map((m, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-mono">{m.label}</span>
              <span className="text-sm font-bold text-amber-300 font-mono mt-0.5 block">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rules & Nodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Key Guidelines for this Area */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Regras & Diretrizes do Brief</span>
            </h3>

            <ul className="space-y-3">
              {currentArea.keyRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Area specific alert if Area 3 (Premissas Comerciais) */}
          {currentArea.id === 3 && (
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>CONFIRMAÇÃO COMERCIAL OBRIGATÓRIA</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Os percentuais de desconto (15% a 30%) são condições planejadas sob hipótese. A Coesa deve validar a elegibilidade técnica e as regras nos limites exatos de fatura antes da veiculação de anúncios abertos.
              </p>
            </div>
          )}

          {/* Area specific alert if Area 4 (Testes A/B) */}
          {currentArea.id === 4 && (
            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>SEQUÊNCIA DE TESTES OBRIGATÓRIA</span>
              </div>
              <p className="text-xs text-blue-200/90 leading-relaxed">
                Primeiro roda-se o <strong>Teste 1 (Criativos)</strong> mantendo a mesma LP de referência. O criativo vencedor é então utilizado no <strong>Teste 2 (Landing Pages: Sessão Única vs Calculadora)</strong>. Jamais altere duas variáveis na mesma rodada.
              </p>
            </div>
          )}
        </div>

        {/* Right: Flow Nodes belonging to this Area */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Blocos Pertencentes à Área {currentArea.id} ({areaNodes.length})
            </h3>
            <span className="text-xs text-slate-400">
              Clique em qualquer card para ver especificação
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {areaNodes.map(node => {
              const isDecision = node.type === 'decision';
              const hasPending = node.details.pendingConfirmation && node.details.pendingConfirmation.length > 0;

              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {node.type}
                      </span>
                      {node.budget && (
                        <span className="text-xs font-mono font-bold text-amber-400">
                          R$ {node.budget.toLocaleString('pt-BR')}
                        </span>
                      )}
                      {node.discount && (
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                          {node.discount}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {node.title}
                    </h4>

                    {node.subtitle && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {node.subtitle}
                      </p>
                    )}

                    {hasPending && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>Confirmar premissa com Coesa</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="truncate max-w-[160px]">{node.code}</span>
                    <span className="flex items-center gap-1 text-slate-300 group-hover:text-amber-400 font-sans font-medium transition-colors">
                      <span>Ver detalhes</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
