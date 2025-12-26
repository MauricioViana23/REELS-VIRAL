export enum Objective {
  Reach = 'Alcance (Visualizações)',
  Authority = 'Autoridade (Confiança)',
  Conversion = 'Conversão (Ação)',
}

export enum StrategyType {
  BeliefBreak = 'Quebra de Crença',
  Mechanism = 'Mecanismo',
  CommonError = 'Erro Comum',
  ClinicalConduct = 'Conduta Clínica',
}

export interface FormData {
  topic: string;
  audience: string;
  objective: Objective;
  strategy: StrategyType;
}

export interface GeneratedScriptData {
  strategyDna: {
    summary: string;
    persona: string;
  };
  teleprompterScript: string;
  headlines: string[];
  analysis: {
    score: number;
    reason: string;
    surgicalAdjustment: string;
  };
}
