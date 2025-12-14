import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, LogOut, User as UserIcon, BookOpen, LayoutDashboard } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../services/authService';
import { User } from '../types';
import { Avatar } from './Avatar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  const isActive = (path: string) => location.pathname === path ? "text-impa-600 font-bold bg-impa-50 px-3 py-1 rounded-lg" : "text-slate-500 hover:text-impa-500 px-3 py-1";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-impa-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-impa-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-impa-500 to-impa-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                  I
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight font-display">IMPA</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className={isActive('/')}>Início</Link>
              <Link to="/tracks" className={isActive('/tracks')}>Trilhas</Link>
              
              {user?.role === 'student' && (
                 <Link to="/journal" className={isActive('/journal')}>Meu Diário</Link>
              )}
              
              {user?.role === 'mentor' && (
                 <Link to="/dashboard" className={isActive('/dashboard')}>Painel do Mentor</Link>
              )}

              <Link to="/mentor" className={isActive('/mentor')}>Dúvidas</Link>
              <Link to="/about" className={isActive('/about')}>Sobre</Link>
              
              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-impa-600 transition group">
                    {user.avatar ? (
                        <Avatar config={user.avatar} size="sm" className="w-8 h-8 ring-2 ring-white shadow-sm group-hover:scale-105 transition-transform" />
                    ) : (
                        <UserIcon className="w-4 h-4 text-impa-500 group-hover:scale-110 transition-transform" />
                    )}
                    <span className="ml-1">Olá, {user.name.split(' ')[0]}</span>
                    {user.role === 'mentor' && <span className="text-xs bg-impa-100 text-impa-700 px-2 py-0.5 rounded-full">Mentor</span>}
                  </Link>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition" title="Sair">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                   <Link to="/login" className="text-slate-600 font-medium hover:text-impa-600 text-sm">Entrar</Link>
                   <Link to="/register" className="bg-impa-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-impa-700 transition shadow-sm hover:shadow-md">Cadastre-se</Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-slate-500 hover:text-slate-700 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-impa-100 animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link to="/" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Início</Link>
              <Link to="/tracks" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Trilhas Práticas</Link>
              
              {user?.role === 'student' && (
                 <Link to="/journal" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Meu Diário</Link>
              )}
              
              {user?.role === 'mentor' && (
                 <Link to="/dashboard" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Painel do Mentor</Link>
              )}

              <Link to="/mentor" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Dúvidas & Sugestões</Link>
              <Link to="/about" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Sobre Nós</Link>
              
              <div className="border-t border-slate-100 my-4 pt-4">
                {user ? (
                   <div className="space-y-3">
                     <div className="px-3 flex items-center gap-3">
                        {user.avatar && <Avatar config={user.avatar} size="sm" />}
                        <p className="text-sm text-slate-500">Logado como <strong className="text-impa-600">{user.name}</strong></p>
                     </div>
                     <Link to="/profile" onClick={toggleMenu} className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-impa-600 hover:bg-impa-50">Meu Perfil</Link>
                     <button onClick={() => { handleLogout(); toggleMenu(); }} className="w-full text-left block px-3 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50">Sair</button>
                   </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-3">
                    <Link to="/login" onClick={toggleMenu} className="flex justify-center py-3 border border-slate-200 rounded-xl text-slate-600 font-bold">Entrar</Link>
                    <Link to="/register" onClick={toggleMenu} className="flex justify-center py-3 bg-impa-600 text-white rounded-xl font-bold shadow-md">Cadastrar</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-impa-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-impa-900 text-xl font-bold mb-4 flex items-center gap-2 font-display">
                 <Rocket className="w-6 h-6 text-impa-500" /> IMPA
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Plataforma de descoberta de habilidades, ação prática e impacto social. 
                Acreditamos que todo jovem tem potencial para transformar sua realidade.
              </p>
            </div>
            <div>
              <h4 className="text-impa-900 font-bold mb-4 font-display">Plataforma</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/tracks" className="hover:text-impa-600 transition">Trilhas Práticas</Link></li>
                <li><Link to="/journal" className="hover:text-impa-600 transition">Diário de Trilha</Link></li>
                <li><Link to="/mentor" className="hover:text-impa-600 transition">Falar com Mentor</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-impa-900 font-bold mb-4 font-display">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/about" className="hover:text-impa-600 transition">Sobre Nós</Link></li>
                <li><Link to="/about" className="hover:text-impa-600 transition">Termos de Uso</Link></li>
                <li><Link to="/about" className="hover:text-impa-600 transition">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} IMPA. Todos os direitos reservados.</p>
            <p>Feito para jovens, por jovens.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};