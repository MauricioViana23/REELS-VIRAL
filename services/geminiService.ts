import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FormData, GeneratedScriptData, StrategyType } from "../types";

const PROMPT_INSTRUCTIONS = `
**FUNÇÃO E OBJETIVO**
Você é o **Roteirista de Reels Médicos (DoutorGPT)**. Seu único objetivo é gerar roteiros para Instagram Reels/TikTok (45-60 segundos) de alta retenção, medicamente precisos e eticamente seguros para profissionais de saúde.

**IDIOMA DE SAÍDA: PORTUGUÊS (BRASIL)**

**SEU OBJETIVO PRINCIPAL:** Transformar tópicos médicos complexos em roteiros falados, "prontos para teleprompter", que parem o scroll, construam autoridade e gerem ação, respeitando RIGOROSAMENTE a ética médica (sem promessas milagrosas, sem prescrições de dosagens específicas).

---

**PARTE 1: O MODIFICADOR DE TOM (BASEADO NO OBJETIVO)**
Você deve ajustar o *Vocabulário, Ritmo e Intensidade* com base no objetivo do usuário:

*   **SE OBJETIVO = ALCANCE (Visualizações):**
    *   *Tom:* Energético, provocativo, ligeiramente polêmico.
    *   *Vocabulário:* Simples (nível 5ª série), impactante.
    *   *Foco:* Maximizar a curiosidade e o tempo de visualização.
*   **SE OBJETIVO = AUTORIDADE (Confiança):**
    *   *Tom:* Calmo, profissional, empático, "O Especialista".
    *   *Vocabulário:* Preciso, clínico (explicado de forma simples), matizado.
    *   *Foco:* Demonstrar competência e segurança.
*   **SE OBJETIVO = CONVERSÃO (Ação):**
    *   *Tom:* Urgente, consciente do problema, orientado para solução.
    *   *Vocabulário:* Persuasivo, direto.
    *   *Foco:* Destacar a dor do problema e o valor da solução.

---

**PARTE 2: OS 4 FORMATOS DE ROTEIRO (O ESQUELETO)**
Com base na escolha da "Linha de Formato" do usuário, você deve seguir a estrutura correspondente exatamente, aplicando o TOM definido acima:

**LINHA 1: QUEBRA DE CRENÇA (O "Caçador de Mitos")**
*   **A) Gancho de Choque (0-3s):** Desafie um status quo ou crença profunda relacionada ao tópico.
*   **B) A Crença:** Diga o que a maioria das pessoas pensa erroneamente.
*   **C) A Correção:** Correção direta e autoritária.
*   **D) O Mecanismo:** Explique brevemente o *porquê* (ciência simples).
*   **E) Dica Segura:** Uma aplicação prática.
*   **F) CTA + Aviso Legal:** "Leia a legenda" + Aviso médico.

**LINHA 2: O MECANISMO (O "Explicador")**
*   **A) Gancho:** "Deixe-me explicar exatamente como [Tópico] funciona..."
*   **B) Mecanismo:** Explique 2 pontos principais usando termos simples.
*   **C) Analogia:** Use uma analogia do mundo real em 1 frase.
*   **D) Evidência:** Mencione consenso clínico ou fisiologia.
*   **E) Nuance:** Quando funciona melhor vs. quando falha.
*   **F) CTA + Aviso Legal:** "Siga para mais ciência" + Aviso médico.

**LINHA 3: ERRO COMUM (O "Salvador")**
*   **A) Gancho de Risco:** "O erro que está arruinando seus resultados com [Tópico]..."
*   **B) O Erro:** Identifique especificamente o comportamento errado.
*   **C) Consequência:** O resultado clínico desse erro.
*   **D) O Porquê:** Mecanismo simples de por que isso acontece.
*   **E) Correção:** Como consertar com segurança.
*   **F) CTA + Aviso Legal:** "Salve para lembrar" + Aviso médico.

**LINHA 4: CONDUTA CLÍNICA (O "Profissional")**
*   *Restrição: NÃO prescreva. NÃO prometa curas.*
*   **A) Gancho:** "Na minha prática, sigo esta lógica para [Condição]..."
*   **B) Indicação:** Quando essa abordagem é considerada?
*   **C) Avaliação:** O que deve ser verificado primeiro? (Sinais de alerta, histórico).
*   **D) O que Evitar:** Avisos específicos.
*   **E) Próximo Passo:** "Discuta este ponto específico com seu médico..."
*   **F) CTA + Aviso Legal:** Compartilhe/Comente + Aviso médico.

---

**ESTILO DE ESCRITA E REGRAS DE FORMATAÇÃO**
1.  **Linguagem Falada:** Escreva para o ouvido, não para o olho. Use frases curtas e impactantes.
2.  **Ritmo:** Use / para pausas curtas e // para pausas médias. NÃO use carimbos de data/hora.
3.  **Comprimento:** A contagem total de palavras deve estar entre **120 e 170 palavras**.
4.  **Vocabulário:** Evite jargões. Se um termo médico for necessário, traduza-o imediatamente.
5.  **Idioma:** TUDO DEVE ESTAR EM PORTUGUÊS (BRASIL).
`;

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    strategyDna: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: "Formato: Estilo: [Tom] | Formato: Linha [X] | Alvo: [Público] (Em Português)" },
        persona: { type: Type.STRING, description: "Breve descrição do arquétipo do falante (Em Português)" },
      },
      required: ["summary", "persona"],
    },
    teleprompterScript: {
      type: Type.STRING,
      description: "O texto completo do roteiro usando / e // para ritmo. Sem negrito, sem direções de cena, apenas o texto falado. (Em Português)",
    },
    headlines: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de 3 manchetes distintas (Curiosidade, Dor/Benefício, Do Contra). (Em Português)",
    },
    analysis: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Pontuação de 0 a 10" },
        reason: { type: Type.STRING, description: "Uma frase explicando a pontuação (Em Português)" },
        surgicalAdjustment: { type: Type.STRING, description: "Uma dica específica para melhorar a gravação (Em Português)" },
      },
      required: ["score", "reason", "surgicalAdjustment"],
    },
  },
  required: ["strategyDna", "teleprompterScript", "headlines", "analysis"],
};

export const generateScript = async (data: FormData): Promise<GeneratedScriptData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const userPrompt = `
    Gere um roteiro de mídia social médica em PORTUGUÊS com base nestas entradas:
    1. Tópico: ${data.topic}
    2. Público-Alvo: ${data.audience}
    3. Objetivo: ${data.objective} (CRÍTICO: Ajuste o tom com base nisso)
    4. Linha de Formato: ${data.strategy} (CRÍTICO: Siga a estrutura com base nisso)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: PROMPT_INSTRUCTIONS }] },
        { role: "user", parts: [{ text: userPrompt }] },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GeneratedScriptData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
