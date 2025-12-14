import React, { useState } from 'react';
import { Send, CheckCircle, ShieldAlert, MessageSquarePlus } from 'lucide-react';
import { getCurrentUser, saveQuestion } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const Mentor: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'question' | 'suggestion'>('question');
  const user = getCurrentUser();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        navigate('/login');
        return;
    }
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    saveQuestion({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        topic: (formData.get('topic') as string) || 'Geral',
        content: formData.get('content') as string,
        type: activeTab
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-action-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-action-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display">
            {activeTab === 'question' ? 'Pergunta Enviada!' : 'Sugestão Recebida!'}
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {activeTab === 'question' 
            ? 'Obrigado! Sua pergunta foi enviada. Nossa equipe de mentoria analisará e responderá em breve no seu e-mail.'
            : 'Obrigado por nos ajudar a melhorar a IMPA. Nós lemos todas as sugestões com carinho!'}
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-impa-600 font-bold hover:text-impa-700 hover:underline active:scale-95 transition-transform"
        >
          Enviar outra {activeTab === 'question' ? 'pergunta' : 'sugestão'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 font-display">
            {activeTab === 'question' ? 'Falar com um Mentor' : 'Caixa de Sugestões'}
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          {activeTab === 'question' 
            ? 'Travou em algum passo? Tem dúvidas? Envie para nós. É gratuito, seguro e privado.' 
            : 'Tem uma ideia para melhorar a IMPA? Queremos ouvir você!'}
        </p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-lg border border-white p-6 md:p-10">
        
        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-100 mb-8 pb-1">
            <button 
                onClick={() => setActiveTab('question')}
                className={`pb-3 px-4 font-bold text-sm transition-colors ${activeTab === 'question' ? 'text-impa-600 border-b-2 border-impa-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Tirar Dúvida
            </button>
            <button 
                onClick={() => setActiveTab('suggestion')}
                className={`pb-3 px-4 font-bold text-sm transition-colors ${activeTab === 'suggestion' ? 'text-impa-600 border-b-2 border-impa-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Dar Sugestão
            </button>
        </div>

        {activeTab === 'question' && (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8 flex gap-3 items-start animate-fade-in">
            <ShieldAlert className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
                Para sua segurança, todas as mensagens são centralizadas pela <strong>administração da IMPA</strong>. 
                Não compartilhamos seus dados diretamente com mentores individuais.
            </p>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Seu Nome</label>
              <input type="text" name="name" defaultValue={user?.name} required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="Como quer ser chamado?" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sua Idade</label>
              <input type="number" name="age" defaultValue={user?.age} min="10" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="Idade" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Seu E-mail</label>
                <input type="email" name="email" defaultValue={user?.email} required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="Para receber a resposta" />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Telefone</label>
                <input type="tel" name="phone" defaultValue={user?.phone} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="(XX) 99999-9999" />
            </div>
          </div>

          {activeTab === 'question' && (
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Trilha / Assunto</label>
                <select name="topic" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition">
                <option value="money">Renda com o que sei</option>
                <option value="social-impact">Comunicação → Impacto</option>
                <option value="project-management">Organização e Projetos</option>
                <option value="social-media">Redes Sociais → Causas</option>
                <option value="leadership">Liderança Jovem</option>
                <option value="other">Outro assunto</option>
                </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
                {activeTab === 'question' ? 'Sua Pergunta' : 'Sua Sugestão'}
            </label>
            <textarea 
              name="content"
              required
              rows={6} 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none resize-none transition"
              placeholder={activeTab === 'question' ? "Explique sua situação com detalhes..." : "O que podemos melhorar na plataforma? Sinta-se à vontade!"}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
          >
            {activeTab === 'question' ? 'Enviar para Análise' : 'Enviar Sugestão'}
            <Send className="w-4 h-4 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};