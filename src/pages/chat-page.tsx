import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatBox } from '../components/chat/chat-box';
import { ChatHeader } from '../components/chat/chat-header';
import { ChatInput } from '../components/chat/chat-input';
import { LoadingSpinner } from '../components/loading-spinner';
import { chatService } from '../services/chat-service';
import { appConfig } from '../config/app-config';
import { Message } from '../types/chat';

// TODO: Replace with actual user authentication
const TEMP_USER_ID = 'user123';

export const ChatPage: React.FC = () => {
  const [isConnecting, setIsConnecting] = React.useState(true);
  const queryClient = useQueryClient();
  const [messages, setMessages] = React.useState<Message[]>([]);

  // Initialize API connection
  React.useEffect(() => {
    const initializeConnection = async () => {
      try {
        await appConfig.getApiBaseUrl();
        setIsConnecting(false);
      } catch (error) {
        console.error('Failed to connect to API:', error);
        // You might want to show an error message here
      }
    };

    initializeConnection();
  }, []);

  // Fetch chat history
  const { data: chatHistory, isLoading } = useQuery({
    queryKey: ['chatHistory', TEMP_USER_ID],
    queryFn: () => chatService.getChatHistory(TEMP_USER_ID),
    select: (data) => data.messages || [],
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      // Create and add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content,
        sender: 'user',
        timestamp: new Date(),
      };

      // Add user message to state
      setMessages(prev => [...prev, userMessage]);

      // Send to API and get bot's response
      const botMessage = await chatService.sendMessage(TEMP_USER_ID, content);
      return botMessage;
    },
    onSuccess: (botMessage) => {
      // Add bot message to state
      setMessages(prev => [...prev, botMessage]);
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
    },
  });

  // Clear history mutation
  const clearHistoryMutation = useMutation({
    mutationFn: () => chatService.clearChatHistory(TEMP_USER_ID),
    onSuccess: () => {
      queryClient.setQueryData(['chatHistory', TEMP_USER_ID], []);
    },
  });

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessageMutation.mutateAsync(content);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistoryMutation.mutateAsync();
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  if (isConnecting) {
    return <LoadingSpinner message="Connecting to server..." />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader onClearHistory={handleClearHistory} />
      <div className="flex-1 container mx-auto px-4 md:px-6 py-4 overflow-hidden">
        <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm">
          <ChatBox messages={messages} />
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={sendMessageMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 