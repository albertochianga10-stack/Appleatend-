
import React from 'react';
import { Users, MessageCircle, Clock, Zap, ArrowUpRight, TrendingUp, ChevronRight } from 'lucide-react';
import { View } from '../types';

interface Props {
  setView: (view: View) => void;
  addToast: (msg: string, type?: 'success' | 'info') => void;
}

const StatCard = ({ label, value, trend, icon: Icon, color, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#E2A78F]/30 hover:bg-white/5 transition-all group cursor-pointer active:scale-95"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <span className="flex items-center text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-lg">
        <ArrowUpRight size={14} className="mr-1" />
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1 group-hover:text-gray-300 transition-colors">{label}</h3>
    <p className="text-2xl font-bold tracking-tight">{value}</p>
  </div>
);

const Dashboard: React.FC<Props> = ({ setView, addToast }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Olá, Applemar Suite</h2>
          <p className="text-gray-500">Controlo central de automação e atendimento.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setView('live-chat')}
            className="applemar-gradient text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#E2A78F]/20"
          >
            <MessageCircle size={18} />
            Ver Mensagens
          </button>
          <button 
            onClick={() => setView('analytics')}
            className="bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2"
          >
            <TrendingUp size={18} />
            Relatórios
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total de Conversas" 
          value="1,284" 
          trend="+12%" 
          icon={Users} 
          color="bg-blue-500"
          onClick={() => setView('live-chat')}
        />
        <StatCard 
          label="Interações Bot" 
          value="85%" 
          trend="+5%" 
          icon={Zap} 
          color="bg-purple-500"
          onClick={() => setView('bot-settings')}
        />
        <StatCard 
          label="Tempo de Resposta" 
          value="1.2m" 
          trend="-15%" 
          icon={Clock} 
          color="bg-orange-500"
          onClick={() => addToast('Otimização de resposta ativa', 'info')}
        />
        <StatCard 
          label="Taxa de Conversão" 
          value="24.8%" 
          trend="+8.4%" 
          icon={TrendingUp} 
          color="bg-green-500"
          onClick={() => setView('analytics')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Volume de Mensagens
              <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded uppercase font-bold tracking-widest">Live</span>
            </h3>
            <select 
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#E2A78F]/50 transition-colors"
              onChange={(e) => addToast(`Visualização alterada para ${e.target.value}`, 'info')}
            >
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Hoje</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-3 px-4">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="flex-1 group flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-white/5 rounded-t-lg relative overflow-hidden h-full"
                >
                   <div 
                    className="absolute bottom-0 left-0 w-full applemar-gradient rounded-t-lg transition-all duration-1000 group-hover:brightness-110" 
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-500 font-medium">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="font-semibold text-lg mb-6">Eficiência do Bot</h3>
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E2A78F]/10 border border-[#E2A78F]/20 flex items-center justify-center text-[#E2A78F] font-bold shadow-inner">85%</div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-2">
                   <p className="font-medium">Resolvido por IA</p>
                   <p className="text-gray-500">Metas Applemar</p>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="h-full applemar-gradient w-[85%] animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Ações Rápidas</h4>
              <div className="grid grid-cols-1 gap-2">
                 <button onClick={() => setView('bot-settings')} className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E2A78F]/30 hover:bg-white/10 transition-all text-xs font-bold text-left flex justify-between items-center group">
                    Treinar Bot com Contexto
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-[#E2A78F] transition-colors" />
                 </button>
                 <button onClick={() => setView('connection')} className="w-full p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#E2A78F]/30 hover:bg-white/10 transition-all text-xs font-bold text-left flex justify-between items-center group">
                    Reiniciar Instância WhatsApp
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-[#E2A78F] transition-colors" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
