import axios from 'axios';
import { Message } from '../types/chat';

const API_URL = 'http://localhost:3000/api';

interface ChatHistoryItem {
  userId: string;
  message: string;
  response: string;
  timestamp: string;
}

export const chatService = {
  async sendMessage(userId: string, message: string): Promise<Message> {
    try {
      console.log('Sending message:', { userId, message });
      const response = await axios.post<ChatHistoryItem>(`${API_URL}/chat`, {
        userId,
        message,
      });
      console.log('API Response:', response.data);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response.data.response,
        sender: 'bot',
        timestamp: new Date(response.data.timestamp),
      };

      return botMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  },

  async getChatHistory(userId: string): Promise<{ messages: Message[] }> {
    try {
      const response = await axios.get<ChatHistoryItem[]>(`${API_URL}/chat/history/${userId}`);
      console.log('Raw history response:', response.data);

      // Convert history items into messages (newest first)
      const messages: Message[] = [];
      response.data.reverse().forEach((item) => {
        // Add user message
        messages.push({
          id: `user-${item.timestamp}`,
          content: item.message,
          sender: 'user',
          timestamp: new Date(item.timestamp),
        });

        // Add bot response
        messages.push({
          id: `bot-${item.timestamp}`,
          content: item.response,
          sender: 'bot',
          timestamp: new Date(item.timestamp),
        });
      });

      console.log('Processed messages:', messages);
      return { messages };
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw new Error('Failed to fetch chat history');
    }
  },

  async clearChatHistory(userId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/chat/history`, {
        data: { userId },
      });
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw new Error('Failed to clear chat history');
    }
  },
}; 