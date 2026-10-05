import { FlowNode, FlowConnection, MacroArea, BudgetScenario, PresentationSlide } from '../types';

export const MACRO_AREAS: MacroArea[] = [
  {
    id: 1,
    title: 'Investimento & Canais',
    subtitle: 'Alocação flexível de R$ 50.000 mensais',
    description: 'Gestão de teto orçamentário com regras dinâmicas de repasse entre canais e financiamento de testes pela reserva.',
    badge: 'R$ 50k Teto Mensal',
    metrics: [
      { label: 'Meta Captação', value: 'R$ 25.000 (50%)' },
      { label: 'Google Intenção', value: 'R$ 10.000 (20%)' },
      { label: 'Remarketing', value: 'R$ 5.000 (10%)' },
      { label: 'Reserva Testes', value: 'R$ 10.000 (20%)' }
    ],
    keyRules: [
      'R$ 50.000 é teto mensal disponível, não obrigação estrita de gasto.',
      'Google não recebe R$ 10k automático: se o volume de buscas qualificadas for insuficiente, o saldo volta para Meta ou Reserva.',
      'Remarketing depende estritamente do tamanho dos públicos qualificados e capacidade de conversão.',
      'A reserva financia os testes executados nos canais sem gerar contabilidade dupla de despesas.'
    ]
  },
  {
    id: 2,
    title: 'Campanhas & Segmentos',
    subtitle: 'Estrutura operacional Meta e Google Ads',
    description: 'Segmentação de campanhas em prospecção, validação de hipóteses por segmento B2B, alta intenção e escala de vencedores.',
    badge: 'Prospecção & Escala',
    metrics: [
      { label: 'Frentes Ativas', value: '7 Estruturas' },
      { label: 'Segmentos Piloto', value: '3 Verticais B2B' },
      { label: 'Públicos', value: 'Amplo vs Empresarial' },
      { label: 'Foco Regional', value: 'Cemig / Minas Gerais' }
    ],
    keyRules: [
      'META 01 roda testes com mesma LP para isolar o desempenho dos segmentos.',
      'META 02 recebe apenas conjuntos e criativos aprovados com Custo/MQL viável.',
      'Search Não Marca direciona cada um dos 3 grupos de intenção para uma LP dedicada.',
      'Search Marca monitora leads e contratos de forma 100% segregada da captação fria.'
    ]
  },
  {
    id: 3,
    title: 'Faixas de Consumo & Ofertas',
    subtitle: 'Escada de descontos por valor de fatura',
    description: 'Verificação em cascata da maior para a menor faixa de consumo mensal, sujeita à confirmação de elegibilidade Cemig.',
    badge: '15% a 30% Desconto',
    metrics: [
      { label: 'Corte Mínimo', value: 'R$ 300/mês' },
      { label: 'Faixa Máxima', value: '> R$ 2.000 (30%)' },
      { label: 'Faixa Média 1', value: '> R$ 1.000 (25%)' },
      { label: 'Faixa Média 2', value: '> R$ 500 (20%)' }
    ],
    keyRules: [
      'Valores interpretados como gasto mensal na conta Cemig (premissa a confirmar).',
      'Testar sempre a maior faixa primeiro (ordem decrescente: R$ 2k > R$ 1k > R$ 500 > R$ 300).',
      'Percentuais são condições comerciais planejadas e não devem ser divulgados como garantia antes da validação da Coesa.',
      'Contas abaixo de R$ 300 recebem tratamento comercial específico (corte ou encaminhamento).'
    ]
  },
  {
    id: 4,
    title: 'Testes A/B Sequenciais',
    subtitle: 'Metodologia científica de isolamento de variáveis',
    description: 'Sequência controlada: primeiro valida-se o melhor ângulo de criativo, depois a melhor estrutura de landing page.',
    badge: '1 Variável por Vez',
    metrics: [
      { label: 'Teste 1', value: 'Criativos (Economia vs Facilidade)' },
      { label: 'Teste 2', value: 'LPs (Sessão Única vs Calculadora)' },
      { label: 'Slots Futuros', value: '2 LPs em Reserva' },
      { label: 'KPI Principal', value: 'Custo por MQL' }
    ],
    keyRules: [
      'Nunca alterar criativo e LP simultaneamente no mesmo experimento.',
      'Dois anúncios ativos não garantem divisão de entrega equilibrada: monitorar impressões.',
      'Não declarar vencedor sem amostra estatística e tempo mínimo de maturação.',
      'Decisão baseada em Custo por MQL e avanço comercial, jamais apenas em CTR ou CPL.'
    ]
  },
  {
    id: 5,
    title: 'CRM, Comercial & Decisões de Escala',
    subtitle: 'Rastreabilidade ponta a ponta e governança',
    description: 'Mapeamento de 15 atributos por lead, critérios de MQL, fluxo comercial SDR/Closer e losangos de decisão para escala.',
    badge: 'Governança & CAC',
    metrics: [
      { label: 'Atributos Rastreados', value: '15 Variáveis' },
      { label: 'Losangos de Decisão', value: '3 Pontos Críticos' },
      { label: 'Exclusão Remarketing', value: 'Contratados & Atendimento' },
      { label: 'Métrica Final', value: 'Custo por Contrato' }
    ],
    keyRules: [
      'Registrar hipótese de segmento versus segmento real declarado pelo lead no contato.',
      'MQL requer distribuidora Cemig confirmada, titularidade empresarial e fatura elegível.',
      'Lead em atendimento ativo e cliente contratado são sumariamente excluídos do Remarketing.',
      'Segmentos com Custo por MQL inviável após tempo de teste são pausados ou reformulados.'
    ]
  }
];

export const FLOW_NODES: FlowNode[] = [
  // ==========================================
  // ÁREA 1: INVESTIMENTO & CANAIS (X: 50 a 450)
  // ==========================================
  {
    id: 'budget_master',
    type: 'budget',
    channel: 'general',
    area: 1,
    title: 'Orçamento Master Coesa',
    subtitle: 'Teto Mensal Disponível',
    code: 'INVESTIMENTO | TOTAL | MÊS',
    budget: 50000,
    budgetPct: 100,
    position: { x: 50, y: 380 },
    width: 280,
    height: 140,
    status: 'active',
    details: {
      objective: 'Gerenciar o limite financeiro mensal de aquisição de clientes com disciplina de eficiência.',
      transitionRule: 'R$ 50.000 é teto de exposição, não obrigação de gasto cego.',
      kpis: [
        { label: 'Teto Total', value: 'R$ 50.000,00' },
        { label: 'Captação Direta', value: 'R$ 35.000 (70%)' },
        { label: 'Remarketing & Testes', value: 'R$ 15.000 (30%)' }
      ],
      notes: [
        'Liberação gradual de verba condicionada à capacidade comercial e Custo por MQL.',
        'Sem contabilidade dupla entre canais e reserva.'
      ]
    }
  },
  {
    id: 'budget_meta',
    type: 'budget',
    channel: 'meta',
    area: 1,
    title: 'Meta Ads — Captação',
    subtitle: '50% do Orçamento Inicial',
    code: 'VERBA | META | PROSPECÇÃO',
    budget: 25000,
    budgetPct: 50,
    position: { x: 380, y: 150 },
    width: 250,
    height: 125,
    status: 'active',
    details: {
      objective: 'Financiar a geração de novos leads B2B em Minas Gerais através de testes de segmentos e públicos.',
      kpis: [
        { label: 'Teto Inicial', value: 'R$ 25.000,00' },
        { label: 'Participação', value: '50%' }
      ],
      notes: [
        'Alimentará META 01 (testes) e META 02 (escala dos vencedores).',
        'Pode receber verba remanescente do Google se o volume de buscas qualificadas for baixo.'
      ]
    }
  },
  {
    id: 'budget_google',
    type: 'budget',
    channel: 'google',
    area: 1,
    title: 'Google Ads — Alta Intenção',
    subtitle: '20% do Orçamento Inicial',
    code: 'VERBA | GOOGLE | SEARCH',
    budget: 10000,
    budgetPct: 20,
    position: { x: 380, y: 320 },
    width: 250,
    height: 125,
    status: 'conditional',
    details: {
      objective: 'Capturar buscas ativas e qualificadas por energia solar por assinatura e economia para empresas.',
      transitionRule: 'Não consome R$ 10k compulsoriamente se as buscas forem insuficientes.',
      kpis: [
        { label: 'Teto Inicial', value: 'R$ 10.000,00' },
        { label: 'Participação', value: '20%' }
      ],
      notes: [
        'Google não recebe R$ 10.000 automaticamente.',
        'Se o volume de busca qualificada não comportar a verba, o saldo retorna para Meta ou Reserva.'
      ]
    }
  },
  {
    id: 'budget_remarketing',
    type: 'budget',
    channel: 'remarketing',
    area: 1,
    title: 'Remarketing Multicanal',
    subtitle: '10% do Orçamento Inicial',
    code: 'VERBA | REMARKETING | MULTI',
    budget: 5000,
    budgetPct: 10,
    position: { x: 380, y: 490 },
    width: 250,
    height: 125,
    status: 'active',
    details: {
      objective: 'Recuperar visitantes qualificados de LPs, abandonos de formulário e calculadoras em Meta e Google.',
      kpis: [
        { label: 'Teto Inicial', value: 'R$ 5.000,00' },
        { label: 'Participação', value: '10%' }
      ],
      notes: [
        'Ativação condicionada ao volume de audiência acumulada nos pixels e tags.',
        'Exclusão mandatória de clientes já contratados e leads em atendimento.'
      ]
    }
  },
  {
    id: 'budget_reserve',
    type: 'budget',
    channel: 'reserva',
    area: 1,
    title: 'Reserva de Testes',
    subtitle: '20% do Orçamento Inicial',
    code: 'VERBA | RESERVA | TESTES',
    budget: 10000,
    budgetPct: 20,
    position: { x: 380, y: 660 },
    width: 250,
    height: 125,
    status: 'testing',
    details: {
      objective: 'Prover oxigênio orçamentário para experimentos de criativos, novos segmentos, PMax e novas LPs.',
      kpis: [
        { label: 'Teto Inicial', value: 'R$ 10.000,00' },
        { label: 'Participação', value: '20%' }
      ],
      notes: [
        'Financia testes executados DENTRO dos canais.',
        'Evita inflar custos de campanhas estáveis com experimentos de alto risco.'
      ]
    }
  },

  // ==========================================
  // ÁREA 2: CAMPANHAS & SEGMENTOS (X: 700 a 1150)
  // ==========================================
  {
    id: 'camp_meta_01',
    type: 'campaign',
    channel: 'meta',
    area: 2,
    title: 'META 01 — Prospecção B2B',
    subtitle: 'Testes de Segmentos & Públicos',
    code: 'COESA | META | PROSPECÇÃO | B2B | MG',
    position: { x: 720, y: 80 },
    width: 280,
    height: 145,
    status: 'testing',
    details: {
      objective: 'Captar novos leads empresariais em MG e validar hipóteses de segmentos industriais/comerciais.',
      audience: 'Empresários e gestores com potencial de fatura Cemig >= R$ 300.',
      transitionRule: 'Conjuntos vencedores são promovidos para META 02.',
      kpis: [
        { label: 'KPI Primário', value: 'Custo por MQL' },
        { label: 'KPIs Secundários', value: 'Taxa de Qualif., Propostas, Contratos' }
      ],
      notes: [
        'Conjuntos organizados por hipótese de segmento.',
        'Direciona para mesma LP de referência para isolar o público testado.'
      ]
    }
  },
  {
    id: 'seg_alimentacao',
    type: 'adset',
    channel: 'meta',
    area: 2,
    title: 'Hipótese: Alimentação',
    subtitle: 'Restaurantes, padarias e mercados',
    code: 'ALIMENTAÇÃO | TESTE PÚBLICO',
    position: { x: 1070, y: 20 },
    width: 250,
    height: 110,
    status: 'testing',
    details: {
      hypothesis: 'Alto consumo com freezers, fornos e câmaras frigoríficas; forte dor de custo fixo na Cemig.',
      audience: 'Donos e gerentes de padarias, restaurantes, açougues e pequenos mercados em MG.',
      notes: [
        'Confirmar segmento na qualificação (a segmentação de anúncio é apenas uma hipótese).'
      ]
    }
  },
  {
    id: 'seg_varejo',
    type: 'adset',
    channel: 'meta',
    area: 2,
    title: 'Hipótese: Varejo',
    subtitle: 'Lojas e comércios locais',
    code: 'VAREJO | TESTE PÚBLICO',
    position: { x: 1070, y: 150 },
    width: 250,
    height: 110,
    status: 'testing',
    details: {
      hypothesis: 'Comércio de rua e shopping com ar-condicionado e iluminação contínua.',
      audience: 'Lojistas de moda, material de construção, farmácias e óticas em cidades Cemig.'
    }
  },
  {
    id: 'seg_saude_servicos',
    type: 'adset',
    channel: 'meta',
    area: 2,
    title: 'Hipótese: Saúde & Serviços',
    subtitle: 'Clínicas, academias e lavanderias',
    code: 'SAÚDE & SERVIÇOS | TESTE PÚBLICO',
    position: { x: 1070, y: 280 },
    width: 250,
    height: 110,
    status: 'testing',
    details: {
      hypothesis: 'Equipamentos elétricos pesados de lavagem, esterilização e musculação/climatização.',
      audience: 'Clínicas médicas/odontológicas, academias, centros estéticos e lavanderias industriais.'
    }
  },
  {
    id: 'adset_audience_ab',
    type: 'adset',
    channel: 'meta',
    area: 2,
    title: 'Teste de Públicos',
    subtitle: 'Público A (Amplo) vs B (Empresarial)',
    code: 'TESTE PÚBLICO | AMPLO vs SINAIS B2B',
    position: { x: 1070, y: 410 },
    width: 250,
    height: 120,
    status: 'testing',
    details: {
      objective: 'Comparar eficiência entre segmentação ampla geográfica em MG e segmentação por sinais empresariais na plataforma.',
      notes: [
        'Manter segmento, oferta, criativo e LP idênticos.',
        'Não presumir que a segmentação garante cliente Cemig ou conta acima de R$ 300.'
      ]
    }
  },
  {
    id: 'camp_meta_02',
    type: 'campaign',
    channel: 'meta',
    area: 2,
    title: 'META 02 — Escala dos Vencedores',
    subtitle: 'Recebe Segmentos & Criativos Validados',
    code: 'COESA | META | ESCALA | B2B | MG',
    position: { x: 720, y: 270 },
    width: 280,
    height: 140,
    status: 'scale',
    details: {
      objective: 'Concentrar maior verba nos conjuntos que comprovaram Custo por MQL e taxa de contratos saudáveis.',
      transitionRule: 'Alimentada continuamente pelas validações do losango de decisão.',
      kpis: [
        { label: 'Custo por MQL', value: 'Monitorado diariamente' },
        { label: 'Custo por Contrato', value: 'Métrica final de escala' }
      ],
      notes: [
        'Opera sempre com a Landing Page vencedora dos testes.',
        'Aumenta investimento com base no retorno comercial comprovado.'
      ]
    }
  },
  {
    id: 'camp_google_01',
    type: 'campaign',
    channel: 'google',
    area: 2,
    title: 'GOOGLE 01 — Search Não Marca',
    subtitle: '3 Grupos de Intenção Direta',
    code: 'COESA | GOOGLE | SEARCH NÃO MARCA | MG',
    position: { x: 720, y: 450 },
    width: 280,
    height: 145,
    status: 'active',
    details: {
      objective: 'Captar quem já busca soluções ativas de energia solar sem obras ou redução de custos de energia em MG.',
      searchIntent: 'Buscas orientadas a produto e solução.',
      notes: [
        'Grupo 1: Energia por assinatura.',
        'Grupo 2: Economia de energia para empresas.',
        'Grupo 3: Energia por assinatura para clientes Cemig.',
        'Cada grupo direciona para LP alinhada à intenção.'
      ]
    }
  },
  {
    id: 'camp_google_02',
    type: 'campaign',
    channel: 'google',
    area: 2,
    title: 'GOOGLE 02 — Search Marca',
    subtitle: 'Defesa Institucional & Variações',
    code: 'COESA | GOOGLE | SEARCH MARCA | MG',
    position: { x: 720, y: 625 },
    width: 280,
    height: 135,
    status: 'active',
    details: {
      objective: 'Facilitar o contato direto de prospects que já ouviram falar da Coesa Solar e buscam a empresa pelo nome.',
      landingPageUrl: 'LP Institucional / Comercial direta.',
      notes: [
        'Acompanhar leads e contratos separadamente das buscas não marca.',
        'Protege tráfego qualificado de concorrentes.'
      ]
    }
  },
  {
    id: 'camp_meta_03',
    type: 'campaign',
    channel: 'remarketing',
    area: 2,
    title: 'META 03 — Remarketing Multicanal',
    subtitle: 'Recuperação de Visitantes & Abandonos',
    code: 'COESA | META | REMARKETING | B2B',
    position: { x: 720, y: 790 },
    width: 280,
    height: 140,
    status: 'active',
    details: {
      objective: 'Reengajar visitantes das LPs que não finalizaram cadastro ou abandonaram a calculadora.',
      creativeAngle: 'Explicação detalhada de como funciona, quebra de objeções (sem obras) e convite para retomar simulação.',
      notes: [
        'Exclusão obrigatória de leads já em atendimento e clientes contratados.',
        'Compartilha recuperação complementar com Google Display/Search.'
      ]
    }
  },
  {
    id: 'camp_pmax_test',
    type: 'campaign',
    channel: 'reserva',
    area: 2,
    title: 'TESTE 03 — PMax Condicionada',
    subtitle: 'Experimento Posterior via Reserva',
    code: 'COESA | GOOGLE | PMAX TESTE | CONDICIONAL',
    position: { x: 720, y: 960 },
    width: 280,
    height: 130,
    status: 'draft',
    details: {
      objective: 'Explorar expansão de inventário Google inteligente após validar rastreamento e maturidade do CRM.',
      transitionRule: 'Ativar somente após validar qualidade comercial de Search.',
      notes: [
        'Financiada pela reserva de testes (R$ 10k).',
        'Avaliar contribuição adicional líquida de MQLs e contratos.'
      ]
    }
  },

  // ==========================================
  // ÁREA 4: TESTES A/B SEQUENCIAIS (X: 1400 a 1800)
  // (Colocada logicamente entre campanhas e LPs)
  // ==========================================
  {
    id: 'ab_teste_1_criativos',
    type: 'ad',
    channel: 'meta',
    area: 4,
    title: 'TESTE 1 — Criativos Sequenciais',
    subtitle: 'Economia Financeira vs Facilidade / Sem Placas',
    code: 'TESTE 1 | CRIATIVO A vs CRIATIVO B',
    position: { x: 1420, y: 80 },
    width: 300,
    height: 145,
    status: 'testing',
    details: {
      objective: 'Identificar o gancho psicológico mais eficiente para tomadores de decisão B2B em Minas Gerais.',
      creativeAngle: 'Criativo A: Foco na redução da conta em reais (economia financeira). Criativo B: Foco na facilidade (adesão sem obras, sem placas, sem custo inicial).',
      notes: [
        'Mesmo público, mesma oferta, mesma LP de referência e mesmo período.',
        'Avaliar Custo por MQL e avanço comercial (não apenas CTR/CPL).'
      ]
    }
  },
  {
    id: 'ab_teste_2_lps',
    type: 'landing_page',
    channel: 'meta',
    area: 4,
    title: 'TESTE 2 — Landing Pages',
    subtitle: 'Sessão Única vs Calculadora Interativa',
    code: 'TESTE 2 | LP A (SESSÃO ÚNICA) vs LP B (CALCULADORA)',
    position: { x: 1420, y: 260 },
    width: 300,
    height: 155,
    status: 'testing',
    details: {
      objective: 'Comparar a taxa de conversão em MQL entre página de rolagem contínua e página baseada em simulador de economia.',
      notes: [
        'Utiliza o criativo vencedor do Teste 1.',
        'LP A: Sessão única (nome informado na planilha de planejamento).',
        'LP B: Calculadora interativa de economia.',
        'Duas LPs adicionais permanecem reservadas para testes futuros.'
      ]
    }
  },
  {
    id: 'lp_future_slots',
    type: 'landing_page',
    channel: 'general',
    area: 4,
    title: 'Slots LPs Futuras',
    subtitle: 'LP Variante 03 & LP Variante 04',
    code: 'LP FUTURA 03 & 04 | SLOTS DE EXPANSÃO',
    position: { x: 1420, y: 445 },
    width: 300,
    height: 110,
    status: 'draft',
    details: {
      objective: 'Espaços reservados na planilha para novas rodadas de teste de página após conclusão de LP A vs LP B.',
      notes: [
        'Preserva a arquitetura para evolução dos testes conforme recomendação do brief.'
      ]
    }
  },
  {
    id: 'ab_teste_3_ofertas',
    type: 'ad',
    channel: 'general',
    area: 4,
    title: 'TESTE 3 — Apresentação da Oferta',
    subtitle: 'Formatos de Comunicação do Benefício',
    code: 'TESTE 3 | ÂNGULO DE OFERTA NA MESMA FAIXA',
    position: { x: 1420, y: 585 },
    width: 300,
    height: 140,
    status: 'testing',
    details: {
      objective: 'Comparar narrativas comerciais distintas para uma mesma faixa de consumo (ex: "% de desconto" vs "Economize até R$ X mil no ano").',
      notes: [
        'Regra crítica: Não comparar descontos de perfis diferentes como se fossem um teste A/B equivalente.',
        'Preservar a mesma condição comercial exata em ambas as variantes.'
      ]
    }
  },

  // ==========================================
  // ÁREA 3: FAIXAS DE CONSUMO & OFERTAS (X: 1800 a 2200)
  // ==========================================
  {
    id: 'dec_cemig_eligibility',
    type: 'decision',
    channel: 'qualification',
    area: 3,
    title: 'Cliente Cemig Elegível?',
    subtitle: 'Localização & Distribuidora em MG',
    code: 'DECISÃO 01 | CEMIG MG CHECK',
    position: { x: 1800, y: 150 },
    width: 240,
    height: 130,
    status: 'decision',
    details: {
      qualificationRule: 'Confirmar se o imóvel/empresa é atendido pela Cemig em Minas Gerais e se possui padrão técnico elegível.',
      decisionCriteria: 'Sim: Avança para avaliação da fatura. Não: Desqualificação amigável com registro de região.',
      pendingConfirmation: [
        'A distribuidora, a localização e o consumo DEVEM ser confirmados na qualificação.',
        'Comunicação não pode sugerir vínculo institucional não confirmado com a Cemig.'
      ]
    }
  },
  {
    id: 'tier_gt_2000',
    type: 'consumption_tier',
    channel: 'qualification',
    area: 3,
    title: 'Faixa 1: Acima de R$ 2.000',
    subtitle: 'Condição planejada: 30% Desconto',
    code: 'FAIXA 01 | CONTA > R$ 2.000 | 30%',
    consumptionRange: '> R$ 2.000 / mês',
    discount: '30%',
    position: { x: 2120, y: 30 },
    width: 260,
    height: 110,
    status: 'active',
    details: {
      consumptionRange: 'Fatura mensal de energia acima de R$ 2.000,00.',
      discount: '30% de economia projetada.',
      pendingConfirmation: [
        'Confirmar se a interpretação de valor mensal corresponde ao planejamento.',
        'Confirmar condições comerciais antes de divulgar publicamente.'
      ]
    }
  },
  {
    id: 'tier_gt_1000',
    type: 'consumption_tier',
    channel: 'qualification',
    area: 3,
    title: 'Faixa 2: Acima de R$ 1.000',
    subtitle: 'Condição planejada: 25% Desconto',
    code: 'FAIXA 02 | CONTA > R$ 1.000 | 25%',
    consumptionRange: 'R$ 1.000 a R$ 1.999 / mês',
    discount: '25%',
    position: { x: 2120, y: 160 },
    width: 260,
    height: 110,
    status: 'active',
    details: {
      consumptionRange: 'Fatura mensal entre R$ 1.000,00 e R$ 1.999,99.',
      discount: '25% de economia projetada.',
      pendingConfirmation: [
        'Confirmar elegibilidade e tratamento nos limites de valor.'
      ]
    }
  },
  {
    id: 'tier_gt_500',
    type: 'consumption_tier',
    channel: 'qualification',
    area: 3,
    title: 'Faixa 3: Acima de R$ 500',
    subtitle: 'Condição planejada: 20% Desconto',
    code: 'FAIXA 03 | CONTA > R$ 500 | 20%',
    consumptionRange: 'R$ 500 a R$ 999 / mês',
    discount: '20%',
    position: { x: 2120, y: 290 },
    width: 260,
    height: 110,
    status: 'active',
    details: {
      consumptionRange: 'Fatura mensal entre R$ 500,00 e R$ 999,99.',
      discount: '20% de economia projetada.'
    }
  },
  {
    id: 'tier_gt_300',
    type: 'consumption_tier',
    channel: 'qualification',
    area: 3,
    title: 'Faixa 4: Acima de R$ 300',
    subtitle: 'Condição planejada: 15% Desconto',
    code: 'FAIXA 04 | CONTA > R$ 300 | 15%',
    consumptionRange: 'R$ 300 a R$ 499 / mês',
    discount: '15%',
    position: { x: 2120, y: 420 },
    width: 260,
    height: 110,
    status: 'active',
    details: {
      consumptionRange: 'Fatura mensal entre R$ 300,00 e R$ 499,99.',
      discount: '15% de economia projetada.'
    }
  },
  {
    id: 'tier_lt_300',
    type: 'consumption_tier',
    channel: 'qualification',
    area: 3,
    title: 'Abaixo de R$ 300 (Corte)',
    subtitle: 'Fora do Perfil Prioritário',
    code: 'FAIXA 05 | CONTA < R$ 300 | CORTE',
    consumptionRange: '< R$ 300 / mês',
    position: { x: 2120, y: 550 },
    width: 260,
    height: 110,
    status: 'conditional',
    details: {
      consumptionRange: 'Fatura inferior a R$ 300,00.',
      notes: [
        'Registrar no CRM e aplicar a orientação comercial definida (descarte amigável, nutrição futura ou direcionamento B2C).'
      ]
    }
  },

  // ==========================================
  // ÁREA 5: CRM, COMERCIAL & ESCALA (X: 2450 a 2900)
  // ==========================================
  {
    id: 'crm_tracking',
    type: 'crm',
    channel: 'crm',
    area: 5,
    title: 'CRM — Rastreamento 15 Variáveis',
    subtitle: 'Ingestão de Dados & UTMs Granulares',
    code: 'CRM | INGESTÃO & RASTREAMENTO',
    position: { x: 2470, y: 150 },
    width: 300,
    height: 165,
    status: 'active',
    details: {
      objective: 'Armazenar o histórico completo de cada lead para permitir análise de ROI por segmento e criativo.',
      notes: [
        'Campos registrados: Canal, Campanha, Conjunto, Hipótese de Segmento, Segmento Declarado, Criativo, Versão da LP, Distribuidora, Cidade, Valor da Conta, Faixa, Elegibilidade, Status MQL, Proposta, Contrato, Motivo de Perda.'
      ]
    }
  },
  {
    id: 'dec_mql_validation',
    type: 'decision',
    channel: 'crm',
    area: 5,
    title: 'Validação MQL no CRM?',
    subtitle: 'Cemig + Conta >= R$ 300 + Decisor',
    code: 'DECISÃO 02 | CRITÉRIO DE MQL',
    position: { x: 2840, y: 160 },
    width: 250,
    height: 135,
    status: 'decision',
    details: {
      decisionCriteria: 'Lead atende requisitos: Empresa em MG com Cemig confirmada, fatura >= R$ 300 e telefone de decisor válido.',
      transitionRule: 'Sim: Encaminhar para Proposta Comercial. Não: Desqualificar e registrar motivo no CRM.'
    }
  },
  {
    id: 'comercial_pipeline',
    type: 'commercial',
    channel: 'crm',
    area: 5,
    title: 'Pipeline Comercial & Proposta',
    subtitle: 'SDR Qualifica → Closer Fecha Contrato',
    code: 'COMERCIAL | SDR → PROPOSTA → CONTRATO',
    position: { x: 2470, y: 390 },
    width: 300,
    height: 145,
    status: 'active',
    details: {
      objective: 'Apresentar estudo formal de economia sem investimentos, conduzir assinatura digital e confirmação na Cemig.',
      kpis: [
        { label: 'Taxa de Qualificação', value: 'MQL / Leads' },
        { label: 'Taxa de Proposta', value: 'Propostas / MQLs' },
        { label: 'Taxa de Contratação', value: 'Contratos / Propostas' },
        { label: 'CAC Real', value: 'Investimento / Contratos' }
      ],
      notes: [
        'Leads contratados e em atendimento são excluídos imediatamente do Remarketing.'
      ]
    }
  },
  {
    id: 'dec_scale_criteria',
    type: 'decision',
    channel: 'crm',
    area: 5,
    title: 'Critérios de Escala Atingidos?',
    subtitle: 'Custo/MQL + Qualidade Comercial',
    code: 'DECISÃO 03 | ESCALAR, CONTINUAR OU ENCERRAR',
    position: { x: 2840, y: 390 },
    width: 260,
    height: 145,
    status: 'decision',
    details: {
      decisionCriteria: 'Avaliar Custo por MQL e avanço comercial (não apenas CTR ou CPL):',
      notes: [
        '1. Resultado Viável: Promover segmento/criativo para META 02 (Escala de Vencedores) e aumentar investimento.',
        '2. Resultado Inconclusivo: Manter rodando para atingir significância estatística.',
        '3. Resultado Inviável: Encerrar hipótese ou revisar oferta e mensagens.'
      ]
    }
  }
];

export const FLOW_CONNECTIONS: FlowConnection[] = [
  // Orçamento Master -> Canais
  { id: 'c1', from: 'budget_master', to: 'budget_meta', label: '50% (R$ 25k)', color: '#1877F2', animated: true },
  { id: 'c2', from: 'budget_master', to: 'budget_google', label: '20% (R$ 10k)', color: '#EA4335', animated: true },
  { id: 'c3', from: 'budget_master', to: 'budget_remarketing', label: '10% (R$ 5k)', color: '#8B5CF6', animated: true },
  { id: 'c4', from: 'budget_master', to: 'budget_reserve', label: '20% (R$ 10k)', color: '#F59E0B', animated: true },

  // Regra Google -> Meta/Reserva se busca baixa
  { id: 'c5', from: 'budget_google', to: 'budget_meta', label: 'Repasse se busca baixa', type: 'dashed', color: '#EA4335' },
  { id: 'c6', from: 'budget_reserve', to: 'camp_pmax_test', label: 'Financia experimento', type: 'dashed', color: '#F59E0B' },

  // Meta Budget -> Campanhas Meta
  { id: 'c7', from: 'budget_meta', to: 'camp_meta_01', label: 'Testes de Segmentos', color: '#1877F2' },
  { id: 'c8', from: 'budget_meta', to: 'camp_meta_02', label: 'Verba Progressiva', color: '#1877F2' },

  // Google Budget -> Campanhas Google
  { id: 'c9', from: 'budget_google', to: 'camp_google_01', label: 'Search Não Marca', color: '#EA4335' },
  { id: 'c10', from: 'budget_google', to: 'camp_google_02', label: 'Search Marca', color: '#EA4335' },

  // Remarketing Budget -> Meta 03
  { id: 'c11', from: 'budget_remarketing', to: 'camp_meta_03', label: 'Recuperação', color: '#8B5CF6' },

  // META 01 -> Conjuntos de Hipóteses
  { id: 'c12', from: 'camp_meta_01', to: 'seg_alimentacao', label: 'Padarias/Restaurantes', color: '#3B82F6' },
  { id: 'c13', from: 'camp_meta_01', to: 'seg_varejo', label: 'Comércio Local', color: '#3B82F6' },
  { id: 'c14', from: 'camp_meta_01', to: 'seg_saude_servicos', label: 'Clínicas/Academias', color: '#3B82F6' },
  { id: 'c15', from: 'camp_meta_01', to: 'adset_audience_ab', label: 'Amplo vs Sinais', color: '#3B82F6' },

  // Conjuntos -> Teste 1 Criativos
  { id: 'c16', from: 'seg_alimentacao', to: 'ab_teste_1_criativos', label: 'Tráfego Alimentação', color: '#60A5FA' },
  { id: 'c17', from: 'seg_varejo', to: 'ab_teste_1_criativos', label: 'Tráfego Varejo', color: '#60A5FA' },
  { id: 'c18', from: 'seg_saude_servicos', to: 'ab_teste_1_criativos', label: 'Tráfego Saúde', color: '#60A5FA' },
  { id: 'c19', from: 'adset_audience_ab', to: 'ab_teste_1_criativos', label: 'Tráfego Teste', color: '#60A5FA' },

  // Google 01 -> LPs dedicadas
  { id: 'c20', from: 'camp_google_01', to: 'ab_teste_2_lps', label: 'Intenção Alinhada', color: '#EA4335' },
  { id: 'c21', from: 'camp_google_02', to: 'ab_teste_2_lps', label: 'Tráfego Direto', color: '#EA4335' },

  // Teste 1 Criativos -> Teste 2 LPs (Sequencial: Criativo vencedor alimenta teste de LP)
  { id: 'c22', from: 'ab_teste_1_criativos', to: 'ab_teste_2_lps', label: 'Criativo Vencedor', color: '#10B981', animated: true },
  { id: 'c23', from: 'ab_teste_2_lps', to: 'lp_future_slots', label: 'Próximas Rodadas', type: 'dashed', color: '#94A3B8' },
  { id: 'c24', from: 'ab_teste_2_lps', to: 'ab_teste_3_ofertas', label: 'LP Validada', color: '#F59E0B' },

  // LP -> Qualificação / Decisão Cemig
  { id: 'c25', from: 'ab_teste_2_lps', to: 'dec_cemig_eligibility', label: 'Preenchimento Formulário', color: '#F59E0B', animated: true },

  // Decisão Cemig -> Cascata de Faixas
  { id: 'c26', from: 'dec_cemig_eligibility', to: 'tier_gt_2000', label: 'Conta > R$ 2k (1ª Verificação)', color: '#10B981' },
  { id: 'c27', from: 'tier_gt_2000', to: 'tier_gt_1000', label: 'Senão > R$ 1k', color: '#38BDF8' },
  { id: 'c28', from: 'tier_gt_1000', to: 'tier_gt_500', label: 'Senão > R$ 500', color: '#38BDF8' },
  { id: 'c29', from: 'tier_gt_500', to: 'tier_gt_300', label: 'Senão > R$ 300', color: '#38BDF8' },
  { id: 'c30', from: 'tier_gt_300', to: 'tier_lt_300', label: 'Abaixo de R$ 300', color: '#EF4444' },

  // Faixas de Consumo -> Ingestão CRM
  { id: 'c31', from: 'tier_gt_2000', to: 'crm_tracking', label: 'Lead Faixa 30%', color: '#10B981' },
  { id: 'c32', from: 'tier_gt_1000', to: 'crm_tracking', label: 'Lead Faixa 25%', color: '#10B981' },
  { id: 'c33', from: 'tier_gt_500', to: 'crm_tracking', label: 'Lead Faixa 20%', color: '#10B981' },
  { id: 'c34', from: 'tier_gt_300', to: 'crm_tracking', label: 'Lead Faixa 15%', color: '#10B981' },

  // CRM -> Validação MQL
  { id: 'c35', from: 'crm_tracking', to: 'dec_mql_validation', label: 'Análise de Titularidade & Conta', color: '#F59E0B', animated: true },

  // Validação MQL -> Comercial Pipeline
  { id: 'c36', from: 'dec_mql_validation', to: 'comercial_pipeline', label: 'MQL Aprovado', color: '#10B981', animated: true },

  // Comercial Pipeline -> Critérios de Escala
  { id: 'c37', from: 'comercial_pipeline', to: 'dec_scale_criteria', label: 'Performance de Contratos', color: '#10B981' },

  // Decisão de Escala -> META 02 (Retroalimentação para Escala de Vencedores)
  { id: 'c38', from: 'dec_scale_criteria', to: 'camp_meta_02', label: 'PROMOVER PARA ESCALA (Viável)', color: '#10B981', animated: true, type: 'feedback' },

  // Abandono de LP / Form -> Remarketing (Pixel / Tag)
  { id: 'c39', from: 'ab_teste_2_lps', to: 'camp_meta_03', label: 'Abandono de LP / Calculadora', type: 'dashed', color: '#8B5CF6' },

  // Exclusão de Contratados do Remarketing
  { id: 'c40', from: 'comercial_pipeline', to: 'camp_meta_03', label: 'Excluir Contratados / Em Atendimento', type: 'reject', color: '#EF4444' }
];

export const BUDGET_SCENARIOS: BudgetScenario[] = [
  {
    id: 'cenario_base',
    name: '1. Planejamento Base (R$ 50k)',
    description: 'Distribuição oficial inicial conforme regras da Coesa Solar.',
    meta: 25000,
    google: 10000,
    remarketing: 5000,
    reserva: 10000,
    rationale: '50% Meta (captação ativa), 20% Google (busca intencional), 10% Remarketing e 20% Reserva blindada para experimentos.',
    projectedMQLs: 185,
    avgCostMQL: 189.18
  },
  {
    id: 'cenario_google_baixo',
    name: '2. Google com Baixo Volume de Busca',
    description: 'Aplicação da regra: saldo de buscas insuficientes é transferido para Meta Ads.',
    meta: 31000,
    google: 4000,
    remarketing: 5000,
    reserva: 10000,
    rationale: 'Caso os termos "energia por assinatura" em MG tenham teto de inventário restrito, R$ 6.000 são remanejados para a Prospecção Meta.',
    projectedMQLs: 198,
    avgCostMQL: 176.76
  },
  {
    id: 'cenario_escala_vencedores',
    name: '3. Escala Agressiva de Vencedores',
    description: 'Segmentos de Alimentação e Saúde validados com Custo/MQL excelente.',
    meta: 34000,
    google: 8000,
    remarketing: 5000,
    reserva: 3000,
    rationale: 'Consumo de R$ 7.000 da reserva de testes para inflar os conjuntos vencedores na campanha META 02 com comprovação comercial.',
    projectedMQLs: 235,
    avgCostMQL: 148.93
  },
  {
    id: 'cenario_construcao_audiencia',
    name: '4. Fase Inicial (Construção de Pixel)',
    description: 'Primeiras 3 semanas: foco em captação fria enquanto as listas de remarketing atingem tamanho mínimo.',
    meta: 28000,
    google: 9000,
    remarketing: 2000,
    reserva: 11000,
    rationale: 'Remarketing requer volume crítico de acessos para entregar com eficiência. A sobra momentânea protege a reserva.',
    projectedMQLs: 165,
    avgCostMQL: 212.12
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: 'Coesa Solar — Visão Estratégica de Mídia',
    subtitle: 'Arquitetura de Aquisição, Testes e Escala Comercial com R$ 50.000/mês',
    category: 'Contexto & Visão Geral',
    overview: 'Apresentação executiva da estrutura de campanhas de mídia paga para a Coesa Solar, focada no mercado de energia por assinatura na área atendida pela Cemig em Minas Gerais.',
    keyPoints: [
      {
        heading: 'O Produto & Proposta de Valor',
        description: 'Economia real e garantida na conta de luz sem obras, sem placas solares e com custo inicial zero para o cliente.',
        badge: 'Zero Investimento'
      },
      {
        heading: 'Público Prioritário B2B',
        description: 'Foco central em médias e pequenas empresas (comércio, alimentação, serviços). Segmento residencial (B2C) reservado para teste separado.',
        badge: 'B2B Prioritário'
      },
      {
        heading: 'Região de Atuação & Restrições',
        description: 'Área de concessão da Cemig em Minas Gerais. Comunicação transparente direcionada a clientes elegíveis sem sugerir vínculo institucional com a distribuidora.',
        badge: 'Cemig / MG',
        isPendingConfirmation: true
      },
      {
        heading: 'Governança Orçamentária',
        description: 'R$ 50.000 é o teto máximo mensal disponível, não uma obrigação cega de gasto. Investimento liberado conforme retorno comprovado.',
        badge: 'R$ 50k Teto'
      }
    ],
    criticalRules: [
      'Distribuidora, localização e valor de consumo devem ser rigorosamente confirmados na qualificação.',
      'Oferta direcionada estritamente a clientes Cemig elegíveis.',
      'Critério final de sucesso: Custo por Contrato assinado, não apenas cliques ou CPL.'
    ],
    metricsTarget: [
      { label: 'Teto Mensal', value: 'R$ 50.000' },
      { label: 'Praça Prioritária', value: 'Cemig MG' },
      { label: 'Público Alvo', value: 'Empresas B2B' },
      { label: 'Frentes de Mídia', value: '4 Pilares' }
    ]
  },
  {
    id: 2,
    title: 'Arquitetura de Investimento (R$ 50.000)',
    subtitle: 'Distribuição Inteligente e Regras Rígidas de Repasse',
    category: 'Área 1 — Investimento',
    overview: 'A verba de R$ 50.000 é distribuída em 4 frentes com flexibilidade dinâmica para realocação conforme o volume e a qualidade do tráfego.',
    keyPoints: [
      {
        heading: 'Meta Ads — Captação (R$ 25.000 | 50%)',
        description: 'Canal primário de volume e validação de verticais de negócio. Distribui entre testes de hipóteses (META 01) e escala (META 02).',
        badge: '50% Verba'
      },
      {
        heading: 'Google Ads — Alta Intenção (R$ 10.000 | 20%)',
        description: 'Captura usuários que pesquisam ativamente por termos comerciais e solares. Não recebe investimento forçado caso o volume de buscas qualificadas seja restrito.',
        badge: '20% Verba'
      },
      {
        heading: 'Remarketing Multicanal (R$ 5.000 | 10%)',
        description: 'Recuperação de visitantes das LPs e abandonos de formulário/calculadora. Ativado proporcionalmente ao tamanho dos públicos.',
        badge: '10% Verba'
      },
      {
        heading: 'Reserva de Testes (R$ 10.000 | 20%)',
        description: 'Fundo protegido para bancar experimentos arrojados (novos ângulos, PMax, novas páginas) sem inflar a conta das campanhas principais.',
        badge: '20% Reserva'
      }
    ],
    criticalRules: [
      'Se o Google não atingir o teto com qualidade, a verba remanescente migra para Meta ou retorna à Reserva.',
      'A reserva financia os testes executados nos canais: sem contabilidade dupla.',
      'Alocação revisada semanalmente com base nas taxas de qualificação do CRM.'
    ],
    metricsTarget: [
      { label: 'Meta Captação', value: 'R$ 25k (50%)' },
      { label: 'Google Intenção', value: 'R$ 10k (20%)' },
      { label: 'Remarketing', value: 'R$ 5k (10%)' },
      { label: 'Reserva Testes', value: 'R$ 10k (20%)' }
    ]
  },
  {
    id: 3,
    title: 'Estrutura das Campanhas Meta & Google',
    subtitle: 'Separação Clara entre Prospecção, Escala, Intenção e Marca',
    category: 'Área 2 — Campanhas',
    overview: 'Mapeamento operacional das campanhas para garantir que nenhum criativo ou segmento seja escalado sem antes ser testado em ambiente controlado.',
    keyPoints: [
      {
        heading: 'META 01 — Prospecção B2B (Laboratório)',
        description: 'Segmentação por conjuntos de hipóteses. Mensagens alinhadas à dor de custo fixo empresarial. Destino: mesma LP de referência para isolar variáveis.',
        badge: 'Testes de Hipótese'
      },
      {
        heading: 'META 02 — Escala dos Vencedores',
        description: 'Recebe apenas os públicos, segmentos e criativos aprovados. Opera com a Landing Page vencedora e recebe acréscimo orçamentário progressivo.',
        badge: 'Escala Validada'
      },
      {
        heading: 'GOOGLE 01 — Search Não Marca (3 Intenções)',
        description: 'Segmentado em 3 grupos: Energia por assinatura, Economia para empresas e Energia por assinatura clientes Cemig. Cada grupo com LP alinhada.',
        badge: 'Alta Intenção'
      },
      {
        heading: 'GOOGLE 02 — Search Marca & Proteção',
        description: 'Termos relacionados à Coesa e suas variações. Destino para LP institucional/comercial. Medição e metas 100% apartadas da captação genérica.',
        badge: 'Defesa de Marca'
      }
    ],
    criticalRules: [
      'META 03 (Remarketing) exclui obrigatoriamente clientes contratados e leads já em negociação ativa.',
      'TESTE 03 (PMax) permanece condicionado e só é ativado após maturidade do rastreamento.',
      'Todas as URLs devem conter parâmetros UTM padronizados para auditoria.'
    ]
  },
  {
    id: 4,
    title: 'Testes de Segmentos & Públicos B2B',
    subtitle: 'Hipóteses de Mercado em Minas Gerais',
    category: 'Área 2 — Segmentos',
    overview: 'Três verticais de empresas propostas inicialmente para rodadas de testes com mensagens e dores específicas.',
    keyPoints: [
      {
        heading: 'Vertical 1: Alimentação',
        description: 'Restaurantes, padarias, açougues e mercados de bairro. Dor: freezers, fornos e câmaras frias com conta de luz sufocante.',
        badge: 'Alimentação'
      },
      {
        heading: 'Vertical 2: Varejo',
        description: 'Lojas e comércios de rua / shoppings. Dor: iluminação constante e climatização (ar-condicionado) durante todo o horário comercial.',
        badge: 'Varejo'
      },
      {
        heading: 'Vertical 3: Saúde e Serviços',
        description: 'Clínicas médicas, odontológicas, academias e lavanderias. Dor: maquinário contínuo e autoclave com alto consumo em horário de ponta.',
        badge: 'Saúde & Serviços'
      },
      {
        heading: 'Teste de Públicos: Amplo vs Sinais B2B',
        description: 'Comparativo dentro da mesma vertical entre Público Amplo na área Cemig versus Público com interesses e cargos empresariais na plataforma.',
        badge: 'Teste A/B Público'
      }
    ],
    criticalRules: [
      'O conjunto de anúncios é apenas a hipótese de aquisição: a atividade real do lead deve ser declarada no formulário.',
      'Iniciar com no máximo 2 a 3 hipóteses simultâneas para não pulverizar verba.',
      'Decisão de triagem: Viável → META 02; Inconclusivo → Continua; Inviável → Pausar.'
    ]
  },
  {
    id: 5,
    title: 'Faixas de Consumo e Escada de Ofertas',
    subtitle: 'Validação em Cascata e Premissas Comerciais a Confirmar',
    category: 'Área 3 — Faixas & Ofertas',
    overview: 'Escada de benefícios associada ao valor mensal declarado da conta Cemig. Verificação sempre realizada do maior para o menor corte.',
    keyPoints: [
      {
        heading: 'Faixa 1: Acima de R$ 2.000/mês → 30%',
        description: 'Maior corte de consumo empresarial. Condição comercial planejada de 30% de desconto na fatura.',
        badge: '30% Desconto',
        isPendingConfirmation: true
      },
      {
        heading: 'Faixa 2: Acima de R$ 1.000/mês → 25%',
        description: 'Consumo intermediário-alto (clínicas, mercados médios). Condição planejada de 25% de economia.',
        badge: '25% Desconto',
        isPendingConfirmation: true
      },
      {
        heading: 'Faixa 3: Acima de R$ 500/mês → 20%',
        description: 'Consumo intermediário padrão (lojas, escritórios). Condição planejada de 20% de economia.',
        badge: '20% Desconto',
        isPendingConfirmation: true
      },
      {
        heading: 'Faixa 4: Acima de R$ 300/mês → 15%',
        description: 'Piso mínimo de viabilidade para qualificação de MQL. Condição planejada de 15% de economia.',
        badge: '15% Desconto',
        isPendingConfirmation: true
      }
    ],
    criticalRules: [
      'Contas abaixo de R$ 300 recebem corte imediato e direcionamento comercial definido.',
      'Valores interpretados como valor mensal em reais da fatura de energia (confirmar com Coesa).',
      'Percentuais são condições comerciais sujeitas a confirmação: proibido veicular garantia sem aval formal.'
    ]
  },
  {
    id: 6,
    title: 'Metodologia de Testes A/B Sequenciais',
    subtitle: 'Isolamento de Variáveis: Criativos Primeiro, Páginas Depois',
    category: 'Área 4 — Testes A/B',
    overview: 'Disciplina experimental rigorosa para identificar a causa exata de qualquer variação nas taxas de conversão e custo de aquisição.',
    keyPoints: [
      {
        heading: 'Teste 1 — Criativos (Ângulo de Mensagem)',
        description: 'Variante A (Economia Financeira e redução de custo fixo) versus Variante B (Facilidade de adesão, sem placas, sem obras, sem burocracia).',
        badge: 'Criativo A vs B'
      },
      {
        heading: 'Teste 2 — Landing Pages (com Criativo Vencedor)',
        description: 'Variante LP A (Sessão Única direta) versus Variante LP B (Calculadora interativa de economia). 2 LPs em reserva para rodadas posteriores.',
        badge: 'LP A vs LP B'
      },
      {
        heading: 'Teste 3 — Apresentação da Oferta',
        description: 'Comparativo de como comunicar o desconto dentro da MESMA faixa de consumo (ex: "% na conta" vs "economia anual em reais").',
        badge: 'Formato da Oferta'
      },
      {
        heading: 'Regras dos Experimentos',
        description: 'Alterar rigorosamente UMA variável por rodada. Garantir volume mínimo de dados antes de declarar vencedores.',
        badge: 'Rigor Científico'
      }
    ],
    criticalRules: [
      'Não utilizar apenas CTR ou CPL para escolher anúncios vencedores.',
      'Critério supremo de aprovação: Custo por MQL qualificado e avanço na esteira comercial.',
      'Dois anúncios ativos não garantem divisão de entrega equilibrada: monitorar impressões.'
    ]
  },
  {
    id: 7,
    title: 'CRM, Qualificação MQL & Pipeline Comercial',
    subtitle: 'Rastreabilidade de 15 Atributos e Governança de Decisão',
    category: 'Área 5 — CRM & Decisões',
    overview: 'Integração contínua entre tráfego e time de vendas para fechar o ciclo de dados e retroalimentar as decisões de mídia.',
    keyPoints: [
      {
        heading: 'Ingestão Completa (15 Atributos por Lead)',
        description: 'Canal, campanha, conjunto, hipótese de segmento, segmento declarado, criativo, LP, distribuidora, cidade, valor da conta, faixa, elegibilidade, MQL, proposta e contrato.',
        badge: '15 Atributos'
      },
      {
        heading: 'Losango de Qualificação MQL',
        description: 'Filtro comercial: Distribuidora Cemig confirmada, titularidade/perfil empresarial válido, conta >= R$ 300 e telefone ativo de decisor.',
        badge: 'MQL Check'
      },
      {
        heading: 'Losango de Decisão de Escala',
        description: '1. Viável → Transfere para META 02 e amplia orçamento. 2. Inconclusivo → Continua teste. 3. Inviável → Pausa ou reformula.',
        badge: 'Escalar ou Pausar'
      },
      {
        heading: 'Feedback Loop & Proteção',
        description: 'Leads em atendimento comercial e clientes contratados são automaticamente excluídos das campanhas de captação e remarketing.',
        badge: 'Exclusão Ativa'
      }
    ],
    criticalRules: [
      'Acompanhamento contínuo de CPL, % Qualificação, Custo/MQL, % Proposta, % Contrato e CAC.',
      'Segmentos com Custo por MQL inviável não devem ser mantidos por inércia.',
      'Retroalimentação semanal entre gestor de tráfego e coordenador de vendas Coesa.'
    ]
  },
  {
    id: 8,
    title: 'Nomenclatura Padrão & Parâmetros de UTM',
    subtitle: 'Taxonomia Unificada para Governança e Rastreamento',
    category: 'Padronização & Governança',
    overview: 'Padrão formal de identificação para todas as campanhas, conjuntos e criativos no Meta Ads e Google Ads.',
    keyPoints: [
      {
        heading: 'Nomenclatura de Campanha',
        description: 'COESA | META | TESTE SEGMENTO | B2B | MG\nCOESA | GOOGLE | SEARCH NÃO MARCA | B2B | MG\nCOESA | META | ESCALA VENCEDORES | B2B | MG',
        badge: 'Campanha'
      },
      {
        heading: 'Nomenclatura de Conjunto / Grupo',
        description: 'ALIMENTAÇÃO | PÚBLICO AMPLO | CEMIG MG\nVAREJO | SINAIS EMPRESARIAIS | CEMIG MG\nSEARCH | ENERGIA POR ASSINATURA | EXATA',
        badge: 'Conjunto / Grupo'
      },
      {
        heading: 'Nomenclatura de Anúncio / Criativo',
        description: 'CRIATIVO A | ECONOMIA FINANCEIRA | LP SESSÃO ÚNICA\nCRIATIVO B | SEM PLACAS SEM OBRAS | LP CALCULADORA',
        badge: 'Anúncio'
      },
      {
        heading: 'Estrutura de Parâmetros UTM',
        description: 'utm_source=meta&utm_medium=cpc&utm_campaign=teste_segmento&utm_term=alimentacao&utm_content=criativo_a_economia',
        badge: 'UTM Tracking'
      }
    ],
    criticalRules: [
      'Identificar controle e variante com precisão em todas as URLs.',
      'Proibido subir anúncios sem taxonomia padronizada pré-aprovada.',
      'Garante que cada contrato no CRM tenha a paternidade exata de mídia identificada.'
    ]
  }
];
