'use client';
import React, { useState } from 'react';
import MessageList from './messageList';
import Message from './message';
import DefaultLayout from '@/layout/defaultLayout';

const MessagePage = ({ conversations, userRole, userID }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (partnerId) => {
    const conversation = conversations.find((conversation) => conversation.partner.id === partnerId);
    setSelectedConversation(conversation);
  }
  

  if (userRole === 'admin') {
    // Admins cannot use this feature, display a message or redirect them to a different page
    return <div>Admins cannot use this feature.</div>;
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen px-8 py-6 bg-gray-200">
        <div className="flex h-screen">
          <MessageList conversations={conversations} userRole={userRole} onSelectConversation={handleSelectConversation} />
          <div className="w-3/4 px-4 py-2 ml-4 h-full">
            {selectedConversation ? (
              <Message
                conversation={selectedConversation}
                userRole={userRole}
                userID={userID}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a conversation to view</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MessagePage;