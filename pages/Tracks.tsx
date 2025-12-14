import React from 'react';
import { Link } from 'react-router-dom';
import { Track } from '../types';
import { DollarSign, Megaphone, Layout, Users, Heart, Share2, Clock, ChevronRight, Briefcase, Smartphone } from 'lucide-react';

export const TRACKS_DATA: Track[] = [
  {
    id: 'money',
    title: 'Gerar Renda',
    description: 'Transforme habilidades que você já tem em dinheiro extra, sem complicação.',
    duration: '4 semanas',
    stepsCount: 4, // Simplified as per prompt
    icon: 'dollar',
    mission: 'Identifique uma habilidade e faça sua primeira oferta.',
    reflectionQuestions: [
      "Qual habilidade eu escolhi?",
      "Como foi fazer a primeira oferta?",
      "O que aprendi sobre vender meu trabalho?"
    ],
    steps: [
      { id: 1, title: 'Identificar Habilidade', content: 'Liste 3 coisas que você sabe fazer bem (ex: desenhar, explicar matérias, cuidar de pets, editar vídeos).' },
      { id: 2, title: 'Oferta', content: 'Pense em 2 formas de oferecer essa habilidade para alguém (produto ou serviço).' },
      { id: 3, title: 'Ação Prática', content: 'Execute uma pequena ação: ofereça para 3 conhecidos ou divulgue em um grupo.' },
      { id: 4, title: 'Registro', content: 'Anote no diário: alguém se interessou? O que você sentiu? O que faria diferente?' }
    ]
  },
  {
    id: 'social-impact',
    title: 'Comunicação → Impacto',
    description: 'Use sua voz e comunicação para defender uma causa e mobilizar pessoas.',
    duration: '3 semanas',
    stepsCount: 4,
    icon: 'megaphone',
    mission: 'Crie e compartilhe uma mensagem sobre algo que importa para você.',
    reflectionQuestions: [
      "Minha mensagem foi clara?",
      "Como as pessoas reagiram?",
      "Senti que gerei impacto?"
    ],
    steps: [
      { id: 1, title: 'Sua Causa', content: 'Escolha um tema que você se importa (meio ambiente, educação, igualdade, animais).' },
      { id: 2, title: 'Conteúdo', content: 'Crie um conteúdo simples (texto, vídeo curto ou cartaz) explicando por que isso importa.' },
      { id: 3, title: 'Mini-Ação', content: 'Compartilhe esse conteúdo ou organize uma pequena roda de conversa sobre o tema.' },
      { id: 4, title: 'Reflexão', content: 'Como foi a recepção? Você conseguiu mudar a visão de alguém? Registre.' }
    ]
  },
  {
    id: 'project-management',
    title: 'Organização de Projetos',
    description: 'Tire ideias do papel com organização simples. Do plano à execução.',
    duration: '5 semanas',
    stepsCount: 4,
    icon: 'layout',
    mission: 'Planeje e execute uma ação simples com começo, meio e fim.',
    reflectionQuestions: [
      "O planejamento funcionou?",
      "O que saiu diferente do esperado?",
      "Como me senti organizando?"
    ],
    steps: [
      { id: 1, title: 'O Plano', content: 'Defina uma ação simples (ex: organizar seu quarto, um estudo em grupo, um evento pequeno).' },
      { id: 2, title: 'Ferramentas', content: 'Crie um checklist de tarefas ou um cronograma simples de datas.' },
      { id: 3, title: 'Coordenação', content: 'Se envolver outras pessoas, divida as tarefas. Se for só você, siga o cronograma.' },
      { id: 4, title: 'Avaliação', content: 'Ao final, compare o planejado com o realizado. O que funcionou? O que falhou?' }
    ]
  },
  {
    id: 'social-media',
    title: 'Redes Sociais → Causas',
    description: 'Use as redes não só para consumo, mas para criar movimento e engajamento.',
    duration: '4 semanas',
    stepsCount: 4,
    icon: 'smartphone',
    mission: 'Crie um post com intenção de engajamento real sobre um tema útil.',
    reflectionQuestions: [
      "Consegui engajar alguém?",
      "Os números importam ou a mensagem importa?",
      "O que aprendi sobre estratégia?"
    ],
    steps: [
      { id: 1, title: 'Estratégia', content: 'Defina um objetivo: informar, inspirar ou convocar para ação?' },
      { id: 2, title: 'Criação', content: 'Crie um post de engajamento (enquete, pergunta, carrossel informativo).' },
      { id: 3, title: 'Análise', content: 'Após 24h, olhe não só as curtidas, mas os comentários e salvamentos. O que eles dizem?' },
      { id: 4, title: 'Ajuste', content: 'Com base nos dados, o que você mudaria para o próximo post?' }
    ]
  },
  {
    id: 'leadership',
    title: 'Liderança Jovem',
    description: 'Liderar é servir. Aprenda a guiar pequenos grupos e iniciativas.',
    duration: '4 semanas',
    stepsCount: 4,
    icon: 'users',
    mission: 'Lidere uma pequena atividade ou iniciativa.',
    reflectionQuestions: [
      "Foi difícil liderar?",
      "Eu ouvi as pessoas?",
      "O objetivo foi alcançado?"
    ],
    steps: [
      { id: 1, title: 'Iniciativa', content: 'Identifique uma oportunidade de liderar (trabalho escolar, esporte, projeto familiar).' },
      { id: 2, title: 'Plano de Ação', content: 'Crie um plano simples de quem faz o que e qual o objetivo comum.' },
      { id: 3, title: 'Orientação', content: 'Oriente os colegas, tire dúvidas e motive o grupo durante a execução.' },
      { id: 4, title: 'Reflexão', content: 'Pergunte ao grupo como foi sua liderança e registre os aprendizados.' }
    ]
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'dollar': return <DollarSign className="w-6 h-6 text-green-600" />;
    case 'megaphone': return <Megaphone className="w-6 h-6 text-purple-600" />;
    case 'layout': return <Layout className="w-6 h-6 text-blue-600" />;
    case 'users': return <Users className="w-6 h-6 text-orange-600" />;
    case 'heart': return <Heart className="w-6 h-6 text-red-600" />;
    case 'briefcase': return <Briefcase className="w-6 h-6 text-slate-600" />;
    case 'smartphone': return <Smartphone className="w-6 h-6 text-pink-600" />;
    default: return <Layout className="w-6 h-6" />;
  }
};

export const Tracks: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-display">Trilhas Práticas</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Escolha um caminho. Aprenda rápido. Aplique agora. <br/>
          Passos pequenos para grandes mudanças.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRACKS_DATA.map((track) => (
          <Link key={track.id} to={`/tracks/${track.id}`} className="group block h-full active:scale-[0.98] transition-all duration-200">
            <div className="bg-white rounded-3xl p-6 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-impa-50 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-impa-100"></div>
              
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="p-4 bg-impa-50 rounded-2xl group-hover:bg-white group-hover:shadow-md transition">
                  {getIcon(track.icon)}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-impa-600 transition font-display">{track.title}</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{track.description}</p>
              
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3 mr-1" /> {track.duration}
                  </span>
                  <span className="text-impa-600 font-bold flex items-center bg-impa-50 px-3 py-1 rounded-lg group-hover:bg-impa-600 group-hover:text-white transition">
                    Começar <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};