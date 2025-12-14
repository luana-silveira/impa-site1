import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, Zap, Heart, UserCheck } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

export const Home: React.FC = () => {
  const user = getCurrentUser();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-impa-100 via-white to-white pt-24 pb-32 px-4 text-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-impa-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block bg-white border border-impa-200 text-impa-700 text-xs font-bold px-4 py-1.5 rounded-full mb-8 shadow-sm">
            PLATAFORMA 100% GRATUITA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1] font-display">
            Descubra no que <br className="hidden md:block"/> você é <span className="text-transparent bg-clip-text bg-gradient-to-r from-impa-600 to-impa-400">bom</span>.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Use suas habilidades na prática. Gere impacto real. 
            Sem promessas falsas, sem pressão.
          </p>
          
          <div className="mb-10 bg-white/60 backdrop-blur-sm border border-impa-100 rounded-xl p-4 inline-flex items-center gap-3">
             <UserCheck className="text-impa-600 w-6 h-6" />
             <p className="text-sm font-medium text-slate-700 text-left">
               <strong>Atenção Personalizada:</strong> Mentores reais analisam seu perfil,<br/> seu diário e respondem todas as suas dúvidas.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
               <Link 
                to="/tracks" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-impa-600 hover:bg-impa-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
              >
                Continuar Jornada
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-impa-600 hover:bg-impa-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
              >
                Começar Agora (Grátis)
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
            
            <Link 
              to="/about" 
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-bold rounded-2xl text-slate-600 bg-white hover:bg-slate-50 transition-all duration-300 hover:border-impa-200 active:scale-95"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-20 px-4 bg-white relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 font-display">Como começar na IMPA</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:border-impa-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 bg-white shadow-md text-impa-600 rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl font-display">1</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Cadastro</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Crie sua conta gratuita em 30 segundos.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:border-impa-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 bg-white shadow-md text-impa-600 rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl font-display">2</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Quiz</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Descubra suas potências reais e a melhor trilha.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:border-impa-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 bg-white shadow-md text-impa-600 rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl font-display">3</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Ação</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Siga passos práticos e registre tudo no seu Diário.</p>
            </div>

            <div className="bg-impa-600 p-8 rounded-3xl border border-impa-600 text-center text-white shadow-xl transform md:-translate-y-2 hover:-translate-y-3 transition-all duration-300">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl font-display">4</div>
              <h3 className="font-bold text-lg mb-2">Impacto</h3>
              <p className="text-impa-100 text-sm leading-relaxed">Receba feedback dos mentores e gere resultado real.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};