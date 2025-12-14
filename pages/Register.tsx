import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Role } from '../types';
import { registerUser } from '../services/authService';
import { User, Shield, GraduationCap, Lock, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: 'Brasil',
    education: '',
    interests: '',
    age: '',
    mentorCode: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types in the mentor code field to improve UX
    if (e.target.name === 'mentorCode') setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a small network delay for fluidity/feedback
    await new Promise(resolve => setTimeout(resolve, 800));

    if (role === 'mentor' && formData.mentorCode !== 'ImproveSkills') {
      setError('Código de acesso inválido. Entre em contato com a administração.');
      setIsLoading(false);
      return;
    }

    try {
      registerUser({
        name: formData.name,
        email: formData.email,
        role: role,
        age: formData.age,
        phone: formData.phone,
        country: formData.country,
        education: formData.education,
        interests: formData.interests
      }, formData.password);
      
      // Navigate based on role
      if (role === 'mentor') {
        navigate('/dashboard');
      } else {
        // Redirect student to profile as requested
        navigate('/profile'); 
      }
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-impa-50 animate-fade-in">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white max-w-lg w-full relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-impa-400 to-impa-600"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-display">Crie sua conta</h1>
          <p className="text-slate-500 mt-2">100% Gratuito. Comece sua jornada agora.</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-4 mb-8">
          <button 
            type="button"
            onClick={() => { setRole('student'); setError(''); }}
            className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 group active:scale-95 ${role === 'student' ? 'border-impa-500 bg-impa-50 text-impa-700 shadow-inner' : 'border-slate-100 text-slate-400 hover:border-impa-200 hover:text-slate-600'}`}
          >
            <div className={`p-2 rounded-full ${role === 'student' ? 'bg-white' : 'bg-slate-50 group-hover:bg-impa-50'}`}>
               <GraduationCap className={`w-6 h-6 ${role === 'student' ? 'text-impa-500' : 'text-slate-300 group-hover:text-impa-400'}`} />
            </div>
            <span className="font-bold text-sm">Sou Aluno</span>
          </button>
          
          <button 
            type="button"
            onClick={() => { setRole('mentor'); setError(''); }}
            className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 group active:scale-95 ${role === 'mentor' ? 'border-impa-500 bg-impa-50 text-impa-700 shadow-inner' : 'border-slate-100 text-slate-400 hover:border-impa-200 hover:text-slate-600'}`}
          >
             <div className={`p-2 rounded-full ${role === 'mentor' ? 'bg-white' : 'bg-slate-50 group-hover:bg-impa-50'}`}>
                <Shield className={`w-6 h-6 ${role === 'mentor' ? 'text-impa-500' : 'text-slate-300 group-hover:text-impa-400'}`} />
             </div>
            <span className="font-bold text-sm">Sou Mentor</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nome completo</label>
            <input name="name" type="text" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="Seu nome" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Idade</label>
                <input name="age" type="number" required onChange={handleChange} placeholder="Anos" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" />
            </div>
            <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">País</label>
                 <input name="country" type="text" defaultValue="Brasil" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
                <input name="email" type="email" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="seu@email.com" />
             </div>
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Telefone</label>
                <input name="phone" type="tel" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="(XX) 99999-9999" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-700 mb-1">Escolaridade</label>
             <select name="education" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition">
                 <option value="">Selecione...</option>
                 <option value="fundamental_cursando">Ensino Fundamental (Cursando)</option>
                 <option value="fundamental_completo">Ensino Fundamental (Completo)</option>
                 <option value="medio_cursando">Ensino Médio (Cursando)</option>
                 <option value="medio_completo">Ensino Médio (Completo)</option>
                 <option value="superior_cursando">Ensino Superior (Cursando)</option>
                 <option value="superior_completo">Ensino Superior (Completo)</option>
             </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Interesses Gerais</label>
            <input name="interests" type="text" onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="Ex: Tecnologia, Artes, Esportes..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
            <input name="password" type="password" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" placeholder="******" />
          </div>


          {/* Mentor Specific Section */}
          {role === 'mentor' && (
            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 animate-fade-in space-y-3">
              <div className="flex gap-3 items-start">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-impa-600">
                      <Lock className="w-5 h-5" />
                  </div>
                  <div>
                      <h3 className="font-bold text-impa-900 text-sm">Área Restrita</h3>
                      <p className="text-xs text-impa-800/80 leading-tight mt-1">
                          O cadastro de mentores é restrito e exige um código de acesso fornecido pela administração.
                      </p>
                  </div>
              </div>
              
              <div>
                 <label className="block text-xs font-bold text-impa-800 uppercase mb-1 ml-1">Código de Acesso</label>
                 <input 
                    name="mentorCode" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    placeholder="Digite o código" 
                    className="w-full p-3 bg-white border border-impa-200 text-impa-900 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition placeholder:text-impa-300" 
                 />
                 <p className="text-[10px] text-slate-500 mt-2 text-center">
                    Não tem o código? <a href="mailto:contatorotasima@gmail.com?subject=Solicitação de Código de Mentor - IMPA" className="underline hover:text-impa-600 font-bold">Fale com a administração (contatorotasima@gmail.com)</a>.
                 </p>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 disabled:bg-impa-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl mt-4 flex items-center justify-center active:scale-[0.98]"
          >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Criando conta...
                </>
            ) : (
                'Criar Conta Gratuita'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Já tem conta? <Link to="/login" className="text-impa-600 font-bold hover:underline">Faça login</Link>
        </div>
      </div>
    </div>
  );
};