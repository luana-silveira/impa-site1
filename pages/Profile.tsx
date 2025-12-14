import React, { useState, useEffect } from 'react';
import { getCurrentUser, getAllUserProgress, getQuizResult, updateUserAvatar } from '../services/authService';
import { Shield, BookOpen, Star, Edit2, Save, Lightbulb, ArrowRight } from 'lucide-react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { TRACKS_DATA } from './Tracks';
import { Avatar, AvatarEditor, DEFAULT_AVATAR } from '../components/Avatar';
import { AvatarConfig, User } from '../types';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        setUser(currentUser);
        if (currentUser.avatar) {
            setAvatarConfig(currentUser.avatar);
        }
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSaveAvatar = () => {
      const updatedUser = updateUserAvatar(avatarConfig);
      if(updatedUser) {
          setUser(updatedUser);
          setIsEditingAvatar(false);
      }
  };

  const progress = getAllUserProgress(user.id);
  const quizResult = getQuizResult(user.id);
  const startedTracks = Object.keys(progress).map(trackId => TRACKS_DATA.find(t => t.id === trackId)).filter(Boolean);
  const completedTracksCount = Object.keys(progress).filter(trackId => {
      const track = TRACKS_DATA.find(t => t.id === trackId);
      return track && progress[trackId] >= track.stepsCount;
  }).length;
  
  // Calculate total missions completed (total steps across all tracks)
  const totalMissionsCompleted = Object.values(progress).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
        
        <div className="grid md:grid-cols-12 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-6 flex flex-col items-center text-center">
                    <div className="relative group">
                        <Avatar config={avatarConfig} size="xl" className="shadow-xl" />
                        <button 
                            onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                            className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-slate-700 hover:text-impa-600 transition"
                            title="Editar Avatar"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    </div>
                    
                    {isEditingAvatar && (
                        <div className="mt-4 w-full animate-fade-in">
                            <AvatarEditor config={avatarConfig} onChange={setAvatarConfig} />
                            <button 
                                onClick={handleSaveAvatar}
                                className="w-full mt-2 bg-impa-600 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-impa-700 transition"
                            >
                                <Save className="w-4 h-4" /> Salvar Avatar
                            </button>
                        </div>
                    )}

                    <div className="mt-6">
                        <h1 className="text-2xl font-bold font-display text-slate-900">{user.name}</h1>
                        <p className="text-slate-500 text-sm">{user.email}</p>
                        <div className="mt-3 inline-flex items-center bg-impa-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-impa-700">
                            {user.role === 'mentor' ? 'Mentor IMPA' : 'Aluno IMPA'}
                        </div>
                    </div>
                    
                    <div className="mt-6 w-full border-t border-slate-100 pt-6 text-left space-y-2 text-sm text-slate-600">
                        <p><strong>Idade:</strong> {user.age}</p>
                        <p><strong>País:</strong> {user.country || 'Brasil'}</p>
                        <p><strong>Escolaridade:</strong> {user.education ? user.education.replace(/_/g, ' ') : '-'}</p>
                    </div>
                </div>

                {user.role === 'student' && (
                    <div className="bg-gradient-to-br from-impa-600 to-impa-800 rounded-[2rem] shadow-lg p-6 text-white">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-300" /> Impacto Pessoal
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-3xl font-bold">{totalMissionsCompleted}</span>
                                <p className="text-impa-100 text-xs uppercase font-bold">Missões Concluídas</p>
                            </div>
                            <div>
                                <span className="text-3xl font-bold">{completedTracksCount}</span>
                                <p className="text-impa-100 text-xs uppercase font-bold">Trilhas Finalizadas</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Column: Detailed Stats & Progress */}
            <div className="md:col-span-8 lg:col-span-9 space-y-8">
                
                {/* Habilidades - Show Result OR Call to Action */}
                {user.role === 'student' && (
                    <>
                        {quizResult ? (
                            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 font-display flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-impa-500" /> Suas Habilidades Mapeadas
                                </h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {quizResult.topSkills.map((s, i) => (
                                        <div key={i} className="bg-impa-50 p-4 rounded-xl border border-impa-100">
                                            <h4 className="font-bold text-impa-800 mb-1">{s.skill}</h4>
                                            <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-sm text-slate-600 italic">"{quizResult.encouragement}"</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-impa-100 rounded-full flex items-center justify-center mb-4">
                                    <Lightbulb className="w-8 h-8 text-impa-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-display">Descubra seus Superpoderes</h2>
                                <p className="text-slate-600 mb-6 max-w-lg">
                                    Você ainda não mapeou suas habilidades. Faça o quiz rápido de 2 minutos para receber seu Mapa de Potencial e recomendações personalizadas.
                                </p>
                                <Link 
                                    to="/quiz"
                                    className="px-8 py-3 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center"
                                >
                                    Fazer Quiz Agora
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </div>
                        )}
                    </>
                )}

                {/* Trilhas Ativas */}
                {user.role === 'student' && (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-impa-500" /> Trilhas em Andamento
                            </h2>
                            <Link to="/tracks" className="text-sm font-bold text-impa-600 hover:underline">Ver todas</Link>
                        </div>

                        {startedTracks.length > 0 ? (
                            <div className="space-y-4">
                                {startedTracks.map((track) => {
                                    if (!track) return null;
                                    const currentStep = progress[track.id] || 0;
                                    const percent = Math.round((currentStep / track.stepsCount) * 100);
                                    
                                    return (
                                        <div key={track.id} className="border border-slate-100 rounded-xl p-4 hover:border-impa-200 transition">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-bold text-slate-800">{track.title}</h3>
                                                <span className="text-xs font-bold text-impa-600 bg-impa-50 px-2 py-1 rounded-lg">{percent}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full mb-3">
                                                <div className="bg-impa-500 h-2 rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                                            </div>
                                            <div className="flex justify-end">
                                                <Link 
                                                    to={`/tracks/${track.id}`}
                                                    className="text-sm font-bold text-slate-500 hover:text-impa-600 flex items-center"
                                                >
                                                    Continuar <span className="ml-1">&rarr;</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-500 mb-4">Você ainda não iniciou nenhuma trilha.</p>
                                <Link to="/tracks" className="px-6 py-2 bg-impa-600 text-white rounded-lg font-bold text-sm hover:bg-impa-700 transition">
                                    Começar Agora
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};