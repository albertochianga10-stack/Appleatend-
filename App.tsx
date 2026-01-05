
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Link2, 
  Search,
  Bell,
  User,
  Power,
  Menu,
  X,
  CheckCircle2,
  Info
} from 'lucide-react';
import { View, Chat, BotConfig } from './types';
import Dashboard from './components/Dashboard';
import LiveChat from './components/LiveChat';
import BotSettings from './components/BotSettings';
import Analytics from './components/Analytics';
import Connection from './components/Connection';

const DEFAULT_CONFIG: BotConfig = {
  name: "Applemar AI",
  personality: "Sofisticada, prestativa e eficiente.",
  welcomeMessage: "Olá! Bem-vindo à Applemar. Como posso elevar a sua experiência hoje?",
  autoReplyEnabled: true,
  businessContext: "Applemar é uma marca premium de tecnologia e estilo de vida. Focamos em design minimalista e qualidade superior."
};

const App: React.FC = () => {
  // Carregar dados iniciais do localStorage
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [botConfig, setBotConfig] = useState<BotConfig>(() => {
    const saved = localStorage.getItem('applemar_bot_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });
  const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem('applemar_connected') === 'true';
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'info'}[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Persistir alterações
  useEffect(() => {
    localStorage.setItem('applemar_bot_config', JSON.stringify(botConfig));
  }, [botConfig]);

  useEffect(() => {
    localStorage.setItem('applemar_connected', isConnected.toString());
  }, [isConnected]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleMarkAsRead = () => {
    setUnreadNotifications(0);
    setShowNotifications(false);
    addToast('Notificações marcadas como lidas', 'info');
  };

  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: View }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view 
          ? 'bg-gradient-to-r from-[#E2A78F]/20 to-transparent text-[#E2A78F] border-l-4 border-[#E2A78F]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Toast System */}
      <div className="fixed top-6 right-6 z-[100] space-y-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="animate-in slide-in-from-right-10 flex items-center gap-3 bg-[#0A0A0A] border border-white/10 p-4 rounded-2xl shadow-2xl pointer-events-auto min-w-[280px] backdrop-blur-md">
            {toast.type === 'success' ? <CheckCircle2 size={20} className="text-green-500" /> : <Info size={20} className="text-[#E2A78F]" />}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r border-white/5 bg-[#0A0A0A] flex flex-col transition-all duration-300 z-50`}>
        <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-8 h-8 rounded-lg applemar-gradient flex items-center justify-center shrink-0 shadow-lg shadow-[#E2A78F]/20">
            <span className="text-black font-bold text-xs">A</span>
          </div>
          <span className={`font-brand text-lg applemar-text-gradient font-bold tracking-tighter transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
            APPLEMAR
          </span>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-2">
          <NavItem icon={LayoutDashboard} label="Visão Geral" view="dashboard" />
          <NavItem icon={MessageSquare} label="Atendimento" view="live-chat" />
          <NavItem icon={Settings} label="Configurar Bot" view="bot-settings" />
          <NavItem icon={BarChart3} label="Relatórios" view="analytics" />
          <NavItem icon={Link2} label="Conectar WhatsApp" view="connection" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            <span className={!isSidebarOpen ? 'hidden' : ''}>Recolher Menu</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-semibold capitalize tracking-tight">{currentView.replace('-', ' ')}</h1>
            <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-1.5 w-64 border border-white/5 focus-within:border-[#E2A78F]/40 focus-within:bg-white/10 transition-all">
              <Search size={16} className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Pesquisar em Applemar..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm focus:outline-none w-full placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'} animate-pulse`} />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{isConnected ? 'ONLINE' : 'OFFLINE'}</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-400 hover:text-white relative transition-all active:scale-90"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E2A78F] text-[10px] text-black font-bold rounded-full border border-[#050505] flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-sm">Notificações</h4>
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500">Applemar Central</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-[#E2A78F]/30 transition-colors cursor-pointer group">
                      <p className="text-xs font-medium group-hover:text-[#E2A78F]">Novo lead qualificado: Ricardo Santos</p>
                      <p className="text-[10px] text-gray-500 mt-1">Interessado em iPhone 15 Pro Max • Há 5 min</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-[#E2A78F]/30 transition-colors cursor-pointer group">
                      <p className="text-xs font-medium group-hover:text-[#E2A78F]">Sincronização Cloud Concluída</p>
                      <p className="text-[10px] text-gray-500 mt-1">Histórico de mensagens atualizado • Há 12 min</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleMarkAsRead}
                    className="w-full mt-4 text-xs text-[#E2A78F] font-bold py-2.5 hover:bg-[#E2A78F]/10 rounded-xl transition-all border border-[#E2A78F]/20"
                  >
                    Marcar todas como lidas
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Equipa Applemar</p>
                <p className="text-xs text-gray-500">Administrador Premium</p>
              </div>
              <button 
                onClick={() => addToast('Configurações de Perfil em breve', 'info')} 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E2A78F]/20 hover:border-[#E2A78F]/40 transition-all group"
              >
                <User size={20} className="text-gray-400 group-hover:text-[#E2A78F]" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 scroll-smooth bg-[#050505]">
          {currentView === 'dashboard' && <Dashboard setView={setCurrentView} addToast={addToast} />}
          {currentView === 'live-chat' && <LiveChat botConfig={botConfig} addToast={addToast} searchQuery={searchQuery} />}
          {currentView === 'bot-settings' && <BotSettings config={botConfig} setConfig={setBotConfig} addToast={addToast} />}
          {currentView === 'analytics' && <Analytics addToast={addToast} />}
          {currentView === 'connection' && <Connection isConnected={isConnected} setIsConnected={setIsConnected} addToast={addToast} />}
        </div>
      </main>
    </div>
  );
};

export default App;
