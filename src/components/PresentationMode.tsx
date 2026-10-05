import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  HelpCircle, AlertTriangle, CheckCircle2, ShieldCheck, 
  FileText, Sparkles, Building2, Flame, ArrowRight
} from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/flowData';
import bannerImage from '../assets/images/coesa_solar_banner_1791224493170.jpg';

interface PresentationModeProps {
  onClose: () => void;
  onNavigateToCanvas: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  onClose,
  onNavigateToCanvas
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showPresenterNotes, setShowPresenterNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const slide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070c14] text-white flex flex-col justify-between overflow-hidden select-none">
      
      {/* Presentation Top Control Bar */}
      <div className="h-16 px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-400 font-mono text-sm">
            CS
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              Coesa Solar — Apresentação Executiva
            </h1>
            <p className="text-[11px] text-slate-400">
              Arquitetura de Campanhas e Mídia (R$ 50.000 / mês)
            </p>
          </div>
        </div>

        {/* Center: Slide indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Slide {currentSlideIndex + 1} de {totalSlides}
          </span>
          <span className="text-xs font-medium text-slate-400 hidden sm:inline">
            · {slide.category}
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-medium border ${
              showPresenterNotes 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {showPresenterNotes ? 'Ocultar Notas' : 'Notas do Apresentador'}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 transition-colors"
            title="Sair da Apresentação (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-center max-w-6xl mx-auto w-full">
        
        {/* Slide 1 Special Hero Banner */}
        {currentSlideIndex === 0 && (
          <div className="w-full h-44 rounded-3xl overflow-hidden relative mb-6 border border-slate-800 shadow-2xl">
            <img 
              src={bannerImage} 
              alt="Coesa Solar Instalação Comercial" 
              className="w-full h-full object-cover brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/30">
                Energia por Assinatura · Sem Obras · Sem Placas
              </span>
              <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                Área de Atuação Cemig — Minas Gerais
              </span>
            </div>
          </div>
        )}

        {/* Slide Title Lockup */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {slide.category}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-base text-slate-400 font-medium">
            {slide.subtitle}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl pt-1">
            {slide.overview}
          </p>
        </div>

        {/* Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slide.keyPoints.map((pt, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
                pt.isPendingConfirmation
                  ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-white leading-snug">
                  {pt.heading}
                </h4>
                {pt.badge && (
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                    pt.isPendingConfirmation
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {pt.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {pt.description}
              </p>

              {pt.isPendingConfirmation && (
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Premissa sujeita a confirmação comercial da Coesa</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Target Metrics if available */}
        {slide.metricsTarget && slide.metricsTarget.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {slide.metricsTarget.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">{m.label}</span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Presenter Notes Tray if active */}
        {showPresenterNotes && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase font-mono mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Diretrizes Críticas para Apresentação ao Board:</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-200/90 leading-relaxed list-disc pl-5">
              {slide.criticalRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Slide Navigation Bottom Bar */}
      <div className="h-16 px-6 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md flex items-center justify-between">
        
        {/* Jump to Draw Flow */}
        <button
          onClick={onNavigateToCanvas}
          className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>Abrir Draw Flow Interativo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Carousel Progress Indicators */}
        <div className="flex items-center gap-2">
          {PRESENTATION_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIndex 
                  ? 'w-8 bg-amber-500' 
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Ir para Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Slide Anterior (Seta Esquerda)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none shadow-md"
            title="Próximo Slide (Seta Direita / Espaço)"
          >
            <span>Avançar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
