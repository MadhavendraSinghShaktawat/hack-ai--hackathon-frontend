export interface Message {
  id?: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  status: string;
  data: {
    response: string;
    history: ChatMessage[];
  };
}

export interface CreateChatRequest {
  text: string;
  context: ChatMessage[];
} 