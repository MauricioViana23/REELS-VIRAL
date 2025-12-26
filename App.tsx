import React, { useState } from 'react';
import Header from './components/Header';
import FeatureGrid from './components/FeatureGrid';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { FormData, GeneratedScriptData, Objective, StrategyType } from './types';
import { generateScript } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    audience: '',
    objective: Objective.Reach,
    strategy: StrategyType.BeliefBreak,
  });

  const [result, setResult] = useState<GeneratedScriptData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    // Note: We do NOT clear result here (setResult(null)) so that the 
    // old result remains visible while regenerating, preventing layout shift.
    try {
      const data = await generateScript(formData);
      setResult(data);
    } catch (err) {
      setError("Falha ao gerar o script. Por favor, tente novamente.");
      setResult(null); // Clear result on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-pink-500/30 selection:text-pink-100">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
        <Header />
        <FeatureGrid />
        
        <div className="mb-12">
          <InputForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit} 
            isLoading={loading} 
          />
        </div>

        {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-center mb-8">
                {error}
            </div>
        )}

        {result && (
            <div className="scroll-mt-20" id="results">
                <OutputDisplay 
                  data={result} 
                  onRegenerate={handleSubmit} 
                  isRegenerating={loading}
                />
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
