import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppState, QuizQuestion, PotentialMap } from '../types';
import { generatePotentialMap } from '../services/geminiService';
import { saveQuizResult, getCurrentUser } from '../services/authService';
import { Loader2, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Em um trabalho em grupo na escola, o que você geralmente faz?",
    options: [
      { label: "Organizo quem faz o quê e os prazos.", value: "organizer" },
      { label: "Tenho as ideias criativas e visuais.", value: "creative" },
      { label: "Apresento o trabalho lá na frente.", value: "communicator" },
      { label: "Faço a pesquisa e escrevo o texto.", value: "executor" }
    ]
  },
  {
    id: 2,
    text: "Se você tivesse R$ 100 para multiplicar, o que faria?",
    options: [
      { label: "Compraria ingredientes para fazer algo e vender.", value: "entrepreneur" },
      { label: "Guardaria para não gastar.", value: "saver" },
      { label: "Investiria em um curso rápido.", value: "learner" },
      { label: "Juntaria com amigos para fazer algo maior.", value: "collaborator" }
    ]
  },
  {
    id: 3,
    text: "O que mais te incomoda no mundo?",
    options: [
      { label: "A falta de organização das coisas.", value: "order" },
      { label: "A injustiça com as pessoas.", value: "justice" },
      { label: "A falta de criatividade e beleza.", value: "beauty" },
      { label: "A ineficiência (coisas que não funcionam).", value: "efficiency" }
    ]
  },
  {
    id: 4,
    text: "Como seus amigos te descreveriam?",
    options: [
      { label: "O conselheiro, que sabe ouvir.", value: "listener" },
      { label: "O animado, que agita o rolê.", value: "energizer" },
      { label: "O nerd/inteligente, que sabe das coisas.", value: "knowledgeable" },
      { label: "O confiável, que sempre ajuda.", value: "reliable" }
    ]
  },
  {
    id: 5,
    text: "O que você prefere fazer no tempo livre?",
    options: [
      { label: "Jogar algo estratégico ou resolver puzzles.", value: "strategy" },
      { label: "Criar vídeos, desenhos ou textos.", value: "creation" },
      { label: "Sair e conhecer gente nova.", value: "social" },
      { label: "Organizar meu quarto ou minhas coisas.", value: "organization" }
    ]
  }
];

export const Quiz: React.FC = () => {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [reflection, setReflection] = useState({ likes: '', goodAt: '', develop: '' });
  const [status, setStatus] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<PotentialMap | null>(null);
  const user = getCurrentUser();

  const handleOptionSelect = (value: string) => {
    setAnswers({ ...answers, [QUESTIONS[step].id]: value });
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(QUESTIONS.length); 
    }
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(AppState.LOADING);
    try {
      const map = await generatePotentialMap(answers, reflection);
      setResult(map);
      
      if (user) {
        saveQuizResult(user.id, map);
      }
      
      setStatus(AppState.SUCCESS);
    } catch (error) {
      setStatus(AppState.ERROR);
    }
  };

  // 1. Question View
  if (step < QUESTIONS.length) {
    const q = QUESTIONS[step];
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Questão {step + 1} de {QUESTIONS.length}</span>
            <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full">
            <div 
              className="bg-impa-600 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-8">{q.text}</h2>
        
        <div className="space-y-4">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleOptionSelect(opt.value)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-impa-500 hover:bg-impa-50 transition-all duration-200 flex items-center group active:scale-[0.98]"
            >
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-impa-600 mr-4 flex-shrink-0 transition-colors"></div>
              <span className="text-slate-700 font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. Reflection View
  if (step === QUESTIONS.length && status === AppState.IDLE) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Uma reflexão final...</h2>
        <p className="text-slate-600 mb-8">Não existe resposta errada. Escreva o que vier à cabeça. Isso vai nos ajudar a personalizar seu mapa.</p>
        
        <form onSubmit={handleReflectionSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Algo que você gosta muito de fazer:</label>
            <textarea 
              required
              className="w-full p-3 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-impa-500 focus:border-transparent transition"
              rows={2}
              value={reflection.likes}
              onChange={e => setReflection({...reflection, likes: e.target.value})}
              placeholder="Ex: Jogar videogames, desenhar, conversar com amigos..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Algo que você sente que faz bem:</label>
            <textarea 
              required
              className="w-full p-3 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-impa-500 focus:border-transparent transition"
              rows={2}
              value={reflection.goodAt}
              onChange={e => setReflection({...reflection, goodAt: e.target.value})}
              placeholder="Ex: Explicar matérias, organizar festas, editar vídeos..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Algo que gostaria de desenvolver melhor:</label>
            <textarea 
              required
              className="w-full p-3 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-impa-500 focus:border-transparent transition"
              rows={2}
              value={reflection.develop}
              onChange={e => setReflection({...reflection, develop: e.target.value})}
              placeholder="Ex: Falar em público, juntar dinheiro..."
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 transition-all duration-200 shadow-lg mt-4 active:scale-95 hover:shadow-xl hover:-translate-y-0.5"
          >
            Gerar meu Mapa de Potencial
          </button>
        </form>
      </div>
    );
  }

  // 3. Loading View
  if (status === AppState.LOADING) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <Loader2 className="w-12 h-12 text-impa-600 animate-spin mb-6" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Analisando suas respostas...</h3>
        <p className="text-slate-500 text-center max-w-md">Estamos cruzando seus interesses com habilidades práticas para criar seu mapa exclusivo.</p>
      </div>
    );
  }

  // 4. Results View
  if (status === AppState.SUCCESS && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Seu Mapa de Potencial</h1>
          <p className="text-slate-600">Descobrimos pontos fortes incríveis em você.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Top Skills */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-impa-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-impa-500" />
              Seus Superpoderes
            </h3>
            <div className="space-y-4">
              {result.topSkills.map((skill, idx) => (
                <div key={idx} className="border-l-4 border-impa-400 pl-4 py-1">
                  <h4 className="font-bold text-slate-800">{skill.skill}</h4>
                  <p className="text-sm text-slate-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Application */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-impa-900 mb-4">Como usar isso hoje?</h3>
            <p className="text-slate-700 leading-relaxed mb-6 flex-grow">
              {result.practicalApplication}
            </p>
            <div className="bg-impa-50 p-4 rounded-xl">
              <p className="text-sm font-medium text-impa-800 italic">"{result.encouragement}"</p>
            </div>
          </div>
        </div>

        {/* CTA to Track */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Próximo Passo Recomendado</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Com base no seu perfil, sugerimos que você comece pela trilha abaixo. É prática, rápida e vai te ajudar a testar suas habilidades.
            </p>
            <Link 
              to={`/tracks/${result.suggestedTrackId}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-action-500 text-white font-bold rounded-xl hover:bg-action-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              Ir para a Trilha
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <div className="mt-6">
              <Link to="/tracks" className="text-slate-400 hover:text-white underline text-sm hover:text-slate-200 transition">Ver todas as trilhas</Link>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-impa-600 rounded-full opacity-20 filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-action-600 rounded-full opacity-20 filter blur-3xl"></div>
        </div>
      </div>
    );
  }

  return <div>Erro ao carregar. Tente novamente.</div>;
};