
import React from 'react';
import { Message } from '@/components/ChatInterface';
import ChatInterface from '@/components/ChatInterface';
import FadeIn from '@/components/FadeIn';

interface RequestMessageCenterProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  recipientName: string;
  recipientAvatar?: string;
}

const RequestMessageCenter: React.FC<RequestMessageCenterProps> = ({ 
  messages, 
  onSendMessage,
  recipientName,
  recipientAvatar
}) => {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
      <FadeIn>
        <ChatInterface
          messages={messages}
          onSendMessage={onSendMessage}
          recipientName={recipientName}
          recipientAvatar={recipientAvatar}
        />
      </FadeIn>
    </div>
  );
};

export default RequestMessageCenter;
