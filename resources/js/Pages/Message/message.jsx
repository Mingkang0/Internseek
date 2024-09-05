import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

const Message = ({ conversation, userRole, userID }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState(conversation.messages);

  console.log(conversation);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust format as needed
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('message', messageText);
    // Append the sender and receiver information
    formData.append('sender_id', userID);
    formData.append('sender_type', userRole);
    formData.append('receiver_id', conversation.partner.id);
    if (userRole === 'student') {
      formData.append('receiver_type', 'employer');
    } else {
      formData.append('receiver_type', 'student');
    }
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    router.post('/messages/send', formData, {
      onSuccess: (response) => {
        console.log(response);
        setMessageText('');
        setSelectedImage(null);
        setSelectedFile(null);
        // Update the messages state
        setMessages(response.props.conversations[0].messages); // Assuming conversations is an array with one conversation
      },
    });
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setMessages(conversation.messages); // Ensure conversation.messages is up-to-date
  }, [conversation.messages]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the latest message when the component mounts or messages change
  }, [messages]);


  return (
    <div className="w-3/4 mx-auto p-4 bg-white border border-gray-900 rounded-lg">
      {/* Header */}
      <div className="flex items-center mb-2 justify-between">
        <div className='flex gap-2 items-center'>
          <img src="../../assets/avatar.png" alt="Avatar" className="w-12 h-12 rounded-full border border-gray-900" />
          <h5 className="text-base font-bold text-gray-900">{userRole === 'student' ? conversation.partner.companyName : conversation.partner.firstName + ' ' + conversation.partner.lastName}</h5>
        </div>
      </div>
      <hr className="my-2 border border-gray-900" />

      {/* Messages */}
      <div className="overflow-y-auto h-72 flex flex-col-reverse" ref={messagesContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender_id === userID && message.sender_type === userRole ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className='flex'>
              {message.receiver_id === conversation.partner.id && message.sender_type !== userRole && (
                <img src="../../assets/avatar.png" alt="Avatar" className='w-12 h-12 mx-2 rounded-full border border-gray-900' />
              )}
              <div className={`p-4 border ${message.sender_id === userID ? 'border-gray-200 bg-gray-100 rounded-tl-xl' : 'border-gray-300 bg-white rounded-tr-xl'} rounded-xl`}>
                <div className="flex gap-4 items-center mb-2 overflow-y-auto">
                  <h5 className="text-sm font-semibold text-gray-900">
                    {message.sender_id === userID ? 'You' : message.sender_type === 'student' ? conversation.partner.firstName + ' ' + conversation.partner.lastName : conversation.partner.companyName}
                  </h5>
                  <span className="text-sm text-gray-600">{formatDate(message.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700">{message.messageDetails}</p>
                {message.messageImage && <img src={`/storage/messages/images/${message.messageImage}`} alt="Message Image" className="mt-2 max-w-xs" />}
                {message.messageDocument && <a href={`/storage/messages/files/${message.messageDocument}`} className="block mt-2 text-blue-500" download>Download File</a>}
              </div>
            </div>
            {message.sender_id === userID && message.sender_type === userRole && <img src="../../assets/avatar.png" alt="Avatar" className='w-12 h-12 mx-2 rounded-full border border-gray-900' />}
          </div>
        ))}
      </div>


      {/* Message Input Form */}
      <form form className="p-0 border-t border-gray-900 mt-4" onSubmit={handleSubmit} encType="multipart/form-data" >
        <div className="px-2 py-2 bg-white rounded-t-lg">
          <label htmlFor="comment" className="sr-only">Enter your message</label>
          <textarea
            id="comment"
            rows={3}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
            placeholder="Write a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-900">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Send Message
          </button>
          <div className="flex space-x-1">
            <button
              type="button" onClick={() => document.getElementById('file-upload').click()}
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
              </svg>
              <span className="sr-only">Attach file</span>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </button>
            <button
              type="button" onClick={() => document.getElementById('image-upload').click()}
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <span className="sr-only">Upload image</span>
              <input id="image-upload" type="file" className="hidden" onChange={handleImageChange} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Message;

