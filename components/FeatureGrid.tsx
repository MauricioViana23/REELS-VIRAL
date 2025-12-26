import React from 'react';
import { ShieldCheck, Zap, Mic2 } from 'lucide-react';

const features = [
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Ético & Seguro" },
  { icon: <Zap className="w-5 h-5" />, label: "Alta Retenção" },
  { icon: <Mic2 className="w-5 h-5" />, label: "Formato Teleprompter" },
];

const FeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
      {features.map((f, i) => (
        <div key={i} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-pink-500 hover:bg-white/10 transition-colors">
          {f.icon}
          <span className="text-xs font-semibold uppercase tracking-wide">{f.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
