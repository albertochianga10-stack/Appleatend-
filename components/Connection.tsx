
import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, QrCode, RefreshCcw, Info } from 'lucide-react';

interface Props {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  addToast: (msg: string, type?: 'success' | 'info') => void;
}

const Connection: React.FC<Props> = ({ isConnected, setIsConnected, addToast }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateConnection = () => {
    setIsConnecting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setIsConnected(true);
          addToast('WhatsApp sincronizado com sucesso!');
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  const handleDisconnect = () => {
    if (confirm('Deseja realmente desconectar a instância da Applemar?')) {
      setIsConnected(false);
      setProgress(0);
      addToast('Dispositivo desconectado', 'info');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500 pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Conectar Instância</h2>
        <p className="text-gray-500">Sincronize o seu WhatsApp Business com o sistema Applemar.</p>
      </div>

      <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        {isConnected ? (
          <div className="flex flex-col items-center py-8 space-y-6">
            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <CheckCircle2 size={64} className="animate-in zoom-in duration-500" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-1">WhatsApp Conectado</h3>
              <p className="text-gray-500 text-sm">Dispositivo: iPhone 15 Pro de Applemar</p>
              <p className="text-gray-500 text-sm">Sinal: Excelente (98ms)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center hover:bg-white/10 transition-colors">
                <p className="text-xs text-gray-500 mb-1">Bateria</p>
                <p className="font-bold">88%</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center hover:bg-white/10 transition-colors">
                <p className="text-xs text-gray-500 mb-1">Mensagens/Dia</p>
                <p className="font-bold">2.4k</p>
              </div>
            </div>

            <button 
              onClick={handleDisconnect}
              className="mt-6 text-red-500 hover:text-red-400 font-medium text-sm transition-colors flex items-center gap-2 group"
            >
              <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Desconectar Dispositivo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              {[
                { n: '1', t: 'WhatsApp no Telemóvel', s: 'Aceda a Definições > Dispositivos Conectados' },
                { n: '2', t: 'Conectar Dispositivo', s: 'Aponte a câmara para o código ao lado' },
                { n: '3', t: 'Pronto a Atuar', s: 'O bot assumirá o suporte em segundos' }
              ].map(step => (
                <div key={step.n} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#E2A78F] font-bold">{step.n}</div>
                  <div>
                    <p className="text-sm font-semibold">{step.t}</p>
                    <p className="text-xs text-gray-500">{step.s}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex gap-3">
                <ShieldCheck className="text-blue-400 shrink-0" size={20} />
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  As suas mensagens são protegidas por criptografia de ponta-a-ponta. 
                  A Applemar não armazena o conteúdo das conversas.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E2A78F] to-[#B87333] rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-2xl">
                  {isConnecting ? (
                    <div className="w-48 h-48 flex flex-col items-center justify-center gap-4 text-black text-center">
                      <RefreshCcw className="animate-spin text-[#E2A78F]" size={40} />
                      <p className="text-sm font-bold">Sincronizando...</p>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="h-full applemar-gradient transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <button className="relative cursor-pointer block" onClick={simulateConnection}>
                      <QrCode size={192} className="text-black" />
                      <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                        <div className="applemar-gradient text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                          <RefreshCcw size={14} />
                          Gerar Novo
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6 flex items-center gap-1 font-medium">
                <Info size={14} className="text-blue-400" />
                Segurança: Conexão encriptada SSL/TLS
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Smartphone, title: 'Multi-Instância', desc: 'Até 4 contas ligadas' },
          { icon: ShieldCheck, title: 'Compliance', desc: 'Segurança ISO 27001' },
          { icon: RefreshCcw, title: 'Auto-Sync', desc: 'Sincronização Cloud' }
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={() => addToast(`Informação sobre ${item.title}`, 'info')}
            className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 flex items-center gap-4 text-left hover:bg-white/5 transition-all hover:border-white/10"
          >
            <div className="p-3 rounded-xl bg-white/5 text-[#E2A78F]">
              <item.icon size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold">{item.title}</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Connection;
