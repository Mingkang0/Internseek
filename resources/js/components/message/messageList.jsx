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
    <div className="w-full bg-white border border-gray-900 rounded-lg">
      <h3 className="p-4 text-lg font-bold text-gray-900">Inbox ({conversations.length})</h3>
      <hr className="h-px bg-gray-900" />
      {conversations.map((conversation) => {
        const latestMessage = conversation.messages[0];
        const hasUnreadMessages = conversation.messages.some((message) => message.messageStatus === 'unread' && message.sender_id === conversation.partner.id && message.sender_type !== userRole);
        return (
          <div
            key={conversation.partner.id}
            className={`flex p-2 cursor-pointer hover:bg-gray-50 border-b border-gray-900 ${hasUnreadMessages ? 'bg-gray-100' : ''}`}
            onClick={() => onSelectConversation(conversation.partner.id)}
          >
            {
              userRole === 'employer' && (
                <>
                  {conversation.partner.linkedin_id && conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' && conversation.partner.profilePicture.startsWith('http') ? (
                    <img
                      className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                      src={conversation.partner.profilePicture}
                      alt="LinkedIn Profile Pic"
                    />
                  ) : conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' ? (
                    <img
                      src={`/storage/profile/student/profile_pictures/${conversation.partner.profilePicture}`}
                      alt="Local Profile Pic"
                      className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                    />
                  ) : (
                    <img
                      src="../../assets/avatar.png"
                      alt="Default Avatar"
                      className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                    />
                  )}
                </>
              )}
            {
              userRole === 'student' && (
                <img src={`/storage/company/companyLogo/${conversation.partner.companyLogo}`} alt="Company Logo" className="w-12 h-12 rounded-full border ring-1 ring-gray-900" />
              )
            }
            <div className='flex flex-col w-full px-2 pt-2'>
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-semibold text-gray-900">
                  {userRole === 'employer' ? conversation.partner.firstName + ' ' + conversation.partner.lastName : userRole === 'student' ? conversation.partner.companyName : null}
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