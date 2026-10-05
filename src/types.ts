export type NodeCategory = 
  | 'budget'
  | 'campaign'
  | 'adset'
  | 'ad'
  | 'landing_page'
  | 'consumption_tier'
  | 'decision'
  | 'crm'
  | 'commercial';

export type ChannelType = 
  | 'meta'
  | 'google'
  | 'remarketing'
  | 'reserva'
  | 'qualification'
  | 'crm'
  | 'general';

export type NodeStatus = 
  | 'active'
  | 'scale'
  | 'testing'
  | 'conditional'
  | 'draft'
  | 'decision';

export interface FlowNodeKPI {
  label: string;
  value: string;
  benchmark?: string;
}

export interface FlowNodeDetails {
  objective?: string;
  audience?: string;
  hypothesis?: string;
  creativeAngle?: string;
  searchIntent?: string;
  landingPageUrl?: string;
  qualificationRule?: string;
  decisionCriteria?: string;
  discount?: string;
  consumptionRange?: string;
  kpis?: FlowNodeKPI[];
  notes?: string[];
  pendingConfirmation?: string[];
  transitionRule?: string;
}

export interface FlowNode {
  id: string;
  type: NodeCategory;
  channel: ChannelType;
  area: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle?: string;
  code?: string;
  budget?: number;
  budgetPct?: number;
  discount?: string;
  consumptionRange?: string;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  status: NodeStatus;
  details: FlowNodeDetails;
}

export interface FlowConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  type?: 'solid' | 'dashed' | 'conditional' | 'feedback' | 'success' | 'reject';
  color?: string;
  animated?: boolean;
}

export interface MacroArea {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  metrics: { label: string; value: string }[];
  keyRules: string[];
}

export interface BudgetScenario {
  id: string;
  name: string;
  description: string;
  meta: number;
  google: number;
  remarketing: number;
  reserva: number;
  rationale: string;
  projectedMQLs: number;
  avgCostMQL: number;
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  keyPoints: {
    heading: string;
    description: string;
    badge?: string;
    isPendingConfirmation?: boolean;
  }[];
  criticalRules: string[];
  metricsTarget?: { label: string; value: string }[];
}
