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
  const [isTyping, setIsTyping] = React.useState(false);

  // Fetch chat history
  const { data: chatHistory, isLoading } = useQuery({
    queryKey: ['chatHistory', TEMP_USER_ID],
    queryFn: () => chatService.getChatHistory(TEMP_USER_ID),
    select: (data) => {
      console.log('Processing chat history:', data);
      return data.messages;
    },
    // Disable automatic refetching
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: Infinity,
  });

  // Update messages when chat history changes
  React.useEffect(() => {
    console.log('Chat history updated:', chatHistory);
    if (chatHistory && Array.isArray(chatHistory)) {
      console.log('Setting messages from history:', chatHistory);
      setMessages(chatHistory);
    }
  }, [chatHistory]);

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
      
      // Show typing indicator
      setIsTyping(true);

      try {
        // Send to API and get bot's response
        const botMessage = await chatService.sendMessage(TEMP_USER_ID, content);
        return botMessage;
      } finally {
        // Hide typing indicator
        setIsTyping(false);
      }
    },
    onSuccess: (botMessage) => {
      // Add bot message to state
      setMessages(prev => [...prev, botMessage]);
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
      setIsTyping(false);
    },
  });

  // Clear history mutation
  const clearHistoryMutation = useMutation({
    mutationFn: () => chatService.clearChatHistory(TEMP_USER_ID),
    onSuccess: () => {
      // Clear messages state when history is cleared
      setMessages([]);
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
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex-1 container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col h-[calc(100vh-6.5rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-sm">
          <ChatHeader onClearHistory={handleClearHistory} />
          <ChatBox 
            messages={messages} 
            isTyping={isTyping}
          />
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