import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for UI fluidity
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const user = loginUser(formData.email, formData.password);
      
      // Smart redirect based on role
      if (user.role === 'mentor') {
        navigate('/dashboard');
      } else {
        // Redirect students to profile so they can see their avatar/progress or start quiz
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-impa-50 animate-fade-in">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-white max-w-md w-full relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-impa-400 to-impa-600"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-display">Bem-vindo de volta!</h1>
          <p className="text-slate-500 mt-2">Pronto para continuar sua jornada?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100">{error}</div>}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
            <input name="email" type="email" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Senha</label>
            <input name="password" type="password" required onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-impa-500 focus:outline-none transition" />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-impa-600 text-white font-bold rounded-xl hover:bg-impa-700 disabled:bg-impa-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl mt-2 flex items-center justify-center active:scale-[0.98]"
          >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                </>
            ) : (
                'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Não tem conta? <Link to="/register" className="text-impa-600 font-bold hover:underline">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};