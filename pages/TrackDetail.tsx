import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TRACKS_DATA } from './Tracks';
import { ArrowLeft, CheckCircle, Lock, Play, HelpCircle } from 'lucide-react';
import { getCurrentUser, getTrackProgress, updateTrackProgress, saveStepResponse, getStepResponse } from '../services/authService';

export const TrackDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const track = TRACKS_DATA.find(t => t.id === id);
  const user = getCurrentUser();
  const [currentResponse, setCurrentResponse] = useState('');
  const [loadedResponses, setLoadedResponses] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (track) {
      const progress = getTrackProgress(user.id, track.id);
      setCurrentStepIndex(progress);
      
      // Load saved responses for previous steps
      const responses: Record<number, string> = {};
      track.steps.forEach(step => {
         const resp = getStepResponse(user.id, track.id, step.id);
         if (resp) responses[step.id] = resp;
      });
      setLoadedResponses(responses);
    }
  }, [user, track, navigate]);

  const handleStepComplete = (stepId: number) => {
    if (!user || !track) return;
    
    // Save response for current step
    saveStepResponse(user.id, track.id, stepId, currentResponse);
    setLoadedResponses({...loadedResponses, [stepId]: currentResponse});
    setCurrentResponse(''); // Clear for next step

    // Move to next step
    const nextStep = stepId; // stepId is 1-based, index is 0-based.
    updateTrackProgress(user.id, track.id, nextStep);
    setCurrentStepIndex(nextStep);
  };

  const handleFinishTrack = () => {
    // Logic to save final reflection could go here if needed individually
    navigate('/tracks');
  };

  if (!track) return <div>Trilha não encontrada</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <Link to="/tracks" className="inline-flex items-center text-slate-500 hover:text-impa-600 mb-8 transition font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Trilhas
      </Link>

      <div className="bg-white rounded-[2rem] border border-white shadow-lg overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-impa-900 to-impa-800 text-white p-8 md:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-4 uppercase tracking-wide border border-white/20">
              Trilha Prática
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">{track.title}</h1>
            <p className="text-lg text-impa-100 max-w-2xl">{track.description}</p>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
           <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">Seu Progresso</h2>
              <div className="space-y-6">
                {track.steps.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const isLocked = index > currentStepIndex;
                  const savedResponse = loadedResponses[step.id];

                  return (
                    <div key={step.id} className={`relative pl-8 md:pl-0 transition-all duration-500 ${isLocked ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
                      {/* Connector Line */}
                      {index < track.steps.length - 1 && (
                        <div className={`absolute left-4 md:left-[2.25rem] top-10 w-0.5 h-full -ml-px ${isCompleted ? 'bg-action-500' : 'bg-slate-200'}`} aria-hidden="true"></div>
                      )}
                      
                      <div className="flex flex-col md:flex-row md:items-start group">
                        {/* Status Icon */}
                        <div className="absolute left-0 md:relative md:mr-6 flex-shrink-0">
                          {isCompleted ? (
                            <div className="h-9 w-9 rounded-full bg-action-100 flex items-center justify-center border-2 border-action-500">
                              <CheckCircle className="h-5 w-5 text-action-600" />
                            </div>
                          ) : isCurrent ? (
                            <div className="h-9 w-9 rounded-full bg-impa-100 flex items-center justify-center border-2 border-impa-500 shadow-[0_0_0_4px_rgba(139,92,246,0.2)]">
                              <Play className="h-4 w-4 text-impa-600 ml-0.5" />
                            </div>
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-300">
                              <Lock className="h-4 w-4 text-slate-400" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 bg-slate-50 rounded-2xl p-6 border ${isCurrent ? 'border-impa-300 shadow-md bg-white' : 'border-slate-100'}`}>
                          <div className="flex justify-between items-center mb-2">
                             <h3 className={`text-lg font-bold font-display ${isCurrent ? 'text-impa-700' : 'text-slate-800'}`}>
                               {step.title}
                             </h3>
                             {isCompleted && <span className="text-xs font-bold text-action-600 bg-action-100 px-2 py-1 rounded-full">Concluído</span>}
                          </div>
                          
                          <p className="text-slate-600 mb-4 leading-relaxed">{step.content}</p>
                          
                          {isCurrent && (
                            <div className="mt-4">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Sua Resposta / Anotação:</label>
                                <textarea 
                                    value={currentResponse}
                                    onChange={(e) => setCurrentResponse(e.target.value)}
                                    placeholder="Escreva aqui sua resposta para completar este passo..."
                                    className="w-full p-3 border border-slate-300 rounded-xl mb-4 focus:ring-2 focus:ring-impa-500 focus:outline-none bg-white transition"
                                    rows={3}
                                />
                                <button 
                                  onClick={() => handleStepComplete(step.id)}
                                  disabled={currentResponse.trim().length === 0}
                                  className="inline-flex items-center px-6 py-3 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                                >
                                  Concluir Passo
                                  <CheckCircle className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                          )}

                          {isCompleted && savedResponse && (
                              <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Sua resposta:</p>
                                  <p className="text-sm text-slate-600 italic">"{savedResponse}"</p>
                              </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>

           {currentStepIndex >= track.stepsCount && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Completion Banner */}
                <div className="bg-action-50 border border-action-200 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-action-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-action-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-action-800 mb-2 font-display">Trilha Concluída!</h2>
                  <p className="text-action-700 mb-6">Parabéns! Você completou todos os passos.</p>
                  
                  <div className="bg-white p-6 rounded-xl border border-action-100 inline-block w-full max-w-lg shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-2 uppercase text-xs tracking-wider">Sua Primeira Missão (24h)</h3>
                     <p className="text-slate-900 font-medium text-lg leading-relaxed">"{track.mission}"</p>
                  </div>
                </div>

                {/* Reflection Section */}
                <div className="bg-white border border-impa-200 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-impa-600" />
                    Reflexão Final
                  </h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    {track.reflectionQuestions?.map((question, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-semibold text-slate-800 mb-2">{question}</p>
                        <textarea 
                          placeholder="Escreva sua resposta aqui para consolidar seu aprendizado..." 
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-impa-500 focus:outline-none h-24 resize-none transition"
                        ></textarea>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-right">
                    <button 
                        onClick={handleFinishTrack}
                        className="px-6 py-3 bg-slate-800 text-white rounded-lg font-bold text-sm hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                    >
                      Salvar Reflexão e Voltar para Trilhas
                    </button>
                  </div>
                </div>

              </div>
           )}
        </div>
      </div>
    </div>
  );
};