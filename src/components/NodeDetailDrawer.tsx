import React, { useState, useEffect } from 'react';
import { 
  X, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2, 
  HelpCircle, Target, TrendingUp, ShieldCheck, DollarSign,
  FileText, ExternalLink, Sparkles, Copy, Check
} from 'lucide-react';
import { FlowNode } from '../types';
import { FLOW_NODES, FLOW_CONNECTIONS } from '../data/flowData';

interface NodeDetailDrawerProps {
  node: FlowNode | null;
  onClose: () => void;
  onSelectNodeById: (nodeId: string) => void;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  node,
  onClose,
  onSelectNodeById
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [userNotes, setUserNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'connections' | 'notes'>('details');

  // Load custom notes from localStorage if available
  useEffect(() => {
    if (node) {
      const saved = localStorage.getItem(`coesa_notes_${node.id}`);
      setUserNotes(saved || '');
      setActiveTab('details');
    }
  }, [node]);

  const handleSaveNotes = (text: string) => {
    setUserNotes(text);
    if (node) {
      localStorage.setItem(`coesa_notes_${node.id}`, text);
    }
  };

  const handleCopyCode = () => {
    if (node?.code) {
      navigator.clipboard.writeText(node.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (!node) return null;

  // Find incoming and outgoing connections
  const incomingConnections = FLOW_CONNECTIONS.filter(c => c.to === node.id);
  const outgoingConnections = FLOW_CONNECTIONS.filter(c => c.from === node.id);

  const incomingNodes = incomingConnections
    .map(c => ({ conn: c, node: FLOW_NODES.find(n => n.id === c.from) }))
    .filter((item): item is { conn: typeof incomingConnections[0]; node: FlowNode } => Boolean(item.node));

  const outgoingNodes = outgoingConnections
    .map(c => ({ conn: c, node: FLOW_NODES.find(n => n.id === c.to) }))
    .filter((item): item is { conn: typeof outgoingConnections[0]; node: FlowNode } => Boolean(item.node));

  const hasPendingConfirmation = node.details.pendingConfirmation && node.details.pendingConfirmation.length > 0;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col transition-all duration-300">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Área {node.area}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {node.type}
              </span>
              {node.status && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded text-emerald-300 bg-emerald-950/40 border border-emerald-500/30">
                  {node.status}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-white leading-tight">
              {node.title}
            </h3>
            {node.subtitle && (
              <p className="text-xs text-slate-400 mt-1">
                {node.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="Fechar Detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Naming taxonomy & Copy button */}
        {node.code && (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Nomenclatura Padrão</span>
              <p className="text-xs font-mono text-amber-300 truncate select-all">{node.code}</p>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title="Copiar Nomenclatura"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Sub-nav Tabs */}
        <div className="flex items-center gap-1 mt-4 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'details' ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Especificação
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'connections' ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Conexões ({incomingNodes.length + outgoingNodes.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'notes' ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Anotações
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        
        {/* TAB 1: DETAILS */}
        {activeTab === 'details' && (
          <>
            {/* Warning for Pending Confirmation Items */}
            {hasPendingConfirmation && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>PREMISSA PENDENTE DE CONFIRMAÇÃO COM A COESA</span>
                </div>
                <ul className="text-xs text-amber-200/90 space-y-1 list-disc pl-5">
                  {node.details.pendingConfirmation?.map((p, idx) => (
                    <li key={idx} className="leading-relaxed">{p}</li>
                  ))}
                </ul>
                <p className="text-[11px] text-amber-400/80 italic pt-1">
                  *Não publicar percentuais ou alegações comerciais como garantia antes da validação formal.
                </p>
              </div>
            )}

            {/* Objective & Hypothesis */}
            {node.details.objective && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>Objetivo Estratégico</span>
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  {node.details.objective}
                </p>
              </div>
            )}

            {node.details.hypothesis && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Hipótese de Segmento</span>
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  {node.details.hypothesis}
                </p>
              </div>
            )}

            {/* Target Audience */}
            {node.details.audience && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Público-Alvo
                </h4>
                <p className="text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                  {node.details.audience}
                </p>
              </div>
            )}

            {/* Budget / Financial Allocation */}
            {node.budget && (
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block">Teto Orçamentário</span>
                  <span className="text-base font-bold font-mono text-amber-400 tabular-nums">
                    R$ {node.budget.toLocaleString('pt-BR')}
                  </span>
                </div>
                {node.budgetPct && (
                  <div>
                    <span className="text-[11px] text-slate-400 block">Participação no Total</span>
                    <span className="text-base font-bold font-mono text-slate-200 tabular-nums">
                      {node.budgetPct}% do teto
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Creative Angle or Search Intent */}
            {node.details.creativeAngle && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Ângulo Criativo & Mensagem
                </h4>
                <p className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {node.details.creativeAngle}
                </p>
              </div>
            )}

            {node.details.searchIntent && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Intenção de Busca Google
                </h4>
                <p className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {node.details.searchIntent}
                </p>
              </div>
            )}

            {/* Decision & Transition Rules */}
            {node.details.decisionCriteria && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Critérios de Decisão</span>
                </h4>
                <p className="text-xs text-slate-200 bg-amber-950/20 p-3 rounded-lg border border-amber-500/30 leading-relaxed">
                  {node.details.decisionCriteria}
                </p>
              </div>
            )}

            {node.details.transitionRule && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Regra de Transição / Escala</span>
                </h4>
                <p className="text-xs text-slate-200 bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/30 leading-relaxed">
                  {node.details.transitionRule}
                </p>
              </div>
            )}

            {/* Target KPIs */}
            {node.details.kpis && node.details.kpis.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Indicadores Chave (KPIs)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {node.details.kpis.map((kpi, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{kpi.label}</span>
                      <span className="text-xs font-bold text-slate-200 font-mono">{kpi.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bullet Notes from Brief */}
            {node.details.notes && node.details.notes.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Diretrizes Operacionais
                </h4>
                <ul className="space-y-1.5">
                  {node.details.notes.map((note, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/40 p-2.5 rounded border border-slate-800/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* TAB 2: CONNECTIONS */}
        {activeTab === 'connections' && (
          <div className="space-y-6">
            {/* Inputs / Origem */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
                <span>Nós de Entrada ({incomingNodes.length})</span>
              </h4>
              {incomingNodes.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-900/40 p-3 rounded-lg">Este é um nó inicial do fluxo.</p>
              ) : (
                <div className="space-y-2">
                  {incomingNodes.map(({ conn, node: fromNode }) => (
                    <div
                      key={conn.id}
                      onClick={() => onSelectNodeById(fromNode.id)}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-blue-400">
                          {fromNode.code || fromNode.type}
                        </span>
                        {conn.label && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {conn.label}
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 mt-1">
                        {fromNode.title}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Outputs / Destinos */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nós de Saída ({outgoingNodes.length})</span>
              </h4>
              {outgoingNodes.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-900/40 p-3 rounded-lg">Este é um nó terminal do fluxo.</p>
              ) : (
                <div className="space-y-2">
                  {outgoingNodes.map(({ conn, node: toNode }) => (
                    <div
                      key={conn.id}
                      onClick={() => onSelectNodeById(toNode.id)}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-emerald-400">
                          {toNode.code || toNode.type}
                        </span>
                        {conn.label && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {conn.label}
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 mt-1">
                        {toNode.title}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Anotações & Insights da Equipe
            </h4>
            <p className="text-xs text-slate-400">
              Registre notas específicas, feedbacks de reuniões ou acordos de validação para este bloco. Salvo automaticamente no navegador.
            </p>
            <textarea
              value={userNotes}
              onChange={(e) => handleSaveNotes(e.target.value)}
              placeholder="Ex: Alinhado com a diretoria que a validação de Cemig será feita via upload de fatura na LP..."
              rows={8}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        )}

      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10px]">ID: {node.id}</span>
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
        >
          Fechar
        </button>
      </div>

    </div>
  );
};
