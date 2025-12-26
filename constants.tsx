import { StrategyType, Objective } from './types';
import { Zap, Shield, AlertTriangle, BookOpen } from 'lucide-react';
import React from 'react';

export const OBJECTIVES = Object.values(Objective);

export const STRATEGIES = [
  {
    id: StrategyType.BeliefBreak,
    label: 'Quebra de Crença',
    sub: 'Viral',
    icon: <Zap className="w-4 h-4" />,
    description: 'Desafie o status quo. Melhor para Alcance.',
  },
  {
    id: StrategyType.Mechanism,
    label: 'Mecanismo',
    sub: 'Autoridade',
    icon: <Shield className="w-4 h-4" />,
    description: 'Explique como funciona. Melhor para Confiança.',
  },
  {
    id: StrategyType.CommonError,
    label: 'Erro Comum',
    sub: 'Salvamentos',
    icon: <AlertTriangle className="w-4 h-4" />,
    description: 'Corrija erros. Melhor para Conversão.',
  },
  {
    id: StrategyType.ClinicalConduct,
    label: 'Conduta Clínica',
    sub: 'Educação',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Postura profissional. Melhor para Reputação.',
  },
];
