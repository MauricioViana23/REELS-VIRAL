import React from 'react';
import { Video } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="text-center space-y-4 mb-10">
      <div className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-2">
        <Video className="w-4 h-4 text-pink-500" />
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">DoutorGPT - IA Engine</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        <span className="text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">DoutorGPT</span> Reels Maker
      </h1>
    </div>
  );
};

export default Header;