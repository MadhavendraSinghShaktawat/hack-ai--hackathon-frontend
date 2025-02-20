import axios from 'axios';
import { Message } from '../types/chat';

const API_URL = 'http://localhost:3000/api';

interface ApiResponse {
  userId: string;
  message: string;
  response: string;
  timestamp: string;
}

export const chatService = {
  async sendMessage(userId: string, message: string): Promise<Message> {
    try {
      console.log('Sending message:', { userId, message }); // Debug log
      const response = await axios.post<ApiResponse>(`${API_URL}/chat`, {
        userId,
        message,
      });
      console.log('API Response:', response.data); // Debug log

      // Create bot message from response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response.data.response, // Use response field from API
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
      const response = await axios.get(`${API_URL}/chat/history/${userId}`);
      return response.data;
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