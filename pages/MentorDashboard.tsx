import React, { useState, useEffect } from 'react';
import { getCurrentUser, getAllStudents, getQuestions, updateQuestionStatus, getDiaryEntries, getAllUserProgress, getQuizResult } from '../services/authService';
import { User, MentorQuestion, DiaryEntry, PotentialMap } from '../types';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, CheckCircle, Clock, Search, ChevronRight, BookOpen, BrainCircuit } from 'lucide-react';
import { TRACKS_DATA } from './Tracks';
import { Avatar } from '../components/Avatar';

export const MentorDashboard: React.FC = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inbox'>('overview');
  const [students, setStudents] = useState<User[]>([]);
  const [questions, setQuestions] = useState<MentorQuestion[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  
  // Student Detail State
  const [studentDiary, setStudentDiary] = useState<DiaryEntry[]>([]);
  const [studentProgress, setStudentProgress] = useState<Record<string, number>>({});
  const [studentQuiz, setStudentQuiz] = useState<PotentialMap | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'mentor') {
      navigate('/');
      return;
    }
    setStudents(getAllStudents());
    setQuestions(getQuestions());
  }, [user, navigate]);

  const handleSelectStudent = (student: User) => {
      setSelectedStudent(student);
      setStudentDiary(getDiaryEntries(student.id));
      setStudentProgress(getAllUserProgress(student.id));
      setStudentQuiz(getQuizResult(student.id));
  };

  const handleStatusUpdate = (id: string) => {
    updateQuestionStatus(id, 'answered');
    setQuestions(questions.map(q => q.id === id ? { ...q, status: 'answered' } : q));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-display">Painel do Mentor</h1>
          <p className="text-slate-600">Gerencie seus alunos e responda dúvidas.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200">
           <button 
             onClick={() => { setActiveTab('overview'); setSelectedStudent(null); }}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'overview' ? 'bg-impa-100 text-impa-700' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             <Users className="w-4 h-4 inline mr-2" />
             Alunos
           </button>
           <button 
             onClick={() => { setActiveTab('inbox'); setSelectedStudent(null); }}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'inbox' ? 'bg-impa-100 text-impa-700' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             <MessageSquare className="w-4 h-4 inline mr-2" />
             Caixa de Entrada
             {questions.filter(q => q.status === 'received').length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {questions.filter(q => q.status === 'received').length}
                </span>
             )}
           </button>
        </div>
      </div>

      {activeTab === 'overview' && !selectedStudent && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800">Todos os Alunos</h2>
           </div>
           <div className="divide-y divide-slate-100">
              {students.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">Nenhum aluno cadastrado ainda.</div>
              ) : (
                  students.map(student => (
                      <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                          <div className="flex items-center gap-4">
                              {student.avatar ? (
                                  <Avatar config={student.avatar} size="sm" />
                              ) : (
                                  <div className="w-10 h-10 rounded-full bg-impa-100 text-impa-600 flex items-center justify-center font-bold">
                                      {student.name.charAt(0)}
                                  </div>
                              )}
                              <div>
                                  <h3 className="font-bold text-slate-800">{student.name}</h3>
                                  <p className="text-xs text-slate-500">{student.email} • {student.age} anos</p>
                              </div>
                          </div>
                          <button 
                            onClick={() => handleSelectStudent(student)}
                            className="text-impa-600 hover:bg-impa-50 p-2 rounded-lg transition"
                          >
                             <ChevronRight className="w-5 h-5" />
                          </button>
                      </div>
                  ))
              )}
           </div>
        </div>
      )}

      {activeTab === 'overview' && selectedStudent && (
          <div className="animate-fade-in">
             <button onClick={() => setSelectedStudent(null)} className="text-slate-500 hover:text-impa-600 mb-4 text-sm font-bold flex items-center">
                 &larr; Voltar para lista
             </button>
             
             <div className="grid md:grid-cols-3 gap-6">
                 {/* Left Col: Info & Quiz */}
                 <div className="space-y-6">
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            {selectedStudent.avatar ? (
                                <Avatar config={selectedStudent.avatar} size="md" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-impa-600 text-white flex items-center justify-center font-bold text-xl">
                                    {selectedStudent.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h2 className="font-bold text-lg">{selectedStudent.name}</h2>
                                <p className="text-slate-500 text-sm">{selectedStudent.email}</p>
                            </div>
                        </div>
                     </div>

                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-impa-500" />
                            Mapa de Potencial
                        </h3>
                        {studentQuiz ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Top Habilidades</p>
                                    <ul className="list-disc pl-4 text-sm text-slate-700 mt-1">
                                        {studentQuiz.topSkills.map((s, i) => <li key={i}>{s.skill}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Trilha Sugerida</p>
                                    <p className="text-sm text-impa-600 font-bold">
                                        {TRACKS_DATA.find(t => t.id === studentQuiz.suggestedTrackId)?.title}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm">Aluno ainda não realizou o quiz.</p>
                        )}
                     </div>

                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Progresso nas Trilhas</h3>
                        {Object.keys(studentProgress).length > 0 ? (
                            <div className="space-y-2">
                                {Object.entries(studentProgress).map(([trackId, step]) => {
                                    const track = TRACKS_DATA.find(t => t.id === trackId);
                                    if (!track) return null;
                                    const percentage = Math.round((step / track.stepsCount) * 100);
                                    return (
                                        <div key={trackId}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>{track.title}</span>
                                                <span className="font-bold">{percentage}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-1.5 rounded-full">
                                                <div className="bg-action-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm">Nenhuma trilha iniciada.</p>
                        )}
                     </div>
                 </div>

                 {/* Right Col: Diary */}
                 <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-impa-500" />
                            Diário de Bordo
                        </h3>
                        
                        <div className="space-y-6">
                            {studentDiary.length === 0 ? (
                                <p className="text-slate-500 text-center py-10">O aluno ainda não fez registros no diário.</p>
                            ) : (
                                studentDiary.map(entry => (
                                    <div key={entry.id} className="border-l-2 border-slate-200 pl-4 pb-4">
                                        <div className="text-xs text-slate-400 mb-1">
                                            {new Date(entry.date).toLocaleDateString()} • {TRACKS_DATA.find(t => t.id === entry.trackId)?.title || 'Geral'}
                                        </div>
                                        <p className="text-slate-700 text-sm whitespace-pre-wrap">{entry.content}</p>
                                        {entry.imageUrl && (
                                            <a href={entry.imageUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline mt-1 block">Ver Imagem Anexada</a>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                 </div>
             </div>
          </div>
      )}

      {activeTab === 'inbox' && (
          <div className="space-y-4">
              {questions.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                      <p className="text-slate-500">Caixa de entrada vazia.</p>
                  </div>
              ) : (
                  questions.map(q => (
                      <div key={q.id} className={`bg-white p-6 rounded-2xl border shadow-sm transition ${q.status === 'received' ? 'border-l-4 border-l-red-500 border-y-slate-200 border-r-slate-200' : 'border-slate-200 opacity-70'}`}>
                          <div className="flex justify-between items-start mb-2">
                              <div>
                                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${q.type === 'suggestion' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                      {q.type === 'suggestion' ? 'Sugestão' : 'Dúvida'}
                                  </span>
                                  <span className="text-xs text-slate-400 ml-2">
                                      {new Date(q.date).toLocaleDateString()}
                                  </span>
                              </div>
                              {q.status === 'received' ? (
                                  <span className="text-xs font-bold text-red-500 flex items-center">
                                      <Clock className="w-3 h-3 mr-1" /> Pendente
                                  </span>
                              ) : (
                                  <span className="text-xs font-bold text-green-600 flex items-center">
                                      <CheckCircle className="w-3 h-3 mr-1" /> Respondido
                                  </span>
                              )}
                          </div>
                          
                          <h3 className="font-bold text-slate-800 text-lg mb-1">{q.userName} <span className="font-normal text-slate-500 text-sm">({q.userEmail})</span></h3>
                          <p className="text-xs font-bold text-slate-500 mb-3 uppercase">Tópico: {q.topic}</p>
                          
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                              <p className="text-slate-700 whitespace-pre-wrap">{q.content}</p>
                          </div>

                          {q.status === 'received' && (
                              <div className="flex justify-end">
                                  <button 
                                    onClick={() => handleStatusUpdate(q.id)}
                                    className="bg-action-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-action-600 transition flex items-center"
                                  >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Marcar como Respondido por E-mail
                                  </button>
                              </div>
                          )}
                      </div>
                  ))
              )}
          </div>
      )}
    </div>
  );
};