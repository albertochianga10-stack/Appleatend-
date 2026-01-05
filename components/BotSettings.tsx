
import React, { useState } from 'react';
import { Save, Bot, MessageSquare, Briefcase, Sparkles, SwitchCamera, Loader2 } from 'lucide-react';
import { BotConfig } from '../types';

interface Props {
  config: BotConfig;
  setConfig: (config: BotConfig) => void;
  addToast: (msg: string, type?: 'success' | 'info') => void;
}

const BotSettings: React.FC<Props> = ({ config, setConfig, addToast }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleToggle = () => {
    const newState = !config.autoReplyEnabled;
    setConfig({ ...config, autoReplyEnabled: newState });
    addToast(`Automação ${newState ? 'Ativada' : 'Desativada'}`, 'info');
  };

  const onSave = () => {
    setIsSaving(true);
    // Simula um delay de rede
    setTimeout(() => {
      setIsSaving(false);
      addToast('Configurações salvas com sucesso!');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Configurações do Bot</h2>
          <p className="text-gray-500">Defina a inteligência e o tom de voz da Applemar.</p>
        </div>
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="applemar-gradient text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#E2A78F]/10 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? 'A guardar...' : 'Salvar Alterações'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Bot className="text-[#E2A78F]" />
              <h3 className="font-semibold">Identidade do Assistente</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nome do Bot</label>
                <input 
                  type="text" 
                  name="name"
                  value={config.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2A78F]/50 transition-colors"
                  placeholder="Ex: Applemar AI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Personalidade</label>
                <input 
                  type="text" 
                  name="personality"
                  value={config.personality}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2A78F]/50 transition-colors"
                  placeholder="Ex: Sofisticada e prestativa"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SwitchCamera className="text-blue-400" />
                <div>
                  <h3 className="font-semibold text-sm">Automação Ativa</h3>
                  <p className="text-xs text-gray-500">O bot responderá automaticamente.</p>
                </div>
              </div>
              <button 
                onClick={handleToggle}
                className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 ${config.autoReplyEnabled ? 'bg-[#E2A78F]' : 'bg-white/10'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${config.autoReplyEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <MessageSquare className="text-[#E2A78F]" />
              <h3 className="font-semibold">Mensagens Base</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Saudação Inicial</label>
              <textarea 
                name="welcomeMessage"
                rows={3}
                value={config.welcomeMessage}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2A78F]/50 resize-none transition-colors"
                placeholder="Olá, como posso ajudar?"
              />
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Briefcase className="text-[#E2A78F]" />
              <h3 className="font-semibold">Contexto Empresarial</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Informações da Applemar</label>
              <textarea 
                name="businessContext"
                rows={5}
                value={config.businessContext}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E2A78F]/50 resize-none transition-colors"
                placeholder="Detalhes dos produtos, preços e política de envios..."
              />
              <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                <Sparkles size={12} className="text-[#E2A78F]" />
                O cérebro do seu bot (Gemini Flash) aprende com este texto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
