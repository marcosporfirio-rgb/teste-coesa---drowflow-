import React, { useState } from 'react';
import { 
  Play, Download, Share2, Compass, Layers, 
  Sliders, Hash, Sparkles, Building2, HelpCircle, 
  ExternalLink, ChevronRight, Sun, FileSpreadsheet
} from 'lucide-react';
import { FlowNode } from './types';
import { FLOW_NODES } from './data/flowData';
import { DrawFlowCanvas } from './components/DrawFlowCanvas';
import { NodeDetailDrawer } from './components/NodeDetailDrawer';
import { AreaOverview } from './components/AreaOverview';
import { BudgetSimulator } from './components/BudgetSimulator';
import { PresentationMode } from './components/PresentationMode';
import { NamingGenerator } from './components/NamingGenerator';
import { ExportModal } from './components/ExportModal';

export function App() {
  const [activeView, setActiveView] = useState<'canvas' | 'areas' | 'simulator' | 'naming'>('canvas');
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [activeAreaFilter, setActiveAreaFilter] = useState<number | null>(null);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleSelectNode = (node: FlowNode) => {
    setSelectedNode(node);
  };

  const handleSelectNodeById = (nodeId: string) => {
    const target = FLOW_NODES.find(n => n.id === nodeId);
    if (target) {
      setSelectedNode(target);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedNode(null);
  };

  const handleNavigateToCanvasArea = (areaId: number) => {
    setActiveAreaFilter(areaId);
    setActiveView('canvas');
  };

  return (
    <div className="min-h-screen bg-[#070c14] text-slate-100 flex flex-col font-sans antialiased">
      
      {/* =========================================================================
          TOP BAR CONTRACT:
          Zone 1: Single text element wordmark
          Zone 2: 4-6 text navigation links
          Zone 3: 1-2 primary actions
      ========================================================================= */}
      <header className="h-16 px-6 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black font-mono text-sm shadow-md shadow-amber-500/20">
            CS
          </div>
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); setActiveView('canvas'); setActiveAreaFilter(null); }}
            className="text-lg font-extrabold tracking-tight text-white hover:text-amber-400 transition-colors"
          >
            Coesa Solar
          </a>
          <span className="hidden md:inline text-xs text-slate-400 font-mono pl-1 border-l border-slate-800">
            Mídia R$ 50k
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => { setActiveView('canvas'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'canvas'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Draw Flow</span>
          </button>

          <button
            onClick={() => { setActiveView('areas'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'areas'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5 Áreas</span>
          </button>

          <button
            onClick={() => { setActiveView('simulator'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'simulator'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulador R$ 50k</span>
          </button>

          <button
            onClick={() => { setActiveView('naming'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap hidden sm:flex items-center gap-1.5 ${
              activeView === 'naming'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Nomenclatura</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5"
            title="Exportar Especificação ou PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar</span>
          </button>

          <button
            onClick={() => setIsPresentationOpen(true)}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            title="Abrir Modo Apresentação Executiva em Slides"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Apresentação</span>
          </button>
        </div>

      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 relative overflow-x-hidden">
        {activeView === 'canvas' && (
          <DrawFlowCanvas
            onSelectNode={handleSelectNode}
            selectedNodeId={selectedNode?.id || null}
            activeAreaFilter={activeAreaFilter}
            onSelectArea={setActiveAreaFilter}
          />
        )}

        {activeView === 'areas' && (
          <AreaOverview
            onSelectNode={handleSelectNode}
            onNavigateToCanvas={handleNavigateToCanvasArea}
          />
        )}

        {activeView === 'simulator' && (
          <BudgetSimulator />
        )}

        {activeView === 'naming' && (
          <NamingGenerator />
        )}
      </main>

      {/* Node Detail Slide-Over Inspector */}
      {selectedNode && (
        <NodeDetailDrawer
          node={selectedNode}
          onClose={handleCloseDrawer}
          onSelectNodeById={handleSelectNodeById}
        />
      )}

      {/* Fullscreen Presentation Deck */}
      {isPresentationOpen && (
        <PresentationMode
          onClose={() => setIsPresentationOpen(false)}
          onNavigateToCanvas={() => {
            setIsPresentationOpen(false);
            setActiveView('canvas');
          }}
        />
      )}

      {/* Export & Print Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

    </div>
  );
}

export default App;
