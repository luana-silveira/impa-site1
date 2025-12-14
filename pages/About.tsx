import React from 'react';
import { Shield, Lock, Eye, Heart, Target, Users, BookOpen } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6 font-display">Sobre a IMPA</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Uma plataforma 100% gratuita que conecta clareza, ação prática e mentoria para jovens que querem transformar potencial em impacto.
        </p>
      </div>

      <div className="space-y-16">
        {/* Origin Story */}
        <section className="bg-impa-50 rounded-[2rem] p-10 border border-impa-100">
           <h2 className="text-2xl font-bold text-impa-900 mb-4 font-display">Nossa História</h2>
           <div className="space-y-4 text-slate-700 leading-relaxed">
             <p>
               A IMPA nasceu para resolver um problema que muitos jovens enfrentam: ter talentos e vontade de fazer acontecer, mas não saber por onde começar.
             </p>
             <p>
               Fundada por uma jovem que viveu esse desafio na pele, a plataforma foi desenhada para ser o guia que faltava. Não somos uma escola tradicional e não prometemos fórmulas mágicas.
             </p>
             <p>
               Acreditamos que todo jovem de 15 a 19 anos tem habilidades reais que podem ser usadas hoje para gerar renda, impacto social ou projetos pessoais. Nossa missão é destravar esse potencial através da prática.
             </p>
           </div>
        </section>

        {/* Mission / Vision */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-impa-900 mb-4 font-display">Como funciona?</h2>
            <ul className="space-y-4">
               <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-impa-100 text-impa-600 flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                  <p className="text-slate-700"><strong>Clareza:</strong> Mapas de potencial para descobrir suas habilidades.</p>
               </li>
               <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-impa-100 text-impa-600 flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                  <p className="text-slate-700"><strong>Ação:</strong> Trilhas curtas e práticas para executar ideias.</p>
               </li>
               <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-impa-100 text-impa-600 flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                  <p className="text-slate-700"><strong>Apoio:</strong> Mentoria centralizada e segura para tirar dúvidas.</p>
               </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-impa-100 hover:shadow-md transition-all duration-300">
               <Target className="w-8 h-8 text-impa-500 mb-3" />
               <h3 className="font-bold text-slate-900">Ação</h3>
               <p className="text-sm text-slate-500 mt-1">Foco no "aprender fazendo".</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-impa-100 translate-y-4 hover:shadow-md transition-all duration-300">
               <Users className="w-8 h-8 text-action-500 mb-3" />
               <h3 className="font-bold text-slate-900">Comunidade</h3>
               <p className="text-sm text-slate-500 mt-1">Feito de jovem para jovem.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-impa-100 hover:shadow-md transition-all duration-300">
               <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
               <h3 className="font-bold text-slate-900">Educação</h3>
               <p className="text-sm text-slate-500 mt-1">Conteúdo acessível e gratuito.</p>
            </div>
          </div>
        </section>

        {/* Safety & Terms */}
        <section className="bg-white p-10 rounded-[2rem] border border-white shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center font-display">
            <Shield className="w-7 h-7 text-impa-600 mr-3" />
            Legal e Segurança
          </h2>
          
          <div className="space-y-8 divide-y divide-slate-100">
            <div className="pt-4">
                <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-500" /> Privacidade e Segurança
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A IMPA prioriza a segurança dos seus usuários, especialmente menores de idade.
                  <ul>
                      <li>- Não compartilhamos dados com terceiros para fins comerciais.</li>
                      <li>- A mentoria é centralizada: alunos não têm contato direto privado com mentores.</li>
                      <li>- Todo o conteúdo é monitorado pela administração.</li>
                  </ul>
                </p>
            </div>

            <div className="pt-8">
                <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-slate-500" /> Termos de Uso
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  A IMPA é uma plataforma estritamente educacional. 
                  <ul>
                      <li>- <strong>Não oferecemos terapia:</strong> O foco é desenvolvimento de habilidades práticas.</li>
                      <li>- <strong>Sem garantia de renda:</strong> Ensinamos caminhos, mas os resultados dependem da execução do usuário.</li>
                      <li>- <strong>Responsabilidade:</strong> Decisões tomadas fora da plataforma são de responsabilidade do usuário.</li>
                  </ul>
                </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl mt-4 border border-slate-100">
              <p className="text-sm text-slate-500">
                <strong>Deseja excluir seus dados?</strong> Respeitamos a LGPD. 
                Envie um e-mail para <span className="text-impa-600 font-bold">contatorotasima@gmail.com</span> solicitando a exclusão completa da sua conta.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};