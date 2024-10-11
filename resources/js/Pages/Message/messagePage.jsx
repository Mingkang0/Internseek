'use client';
import React, { useState, useEffect } from 'react';
import MessageList from './messageList';
import Message from './message';
import DefaultLayout from '@/layout/defaultLayout';
import { Head, router } from '@inertiajs/react';
import { FaBackward } from 'react-icons/fa6';

const MessagePage = ({ conversations, userRole, userID }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isCoversationSelected, setIsConversationSelected] = useState(false);


  const handleSelectConversation = (partnerId) => {
    const conversation = conversations.find((conversation) => conversation.partner.id === partnerId);
    // Mark the conversation as read
    conversation.messages.forEach((message) => {
      if (message.receiver_id == userID && message.receiver_type == userRole && message.messageStatus === 'unread') {
        if (userRole === 'student') {
          router.post(`/student/messages/markAsRead/${message.id}`);
        } else if (userRole === 'employer') {
          router.post(`/employer/messages/markAsRead/${message.id}`);
        }
      }
    });
    setSelectedConversation(conversation);
    setIsConversationSelected(true);

  };




  if (userRole === 'admin') {
    // Admins cannot use this feature, display a message or redirect them to a different page
    return <div>Admins cannot use this feature.</div>;
  }

  return (
    <DefaultLayout>
      <Head title="Messages Page" />
      <div className="min-h-screen px-3 lg:px-6 py-4 bg-gray-200">
        {isCoversationSelected && (
          <div className="block lg:hidden mb-4">
            <button
              className="flex gap-2 items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setIsConversationSelected(false)}
            >
              <FaBackward className='mt-1' /> Back to Conversations
            </button>
          </div>
        )}
        <div className="flex h-screen">
          {isCoversationSelected ? (
            <>
              <div className='lg:w-1/4 lg:h-screen md:block hidden'>
                <MessageList conversations={conversations} userRole={userRole} onSelectConversation={handleSelectConversation} />
              </div>

              <div className="lg:block lg:w-3/4 lg:px-4 py-2 ml-4 h-full">
                <Message
                  conversation={selectedConversation}
                  userRole={userRole}
                  userID={userID}
                />
              </div>
            </>
          ) : (
            <div className="flex w-full">
              <div className='lg:w-1/4'>
                <MessageList conversations={conversations} userRole={userRole} onSelectConversation={handleSelectConversation} />
              </div>
              {selectedConversation ? null : (
                <div className="hidden lg:block lg:w-3/4 px-4 py-2 ml-4 h-full">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Select a conversation to view</p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </DefaultLayout>
  );
};

export default MessagePage;