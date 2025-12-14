import React, { useState, useEffect } from 'react';
import { getCurrentUser, saveDiaryEntry, getDiaryEntries } from '../services/authService';
import { DiaryEntry } from '../types';
import { useNavigate } from 'react-router-dom';
import { PenTool, Image as ImageIcon, Send, BookOpen, Clock } from 'lucide-react';
import { TRACKS_DATA } from './Tracks';
import { Avatar } from '../components/Avatar';

export const Journal: React.FC = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [trackId, setTrackId] = useState('general');
  const [imageUrl, setImageUrl] = useState(''); // Simple URL input for MVP
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }
    setEntries(getDiaryEntries(user.id));
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newEntry = saveDiaryEntry({
      userId: user.id,
      trackId,
      content,
      imageUrl: imageUrl || undefined,
    });

    setEntries([newEntry, ...entries]);
    setContent('');
    setImageUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 font-display flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-impa-600" />
          Meu Diário de Trilha
        </h1>
        <p className="text-slate-600">
          Registre sua evolução, poste fotos dos seus projetos e anote seus aprendizados. <br/>
          Seus mentores lerão isso para te ajudar!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Input Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-impa-500" />
              Novo Registro
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Qual Trilha?</label>
                <select 
                  value={trackId} 
                  onChange={(e) => setTrackId(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition"
                >
                  <option value="general">Geral / Reflexão</option>
                  {TRACKS_DATA.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="O que você fez hoje? O que aprendeu?"
                  required
                  rows={6}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-impa-500 focus:outline-none resize-none transition"
                />
              </div>

              <div>
                 <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                   <ImageIcon className="w-3 h-3" /> Foto (URL Opcional)
                 </label>
                 <input 
                   type="url" 
                   value={imageUrl}
                   onChange={(e) => setImageUrl(e.target.value)}
                   placeholder="https://..."
                   className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition"
                 />
                 <p className="text-[10px] text-slate-400 mt-1">Cole um link de imagem do Google ou Unsplash.</p>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                Publicar no Diário
                <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/* Timeline */}
        <div className="md:col-span-2 space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300">
               <p className="text-slate-400">Nenhum registro ainda. Comece hoje!</p>
            </div>
          ) : (
            entries.map(entry => {
              const trackName = TRACKS_DATA.find(t => t.id === entry.trackId)?.title || 'Geral';
              return (
                <div key={entry.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 animate-fade-in">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    {user?.avatar ? (
                        <Avatar config={user.avatar} size="sm" className="shadow-sm" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-impa-100 flex items-center justify-center text-impa-600 font-bold">
                            {user?.name.charAt(0)}
                        </div>
                    )}
                    <div className="h-full w-0.5 bg-slate-100 mt-2"></div>
                  </div>
                  <div className="flex-grow">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-bold text-impa-600 bg-impa-50 px-2 py-0.5 rounded-full mb-1 inline-block">
                            {trackName}
                          </span>
                          <p className="text-xs text-slate-400 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(entry.date).toLocaleDateString()} às {new Date(entry.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                     </div>
                     <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                     
                     {entry.imageUrl && (
                       <div className="mt-4 rounded-xl overflow-hidden border border-slate-100">
                         <img src={entry.imageUrl} alt="Registro do diário" className="w-full h-auto max-h-64 object-cover" />
                       </div>
                     )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
};