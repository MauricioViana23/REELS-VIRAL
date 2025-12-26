import React, { useState } from 'react';
import { GeneratedScriptData } from '../types';
import { Copy, Check, Activity, Target, Zap, RefreshCw } from 'lucide-react';

interface OutputDisplayProps {
  data: GeneratedScriptData;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ data, onRegenerate, isRegenerating }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.teleprompterScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreColor = data.analysis.score >= 9 ? 'text-green-400' : data.analysis.score >= 7 ? 'text-yellow-400' : 'text-red-400';
  const scoreBg = data.analysis.score >= 9 ? 'bg-green-400/10' : data.analysis.score >= 7 ? 'bg-yellow-400/10' : 'bg-red-400/10';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* DNA Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white/5 border border-white/10 rounded-2xl p-4">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">DNA da Estratégia</h3>
          <p className="text-sm font-medium text-pink-300">{data.strategyDna.summary}</p>
        </div>
        <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            <p className="text-xs text-gray-400"><span className="text-gray-500">Persona:</span> {data.strategyDna.persona}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Script - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-pink-500" /> Script para Teleprompter
            </h2>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onRegenerate}
                disabled={isRegenerating}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  isRegenerating
                    ? 'bg-gray-800 text-gray-500 border-transparent cursor-not-allowed'
                    : 'bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30 text-pink-400'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                {isRegenerating ? 'Reescrevendo...' : 'Regenerar'}
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 h-[400px] overflow-y-auto custom-scrollbar">
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-200 whitespace-pre-line font-sans tracking-wide">
                {data.teleprompterScript}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Headlines */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" /> Manchetes (Hooks)
            </h3>
            <div className="space-y-3">
              {data.headlines.map((headline, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 p-3 rounded-lg hover:border-pink-500/30 transition-colors">
                   <span className="text-xs text-gray-500 block mb-1">Opção {idx + 1}</span>
                   <p className="font-medium text-gray-200">{headline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Análise
            </h3>
            
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${scoreColor} ${scoreBg} border-opacity-30`}>
                    {data.analysis.score}
                </div>
                <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase">Pontuação de Retenção</p>
                    <p className="text-sm text-gray-300 leading-tight mt-1">{data.analysis.reason}</p>
                </div>
            </div>

            <div className="bg-pink-900/20 border border-pink-500/20 rounded-lg p-3">
                <p className="text-xs text-pink-400 uppercase font-bold mb-1">Ajuste Cirúrgico</p>
                <p className="text-sm text-pink-100/80">{data.analysis.surgicalAdjustment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;
