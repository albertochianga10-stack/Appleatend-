
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Send, User, Bot, Phone, Video, MoreVertical, Search, Smile, Paperclip } from 'lucide-react';
import { Message, Chat, BotConfig } from '../types';
import { getBotResponse } from '../services/geminiService';

interface Props {
  botConfig: BotConfig;
  addToast: (msg: string, type?: 'success' | 'info') => void;
  searchQuery: string;
}

const INITIAL_CONTACTS = [
  { id: '1', name: 'Ricardo Santos', last: 'Disponibilidade do iPhone 15...', time: '14:30', avatar: '1' },
  { id: '2', name: 'Ana Oliveira', last: 'Obrigada pelo atendimento!', time: '12:15', avatar: '2' },
  { id: '3', name: 'Marcos Vale', last: 'Preciso de ajuda com o envio.', time: 'Ontem', avatar: '3' },
  { id: '4', name: 'Sofia Costa', last: 'Qual o valor do MacBook?', time: '2 dias', avatar: '4' },
];

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'Olá, gostaria de saber se vocês têm o novo iPhone disponível?', sender: 'user', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', text: 'Olá! Sou o assistente da Applemar. Sim, temos o novo modelo disponível em stock nas cores Preto e Titânio. Gostaria de mais detalhes?', sender: 'bot', timestamp: new Date(Date.now() - 3500000) }
];

const LiveChat: React.FC<Props> = ({ botConfig, addToast, searchQuery }) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeContact, setActiveContact] = useState(INITIAL_CONTACTS[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filtro de contatos baseado na busca global
  const filteredContacts = useMemo(() => {
    return INITIAL_CONTACTS.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.last.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    if (botConfig.autoReplyEnabled) {
      setIsTyping(true);
      const botReply = await getBotResponse(input, messages, botConfig);
      setIsTyping(false);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }
  };

  const handleAction = (action: string) => {
    addToast(`${action} não disponível na versão demo`, 'info');
  };

  const handleSelectContact = (contact: any) => {
    setActiveContact(contact);
    addToast(`Chat com ${contact.name} carregado`, 'info');
    // Simular carregamento de novas mensagens
    setMessages(MOCK_MESSAGES);
  };

  return (
    <div className="h-full flex gap-6 animate-in fade-in duration-500 overflow-hidden">
      {/* Contact List */}
      <div className="w-80 bg-[#0A0A0A] border border-white/5 rounded-2xl flex flex-col hidden lg:flex shrink-0">
        <div className="p-4 border-b border-white/5 bg-white/5 rounded-t-2xl">
           <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Conversas Ativas</h3>
           <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
             <input 
              type="text" 
              placeholder="Filtrar localmente..." 
              value={searchQuery}
              readOnly
              className="w-full bg-[#050505] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none cursor-default opacity-50"
            />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <button 
                key={contact.id} 
                onClick={() => handleSelectContact(contact)}
                className={`w-full p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-all border-l-4 text-left rounded-xl ${activeContact.id === contact.id ? 'border-[#E2A78F] bg-white/5' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 shrink-0 overflow-hidden border border-white/10">
                  <img src={`https://picsum.photos/seed/applemar${contact.avatar}/100/100`} alt="avatar" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-sm truncate">{contact.name}</h4>
                    <span className="text-[10px] text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.last}</p>
                </div>
                {contact.id === '1' && searchQuery === '' && <div className="w-2 h-2 bg-[#E2A78F] rounded-full shadow-[0_0_8px_#E2A78F]"></div>}
              </button>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-xs text-gray-500">Nenhum contacto encontrado para "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#0A0A0A] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative border-applemar/10">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                 <img src={`https://picsum.photos/seed/applemar${activeContact.avatar}/100/100`} alt="avatar" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]"></div>
            </div>
            <div>
              <h3 className="font-semibold">{activeContact.name}</h3>
              <p className="text-xs text-green-500 font-bold tracking-wider uppercase animate-pulse">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleAction('Chamada de Voz')} className="text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-xl border border-transparent hover:border-white/10"><Phone size={18} /></button>
            <button onClick={() => handleAction('Chamada de Vídeo')} className="text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-xl border border-transparent hover:border-white/10"><Video size={18} /></button>
            <button onClick={() => handleAction('Configurações do Contato')} className="text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-xl border border-transparent hover:border-white/10"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Message Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] scroll-smooth custom-scrollbar"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`max-w-[75%] flex gap-3 ${msg.sender === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${msg.sender === 'user' ? 'bg-white/5 border-white/10' : 'applemar-gradient border-black/10 shadow-lg'}`}>
                  {msg.sender === 'user' ? <User size={14} className="text-gray-400" /> : <Bot size={14} className="text-black" />}
                </div>
                <div className={`rounded-2xl p-4 shadow-xl transition-all hover:scale-[1.01] ${
                  msg.sender === 'user' 
                    ? 'bg-[#151515] text-white rounded-tl-none border border-white/10' 
                    : 'bg-[#0A0A0A] text-gray-200 rounded-tr-none border border-[#B87333]/30 shadow-[#B87333]/5'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-2">
                     <span className="text-[10px] text-gray-500 font-medium">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.sender === 'bot' && <div className="w-1 h-1 bg-[#E2A78F] rounded-full animate-pulse"></div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end animate-in fade-in duration-300">
              <div className="bg-[#0A0A0A] border border-[#B87333]/20 rounded-2xl px-4 py-2.5 flex gap-1.5 items-center shadow-lg">
                <div className="w-1.5 h-1.5 bg-[#E2A78F] rounded-full animate-bounce [animation-duration:0.6s]"></div>
                <div className="w-1.5 h-1.5 bg-[#E2A78F] rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:0.6s]"></div>
                <div className="w-1.5 h-1.5 bg-[#E2A78F] rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:0.6s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#0A0A0A] shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#E2A78F]/50 focus-within:bg-white/10 transition-all shadow-inner">
            <button onClick={() => handleAction('Emojis')} className="text-gray-500 hover:text-[#E2A78F] p-1 transition-colors active:scale-90"><Smile size={20} /></button>
            <button onClick={() => handleAction('Anexar Ficheiro')} className="text-gray-500 hover:text-[#E2A78F] p-1 transition-colors active:scale-90"><Paperclip size={20} /></button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escreva algo sofisticado..."
              className="flex-1 bg-transparent py-1 text-sm focus:outline-none placeholder:text-gray-700"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-2.5 rounded-xl transition-all shadow-xl group ${input.trim() ? 'applemar-gradient text-black scale-100 active:scale-95' : 'bg-white/5 text-gray-700 cursor-not-allowed'}`}
            >
              <Send size={18} className={`${input.trim() ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''} transition-transform`} />
            </button>
          </div>
          <div className="flex justify-between items-center mt-3 px-2">
             <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
               Applemar Premium Support • V3.2
             </p>
             <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest flex items-center gap-1">
               <span className="w-1 h-1 bg-green-500 rounded-full"></span>
               Encriptação Ativa
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
