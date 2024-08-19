import React from 'react';


const MessageList = ({ conversations, userRole, onSelectConversation }) => {

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to format the time
function formatTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
}

  console.log(conversations);
  return (
    <div className="w-1/4 bg-white border border-gray-900 rounded-lg">
      <h3 className="p-4 text-lg font-bold text-gray-900">Inbox ({conversations.length})</h3>
      <hr className="h-px bg-gray-900" />
      {conversations.map((conversation) => {
        const latestMessage = conversation.messages[conversation.messages.length - 1];
        return (
          <div
            key={conversation.partner.id}
            className="flex p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-900"
            onClick={() => onSelectConversation(conversation.partner.id)}
          >
            <img src="../../assets/avatar.png" alt="Company Logo" className="w-16 h-16 ml-1 rounded-full border border-gray-900" />
            <div className='flex flex-col w-full px-2 pt-2'>
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-semibold text-gray-900">
                  {userRole === 'employer' ? conversation.partner.name : userRole === 'student' ? conversation.partner.companyName : null}
                </h5>
                <span className="text-xs text-gray-500">{formatDate(latestMessage.created_at)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
              <p className="text-xs text-gray-500 mt-1">{latestMessage.messageDetails}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTime(latestMessage.created_at)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;