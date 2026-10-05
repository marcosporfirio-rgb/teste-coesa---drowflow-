import React, { useState } from 'react';
import { Copy, Check, Sparkles, Hash, Link as LinkIcon, RefreshCw, Info } from 'lucide-react';

export const NamingGenerator: React.FC = () => {
  const [channel, setChannel] = useState<'META' | 'GOOGLE' | 'REMARKETING'>('META');
  const [stage, setStage] = useState<'TESTE SEGMENTO' | 'ESCALA VENCEDORES' | 'SEARCH NÃO MARCA' | 'SEARCH MARCA' | 'REMARKETING MULTICANAL'>('TESTE SEGMENTO');
  const [segment, setSegment] = useState<'ALIMENTAÇÃO' | 'VAREJO' | 'SAÚDE & SERVIÇOS' | 'ENERGIA POR ASSINATURA' | 'INSTITUCIONAL' | 'VISITANTES GERAIS'>('ALIMENTAÇÃO');
  const [audience, setAudience] = useState<'PÚBLICO AMPLO' | 'SINAIS EMPRESARIAIS' | 'PALAVRAS EXATAS' | 'ABANDONO CALCULADORA'>('PÚBLICO AMPLO');
  const [creative, setCreative] = useState<'CRIATIVO A | ECONOMIA' | 'CRIATIVO B | SEM PLACAS SEM OBRAS' | 'CRIATIVO C | TESTE OFERTA' | 'ANÚNCIO RESPONSIVO DE SEARCH'>('CRIATIVO A | ECONOMIA');
  const [landingPage, setLandingPage] = useState<'LP SESSÃO ÚNICA' | 'LP CALCULADORA' | 'LP INSTITUCIONAL' | 'LP FUTURA 03'>('LP SESSÃO ÚNICA');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Generate standardized Campaign Name
  const campaignName = `COESA | ${channel} | ${stage} | B2B | MG`;

  // Generate standardized Adset Name
  const adsetName = `${segment} | ${audience}`;

  // Generate standardized Ad Name
  const adName = `${creative} | ${landingPage}`;

  // Generate UTM URL string
  const baseUrl = 'https://coesaenergia.com.br/energia-por-assinatura';
  const utmSource = channel.toLowerCase();
  const utmMedium = 'cpc';
  const utmCampaign = stage.toLowerCase().replace(/\s+/g, '_');
  const utmTerm = segment.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const utmContent = `${creative.split('|')[0].trim().toLowerCase().replace(/\s+/g, '_')}_${landingPage.toLowerCase().replace(/\s+/g, '_')}`;

  const generatedUrl = `${baseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_term=${utmTerm}&utm_content=${utmContent}`;

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold border border-amber-500/30">
            9
          </span>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold">
            Padronização & Governança
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Gerador de Nomenclatura & Parâmetros UTM
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Gere nomes de campanhas, conjuntos, criativos e links com tags de rastreamento conforme o padrão rigoroso definido na Seção 9 do planejamento da Coesa Solar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Interactive Selectors */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-4">
            Parâmetros do Experimento / Campanha
          </h3>

          {/* Canal */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">1. Canal de Mídia</label>
            <div className="grid grid-cols-3 gap-2">
              {(['META', 'GOOGLE', 'REMARKETING'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setChannel(c);
                    if (c === 'GOOGLE') {
                      setStage('SEARCH NÃO MARCA');
                      setCreative('ANÚNCIO RESPONSIVO DE SEARCH');
                    } else if (c === 'REMARKETING') {
                      setStage('REMARKETING MULTICANAL');
                      setAudience('ABANDONO CALCULADORA');
                    } else {
                      setStage('TESTE SEGMENTO');
                      setCreative('CRIATIVO A | ECONOMIA');
                    }
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    channel === c
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Etapa / Tipo de Campanha */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">2. Finalidade da Campanha</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="TESTE SEGMENTO">TESTE SEGMENTO (META 01)</option>
              <option value="ESCALA VENCEDORES">ESCALA VENCEDORES (META 02)</option>
              <option value="SEARCH NÃO MARCA">SEARCH NÃO MARCA (GOOGLE 01)</option>
              <option value="SEARCH MARCA">SEARCH MARCA (GOOGLE 02)</option>
              <option value="REMARKETING MULTICANAL">REMARKETING MULTICANAL (META 03)</option>
            </select>
          </div>

          {/* Hipótese de Segmento */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">3. Hipótese de Segmento</label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALIMENTAÇÃO">ALIMENTAÇÃO (Padarias, Restaurantes, Mercados)</option>
              <option value="VAREJO">VAREJO (Comércio local, Lojas de rua)</option>
              <option value="SAÚDE & SERVIÇOS">SAÚDE & SERVIÇOS (Clínicas, Academias, Lavanderias)</option>
              <option value="ENERGIA POR ASSINATURA">ENERGIA POR ASSINATURA (Search Direto)</option>
              <option value="INSTITUCIONAL">INSTITUCIONAL (Busca por Coesa Solar)</option>
              <option value="VISITANTES GERAIS">VISITANTES GERAIS (Remarketing)</option>
            </select>
          </div>

          {/* Segmentação de Público */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">4. Teste de Público (Conjunto)</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="PÚBLICO AMPLO">PÚBLICO AMPLO (Geográfico MG / Cemig)</option>
              <option value="SINAIS EMPRESARIAIS">SINAIS EMPRESARIAIS (Cargos, Interesses B2B)</option>
              <option value="PALAVRAS EXATAS">PALAVRAS EXATAS (Google Search)</option>
              <option value="ABANDONO CALCULADORA">ABANDONO CALCULADORA (Remarketing)</option>
            </select>
          </div>

          {/* Criativo */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">5. Criativo (Teste 1)</label>
            <select
              value={creative}
              onChange={(e) => setCreative(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="CRIATIVO A | ECONOMIA">CRIATIVO A | ECONOMIA (Foco financeiro)</option>
              <option value="CRIATIVO B | SEM PLACAS SEM OBRAS">CRIATIVO B | SEM PLACAS SEM OBRAS (Facilidade de adesão)</option>
              <option value="CRIATIVO C | TESTE OFERTA">CRIATIVO C | TESTE OFERTA (Comunicação do desconto)</option>
              <option value="ANÚNCIO RESPONSIVO DE SEARCH">ANÚNCIO RESPONSIVO DE SEARCH (Google)</option>
            </select>
          </div>

          {/* Landing Page */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">6. Landing Page de Destino (Teste 2)</label>
            <select
              value={landingPage}
              onChange={(e) => setLandingPage(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="LP SESSÃO ÚNICA">LP SESSÃO ÚNICA (Página contínua)</option>
              <option value="LP CALCULADORA">LP CALCULADORA (Simulador de economia)</option>
              <option value="LP INSTITUCIONAL">LP INSTITUCIONAL (Defesa de Marca)</option>
              <option value="LP FUTURA 03">LP FUTURA 03 (Slot de expansão)</option>
            </select>
          </div>
        </div>

        {/* Right: Generated Output Blocks */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center justify-between">
              <span>Nomenclaturas Padronizadas</span>
              <span className="text-[10px] text-slate-400 font-sans">Prontas para copiar</span>
            </h3>

            {/* Campaign Name */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">Nome de Campanha</span>
                <button
                  onClick={() => handleCopy(campaignName, 'camp')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                >
                  {copiedField === 'camp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'camp' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-xs font-mono font-bold text-white select-all break-all">
                {campaignName}
              </p>
            </div>

            {/* Adset Name */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">Nome do Conjunto / Grupo</span>
                <button
                  onClick={() => handleCopy(adsetName, 'adset')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                >
                  {copiedField === 'adset' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'adset' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-xs font-mono font-bold text-white select-all break-all">
                {adsetName}
              </p>
            </div>

            {/* Ad Name */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">Nome do Anúncio</span>
                <button
                  onClick={() => handleCopy(adName, 'ad')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                >
                  {copiedField === 'ad' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'ad' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-xs font-mono font-bold text-white select-all break-all">
                {adName}
              </p>
            </div>

            {/* UTM URL */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3 text-cyan-400" />
                  <span>URL com UTMs (Rastreamento CRM)</span>
                </span>
                <button
                  onClick={() => handleCopy(generatedUrl, 'url')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
                >
                  {copiedField === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'url' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-[11px] font-mono text-cyan-300 select-all break-all leading-relaxed">
                {generatedUrl}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Importância do Rastreamento:</strong> A identificação clara de controle e variante nas URLs garante que o CRM Coesa Solar consiga correlacionar qual anúncio e LP gerou o contrato final assinado.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
