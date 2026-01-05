
import React, { useState } from 'react';
import { BarChart3, PieChart, Activity, Users, MessageSquare, Download, Loader2 } from 'lucide-react';

interface Props {
  addToast: (msg: string, type?: 'success' | 'info') => void;
}

const Analytics: React.FC<Props> = ({ addToast }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      addToast('Relatório PDF gerado e pronto para download!');
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análise de Desempenho</h2>
          <p className="text-gray-500">Métricas detalhadas do atendimento Applemar.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {isExporting ? 'A gerar...' : 'Exportar PDF'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-8">
            <PieChart className="text-[#E2A78F]" />
            <h3 className="font-bold text-lg">Índice de Satisfação</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="96" cy="96" r="80" 
                  fill="transparent" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="16" 
                />
                <circle 
                  cx="96" cy="96" r="80" 
                  fill="transparent" 
                  stroke="#E2A78F" 
                  strokeWidth="16" 
                  strokeDasharray="502.6" 
                  strokeDashoffset="50.2" 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold animate-pulse">94%</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Ótimo</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 w-full gap-4">
              <button 
                onClick={() => addToast('Abrindo relatório de feedbacks...', 'info')}
                className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center hover:bg-white/10 transition-all"
              >
                <p className="text-xs text-gray-500 mb-1">Feedback Positivo</p>
                <p className="text-xl font-bold">4.8/5</p>
              </button>
              <button 
                onClick={() => addToast('Abrindo análise NPS...', 'info')}
                className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center hover:bg-white/10 transition-all"
              >
                <p className="text-xs text-gray-500 mb-1">NPS Applemar</p>
                <p className="text-xl font-bold">82</p>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-blue-400" />
            <h3 className="font-bold text-lg">Mensagens por Hora</h3>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-1 px-2">
            {[20, 30, 45, 60, 80, 100, 95, 70, 40, 25, 15, 10].map((h, i) => (
              <div key={i} className="flex-1 group flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-500/20 group-hover:bg-blue-500/50 group-hover:scale-110 rounded-t-lg transition-all cursor-help" 
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] text-gray-500">{i * 2}h</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-sm text-gray-400">
              <span className="font-bold text-white">Insight:</span> O maior volume ocorre entre as <span className="text-blue-400 font-bold">10:00 e 14:00</span>. Recomendamos reforçar o monitoramento humano neste período.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-bold text-lg">Ranking de Atendimento</h3>
          <button onClick={() => addToast('A carregar ranking completo...', 'info')} className="text-sm text-[#E2A78F] font-bold hover:underline transition-all">Ver Todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Agente</th>
                <th className="px-6 py-4">Conversas</th>
                <th className="px-6 py-4">T. Médio</th>
                <th className="px-6 py-4">Avaliação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'IA Applemar', chats: 842, time: '12s', rating: '98%' },
                { name: 'Bernardo Silva', chats: 124, time: '4m 32s', rating: '94%' },
                { name: 'Carla Mendes', chats: 98, time: '5m 12s', rating: '96%' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full applemar-gradient flex items-center justify-center text-xs font-bold text-black shadow-sm">
                        {row.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium group-hover:text-[#E2A78F] transition-colors">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">{row.chats}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{row.time}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${i === 0 ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {row.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
