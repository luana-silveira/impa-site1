import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserReflection, PotentialMap } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const potentialMapSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["skill", "description"]
      },
    },
    practicalApplication: { type: Type.STRING, description: "Suggest concrete ways to use these skills in the real world for a teenager." },
    suggestedTrackId: { 
      type: Type.STRING, 
      enum: ["money", "impact", "organize", "lead", "selfcare", "business"],
      description: "Select the most relevant track ID based on the user profile." 
    },
    encouragement: { type: Type.STRING, description: "A short, motivating closing statement." }
  },
  required: ["topSkills", "practicalApplication", "suggestedTrackId", "encouragement"]
};

export const generatePotentialMap = async (
  answers: Record<number, string>,
  reflection: UserReflection
): Promise<PotentialMap> => {
  
  const prompt = `
    Você é um mentor especialista da plataforma IMPA, voltada para jovens de 15 a 19 anos.
    Analise as respostas do quiz e a reflexão pessoal deste jovem para criar um "Mapa de Potencial".
    
    Respostas do Quiz (Múltipla escolha):
    ${JSON.stringify(answers)}
    
    Reflexão Pessoal:
    - Gosta de fazer: ${reflection.likes}
    - Sente que faz bem: ${reflection.goodAt}
    - Gostaria de desenvolver: ${reflection.develop}

    Com base nisso, identifique:
    1. Top 3 habilidades naturais.
    2. Como aplicar isso na prática HOJE.
    3. Qual trilha da IMPA é a melhor recomendação.
    4. Uma frase final de incentivo.

    IDs das trilhas disponíveis para recomendação:
    - 'money' (Ganhar dinheiro com o que já sabe)
    - 'impact' (Criar impacto com ideias/comunicação)
    - 'organize' (Organizar ideias e projetos)
    - 'lead' (Liderar pessoas)
    - 'selfcare' (Autocuidado e saúde)
    - 'business' (Começar a própria empresa)

    Use tom jovem, prático, acolhedor e direto. Sem "corporatiquês".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: potentialMapSchema,
        systemInstruction: "Você é um mentor prático e acessível para jovens. Fale a língua deles, sem gírias forçadas, mas sem formalidade.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as PotentialMap;
    }
    throw new Error("Resposta vazia da IA");
  } catch (error) {
    console.error("Erro ao gerar Mapa de Potencial:", error);
    // Fallback in case of error to ensure the app doesn't break
    return {
      topSkills: [
        { skill: "Curiosidade", description: "Vontade de aprender coisas novas." },
        { skill: "Resiliência", description: "Capacidade de tentar novamente." },
        { skill: "Autonomia", description: "Força para começar sozinho." }
      ],
      practicalApplication: "Tente começar um pequeno projeto pessoal ainda hoje usando o que você já tem.",
      suggestedTrackId: "organize",
      encouragement: "O importante é começar. Você já tem o que precisa."
    };
  }
};