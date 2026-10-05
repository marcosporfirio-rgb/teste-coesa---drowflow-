import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, Maximize2, RotateCcw, Filter, 
  Layers, ChevronRight, AlertCircle, ArrowUpRight, 
  CheckCircle2, Sparkles, Building2, Search, DollarSign,
  Compass, Eye, HelpCircle, Info
} from 'lucide-react';
import { FlowNode, FlowConnection, ChannelType, NodeCategory } from '../types';
import { FLOW_NODES, FLOW_CONNECTIONS, MACRO_AREAS } from '../data/flowData';

interface DrawFlowCanvasProps {
  onSelectNode: (node: FlowNode) => void;
  selectedNodeId: string | null;
  activeAreaFilter: number | null;
  onSelectArea: (areaId: number | null) => void;
}

const CHANNEL_COLORS: Record<ChannelType, { bg: string; border: string; text: string; badge: string }> = {
  meta: {
    bg: 'bg-blue-950/40 hover:bg-blue-900/50',
    border: 'border-blue-500/40 hover:border-blue-400',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  google: {
    bg: 'bg-rose-950/40 hover:bg-rose-900/50',
    border: 'border-rose-500/40 hover:border-rose-400',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  },
  remarketing: {
    bg: 'bg-purple-950/40 hover:bg-purple-900/50',
    border: 'border-purple-500/40 hover:border-purple-400',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  reserva: {
    bg: 'bg-amber-950/40 hover:bg-amber-900/50',
    border: 'border-amber-500/40 hover:border-amber-400',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  qualification: {
    bg: 'bg-emerald-950/40 hover:bg-emerald-900/50',
    border: 'border-emerald-500/40 hover:border-emerald-400',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  crm: {
    bg: 'bg-cyan-950/40 hover:bg-cyan-900/50',
    border: 'border-cyan-500/40 hover:border-cyan-400',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  general: {
    bg: 'bg-slate-900/70 hover:bg-slate-800/80',
    border: 'border-slate-700 hover:border-slate-600',
    text: 'text-slate-300',
    badge: 'bg-slate-800 text-slate-300 border-slate-700'
  }
};

const CATEGORY_LABELS: Record<NodeCategory, string> = {
  budget: 'Orçamento',
  campaign: 'Campanha',
  adset: 'Conjunto / Hipótese',
  ad: 'Criativo / Anúncio',
  landing_page: 'Landing Page',
  consumption_tier: 'Faixa de Consumo',
  decision: 'Losango de Decisão',
  crm: 'CRM & Tracking',
  commercial: 'Comercial'
};

export const DrawFlowCanvas: React.FC<DrawFlowCanvasProps> = ({
  onSelectNode,
  selectedNodeId,
  activeAreaFilter,
  onSelectArea
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pan and Zoom state
  const [zoom, setZoom] = useState<number>(0.68);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 30 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Highlighted connections on hover
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [channelFilter, setChannelFilter] = useState<ChannelType | 'all'>('all');

  // Filter nodes based on active area and channel
  const filteredNodes = useMemo(() => {
    return FLOW_NODES.filter(node => {
      if (activeAreaFilter && node.area !== activeAreaFilter) return false;
      if (channelFilter !== 'all' && node.channel !== channelFilter) return false;
      return true;
    });
  }, [activeAreaFilter, channelFilter]);

  const activeNodeIds = useMemo(() => {
    return new Set(filteredNodes.map(n => n.id));
  }, [filteredNodes]);

  // Compute connections that have both ends visible
  const visibleConnections = useMemo(() => {
    return FLOW_CONNECTIONS.filter(conn => 
      activeNodeIds.has(conn.from) && activeNodeIds.has(conn.to)
    );
  }, [activeNodeIds]);

  // Node position map for quick lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, FlowNode>();
    FLOW_NODES.forEach(n => map.set(n.id, n));
    return map;
  }, []);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoom(prev => Math.max(0.35, prev - 0.1));
  const handleResetZoom = () => {
    setZoom(0.68);
    setPan({ x: 40, y: 30 });
  };

  const handleFitToScreen = () => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    if (clientWidth < 768) {
      setZoom(0.32);
      setPan({ x: 10, y: 10 });
    } else if (clientWidth < 1200) {
      setZoom(0.48);
      setPan({ x: 20, y: 20 });
    } else {
      setZoom(0.65);
      setPan({ x: 30, y: 30 });
    }
  };

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on canvas background, not when clicking directly on a button or node
    if ((e.target as HTMLElement).closest('.interactive-node') || (e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation & wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        setZoom(z => Math.max(0.35, Math.min(1.4, z + delta)));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Jump to specific area
  const jumpToArea = (areaId: number) => {
    onSelectArea(areaId);
    // Pan coordinates for each area
    const areaCoordinates: Record<number, { x: number; y: number; zoom: number }> = {
      1: { x: 50, y: 40, zoom: 0.85 },
      2: { x: -450, y: 30, zoom: 0.75 },
      3: { x: -1400, y: 40, zoom: 0.85 },
      4: { x: -1000, y: 40, zoom: 0.8 },
      5: { x: -1800, y: 40, zoom: 0.8 }
    };
    const target = areaCoordinates[areaId] || { x: 40, y: 30, zoom: 0.68 };
    setPan({ x: target.x, y: target.y });
    setZoom(target.zoom);
  };

  return (
    <div className="relative w-full h-[calc(100vh-65px)] flex flex-col bg-[#070c14] overflow-hidden select-none">
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Area Navigation Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl pointer-events-auto overflow-x-auto max-w-full">
          <button
            onClick={() => onSelectArea(null)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeAreaFilter === null 
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Draw Flow Geral (5 Áreas)</span>
          </button>
          
          <div className="w-[1px] h-4 bg-slate-800 mx-1 hidden sm:block" />

          {MACRO_AREAS.map(area => (
            <button
              key={area.id}
              onClick={() => jumpToArea(area.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeAreaFilter === area.id 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-300">
                {area.id}
              </span>
              <span>{area.title}</span>
            </button>
          ))}
        </div>

        {/* Channel Filters & Zoom Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Channel Selector */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl shadow-lg">
            <span className="text-[11px] text-slate-400 px-2 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Canal:</span>
            </span>
            {(['all', 'meta', 'google', 'remarketing', 'reserva', 'qualification'] as const).map(ch => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-2 py-1 text-[11px] rounded-md transition-colors capitalize ${
                  channelFilter === ch 
                    ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {ch === 'all' ? 'Todos' : ch === 'qualification' ? 'Elegibilidade' : ch}
              </button>
            ))}
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl shadow-lg">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-1.5 min-w-[42px] text-center tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Resetar Zoom e Posição"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitToScreen}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Ajustar à Tela"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Pan/Zoom Canvas */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing drawflow-blueprint-grid overflow-hidden`}
        style={{ touchAction: 'none' }}
      >
        <div 
          className="absolute origin-top-left transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            width: '3400px',
            height: '1400px'
          }}
        >
          {/* Swimlane / Area Region Background Banners */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Area 1: Investimento */}
            <div className="absolute top-10 left-30 w-[630px] h-[950px] rounded-3xl border border-slate-800/80 bg-slate-950/20 backdrop-blur-[2px] p-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold border border-amber-500/30">1</span>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">Investimento & Canais</h3>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">R$ 50.000 / mês</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Distribuição dinâmica e flexível de orçamento sem gasto forçado.</p>
            </div>

            {/* Area 2: Campanhas & Segmentos */}
            <div className="absolute top-10 left-[690px] w-[670px] h-[1150px] rounded-3xl border border-slate-800/80 bg-slate-950/20 backdrop-blur-[2px] p-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono font-bold border border-blue-500/30">2</span>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">Campanhas & Segmentos B2B</h3>
                </div>
                <span className="text-xs font-mono text-blue-400 font-medium bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Meta + Google Ads</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Testes de prospecção, conjuntos de hipóteses e escala dos vencedores.</p>
            </div>

            {/* Area 4: Testes A/B Sequenciais */}
            <div className="absolute top-10 left-[1390px] w-[360px] h-[950px] rounded-3xl border border-slate-800/80 bg-slate-950/20 backdrop-blur-[2px] p-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold border border-emerald-500/30">4</span>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">Testes A/B Sequenciais</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">1 Variável/Vez</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Teste 1 (Criativos) → Teste 2 (LPs) → Teste 3 (Ofertas).</p>
            </div>

            {/* Area 3: Faixas de Consumo & Ofertas */}
            <div className="absolute top-10 left-[1770px] w-[640px] h-[950px] rounded-3xl border border-slate-800/80 bg-slate-950/20 backdrop-blur-[2px] p-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono font-bold border border-purple-500/30">3</span>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">Faixas de Consumo Cemig</h3>
                </div>
                <span className="text-xs font-mono text-purple-400 font-medium bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">15% a 30% Desconto</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Verificação da maior para a menor fatura sujeita a confirmação comercial.</p>
            </div>

            {/* Area 5: CRM, Comercial & Decisões */}
            <div className="absolute top-10 left-[2430px] w-[700px] h-[950px] rounded-3xl border border-slate-800/80 bg-slate-950/20 backdrop-blur-[2px] p-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold border border-cyan-500/30">5</span>
                  <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">CRM, Comercial & Escala</h3>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-medium bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Qualificação & CAC</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">15 atributos por lead, validação MQL e critérios de escala para META 02.</p>
            </div>
          </div>

          {/* SVG Connectors Canvas */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ width: '3400px', height: '1400px' }}
          >
            <defs>
              <marker
                id="arrowhead-default"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#64748b" />
              </marker>
              <marker
                id="arrowhead-meta"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#3b82f6" />
              </marker>
              <marker
                id="arrowhead-google"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#ef4444" />
              </marker>
              <marker
                id="arrowhead-remarketing"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#a855f7" />
              </marker>
              <marker
                id="arrowhead-amber"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#f59e0b" />
              </marker>
              <marker
                id="arrowhead-success"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#10b981" />
              </marker>
              <marker
                id="arrowhead-reject"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#ef4444" />
              </marker>
            </defs>

            {visibleConnections.map(conn => {
              const fromNode = nodeMap.get(conn.from);
              const toNode = nodeMap.get(conn.to);
              if (!fromNode || !toNode) return null;

              const isConnectedToHovered = hoveredNodeId === conn.from || hoveredNodeId === conn.to;
              const isConnectedToSelected = selectedNodeId === conn.from || selectedNodeId === conn.to;
              const isHighlighted = isConnectedToHovered || isConnectedToSelected;

              // Compute center or edge anchor points
              const fromWidth = fromNode.width || 250;
              const fromHeight = fromNode.height || 120;
              const toWidth = toNode.width || 250;
              const toHeight = toNode.height || 120;

              let startX = fromNode.position.x + fromWidth;
              let startY = fromNode.position.y + fromHeight / 2;
              let endX = toNode.position.x;
              let endY = toNode.position.y + toHeight / 2;

              // If node is below or above (like feedback loops), adjust anchor points
              if (conn.type === 'feedback') {
                startX = fromNode.position.x + fromWidth / 2;
                startY = fromNode.position.y;
                endX = toNode.position.x + toWidth / 2;
                endY = toNode.position.y;
              } else if (conn.from === 'budget_google' && conn.to === 'budget_meta') {
                startX = fromNode.position.x + fromWidth / 2;
                startY = fromNode.position.y;
                endX = toNode.position.x + toWidth / 2;
                endY = toNode.position.y + fromHeight;
              } else if (fromNode.position.x > toNode.position.x) {
                // Reverse direction
                startX = fromNode.position.x;
                endX = toNode.position.x + toWidth;
              }

              // Compute smooth bezier curve
              const dx = endX - startX;
              const dy = endY - startY;
              
              let pathData = '';
              if (conn.type === 'feedback') {
                // Loop back above the nodes
                const midY = Math.min(startY, endY) - 180;
                pathData = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
              } else {
                const controlX1 = startX + Math.max(40, dx * 0.45);
                const controlY1 = startY;
                const controlX2 = endX - Math.max(40, dx * 0.45);
                const controlY2 = endY;
                pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
              }

              // Determine stroke color
              const strokeColor = conn.color || '#64748b';
              const markerId = strokeColor.includes('#10B981') ? 'arrowhead-success'
                : strokeColor.includes('#EA4335') || strokeColor.includes('#EF4444') ? 'arrowhead-google'
                : strokeColor.includes('#1877F2') || strokeColor.includes('#3B82F6') ? 'arrowhead-meta'
                : strokeColor.includes('#8B5CF6') ? 'arrowhead-remarketing'
                : strokeColor.includes('#F59E0B') ? 'arrowhead-amber'
                : 'arrowhead-default';

              // Midpoint for label
              const midX = (startX + endX) / 2;
              const midY = (startY + endY) / 2;

              return (
                <g key={conn.id} className="transition-opacity duration-200">
                  {/* Glow layer when highlighted */}
                  {isHighlighted && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="6"
                      strokeOpacity="0.4"
                      filter="blur(3px)"
                    />
                  )}

                  {/* Main Connector Path */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isHighlighted ? 3 : 1.8}
                    strokeDasharray={conn.type === 'dashed' || conn.animated ? '6,6' : 'none'}
                    className={conn.animated ? 'animate-flow-dash' : ''}
                    markerEnd={`url(#${markerId})`}
                    opacity={isHighlighted ? 1 : 0.75}
                  />

                  {/* Connection Label Pill */}
                  {conn.label && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x={-(conn.label.length * 3.4 + 10)}
                        y="-10"
                        width={conn.label.length * 6.8 + 20}
                        height="20"
                        rx="10"
                        fill="#0b0f17"
                        stroke={isHighlighted ? strokeColor : '#334155'}
                        strokeWidth="1.2"
                        className="shadow-sm"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill={isHighlighted ? '#ffffff' : '#cbd5e1'}
                        fontSize="10"
                        fontWeight="600"
                        fontFamily="var(--font-sans)"
                      >
                        {conn.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Render Flow Nodes */}
          {filteredNodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const channelStyle = CHANNEL_COLORS[node.channel] || CHANNEL_COLORS.general;
            const width = node.width || 250;
            const isDecision = node.type === 'decision';
            const isTier = node.type === 'consumption_tier';
            const hasPendingConfirmation = node.details?.pendingConfirmation && node.details.pendingConfirmation.length > 0;

            if (isDecision) {
              // Losango de Decisão
              return (
                <div
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                    width: `${width}px`,
                  }}
                  className={`absolute interactive-node cursor-pointer transition-all duration-200 group z-10`}
                >
                  <div className={`p-4 rounded-2xl bg-amber-950/50 border-2 ${
                    isSelected ? 'border-amber-400 ring-4 ring-amber-500/20 shadow-2xl scale-105' : 'border-amber-500/60 hover:border-amber-400 hover:scale-102'
                  } backdrop-blur-md shadow-xl flex flex-col items-center text-center relative overflow-hidden`}>
                    
                    {/* Decision Diamond Marker Accent */}
                    <div className="w-8 h-8 rounded-md bg-amber-500/20 border border-amber-500/40 rotate-45 flex items-center justify-center mb-2 shadow-inner">
                      <HelpCircle className="w-4 h-4 text-amber-400 -rotate-45" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                      {node.code || 'DECISÃO'}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                      {node.title}
                    </h4>
                    {node.subtitle && (
                      <p className="text-xs text-amber-200/80 mt-1 font-medium">
                        {node.subtitle}
                      </p>
                    )}

                    {hasPendingConfirmation && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>Confirmar elegibilidade</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  width: `${width}px`,
                }}
                className={`absolute interactive-node cursor-pointer transition-all duration-200 group z-10`}
              >
                <div 
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${channelStyle.bg} ${
                    isSelected 
                      ? 'border-amber-400 ring-4 ring-amber-500/20 shadow-2xl scale-[1.03]' 
                      : `${channelStyle.border} shadow-lg hover:shadow-2xl hover:scale-[1.01]`
                  }`}
                >
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${channelStyle.badge}`}>
                      {CATEGORY_LABELS[node.type] || node.type}
                    </span>

                    {node.budget && (
                      <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/80 tabular-nums">
                        R$ {node.budget.toLocaleString('pt-BR')}
                      </span>
                    )}

                    {node.discount && (
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        {node.discount}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors leading-tight">
                    {node.title}
                  </h4>

                  {node.subtitle && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {node.subtitle}
                    </p>
                  )}

                  {/* Consumption tier tag */}
                  {isTier && node.consumptionRange && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Consumo:</span>
                      <span className="text-emerald-300 font-semibold">{node.consumptionRange}</span>
                    </div>
                  )}

                  {/* Pending confirmation badge */}
                  {hasPendingConfirmation && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-amber-300 bg-amber-950/40 px-2 py-1 rounded-md border border-amber-500/30">
                      <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">Premissa a confirmar com Coesa</span>
                    </div>
                  )}

                  {/* Status Indicator Bar at bottom */}
                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-[10px] truncate max-w-[140px] text-slate-400">
                      {node.code}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-300 group-hover:text-amber-400 font-medium transition-colors">
                      <span>Ver detalhes</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Legend Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Channel Colors Legend */}
        <div className="flex flex-wrap items-center gap-3 px-3.5 py-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl pointer-events-auto text-xs text-slate-300">
          <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">Canais & Fluxos:</span>
          
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
            <span className="text-[11px]">Meta Ads</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span className="text-[11px]">Google Ads</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
            <span className="text-[11px]">Remarketing</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
            <span className="text-[11px]">Reserva / Decisão</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="text-[11px]">Elegibilidade Cemig</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50" />
            <span className="text-[11px]">CRM / Comercial</span>
          </div>
        </div>

        {/* Quick Helper Hint */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl pointer-events-auto text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Arraste para navegar pelo canvas · Clique em qualquer bloco para inspecionar</span>
        </div>
      </div>
    </div>
  );
};
