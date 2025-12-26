import React from 'react';
import { FormData, Objective, StrategyType } from '../types';
import { OBJECTIVES, STRATEGIES } from '../constants';
import { Sparkles } from 'lucide-react';

interface InputFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Row 1: Topic & Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Tema Médico</label>
            <input
              type="text"
              placeholder="ex: Jejum Intermitente"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Público Alvo</label>
            <input
              type="text"
              placeholder="ex: Mulheres pós-parto"
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              value={formData.audience}
              onChange={(e) => handleChange('audience', e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Objective */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Objetivo</label>
          <div className="relative">
            <select
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
              value={formData.objective}
              onChange={(e) => handleChange('objective', e.target.value as Objective)}
            >
              {OBJECTIVES.map((obj) => (
                <option key={obj} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>
        </div>

        {/* Row 3: Strategy (Critical) */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            Estratégia do Script <span className="text-pink-500 text-xs uppercase tracking-wider bg-pink-500/10 px-2 py-0.5 rounded-full">Crítico</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {STRATEGIES.map((strategy) => {
              const isActive = formData.strategy === strategy.id;
              return (
                <button
                  key={strategy.id}
                  onClick={() => handleChange('strategy', strategy.id)}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-300 group/card ${
                    isActive
                      ? 'bg-pink-500/10 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                      : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`mb-2 ${isActive ? 'text-pink-400' : 'text-gray-500 group-hover/card:text-gray-300'}`}>
                    {strategy.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-200 mb-0.5">{strategy.label}</div>
                  <div className="text-xs text-gray-500">{strategy.description}</div>
                  
                  {isActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !formData.topic || !formData.audience}
          className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            isLoading || !formData.topic || !formData.audience
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Gerar Script
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
