
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Chat {
  id: string;
  contactName: string;
  phoneNumber: string;
  lastMessage: string;
  lastUpdate: Date;
  unreadCount: number;
  messages: Message[];
}

export interface BotConfig {
  name: string;
  personality: string;
  welcomeMessage: string;
  autoReplyEnabled: boolean;
  businessContext: string;
}

export type View = 'dashboard' | 'live-chat' | 'bot-settings' | 'analytics' | 'connection';
