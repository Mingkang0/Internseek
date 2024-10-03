import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

const Message = ({ conversation, userRole, userID }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState(conversation.messages);

  const [errors, setErrors] = useState({});

  console.log(conversation);

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

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
        setErrors({});
      },
      onError: (errors) => {
        console.error(errors);
        setErrors(errors);
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
    <div className="w-full lg:ml-4 p-4 bg-white border border-gray-900 rounded-lg">
      {/* Header */}
      <div className="flex items-center mb-2 justify-between">
        <div className='flex gap-2 items-center'>
          {
            userRole === 'student' ? (
              <img
                src={`/storage/company/companyLogo/${conversation.partner.companyLogo}`}
                alt="CompanyLogo"
                className="rounded-full w-16 h-16 mx-auto border ring-1 ring-gray-900"
              />
            ) : (
              <>
                {conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' ? (
                  <img
                    src={`/storage/profile/student/profile_pictures/${conversation.partner.profilePicture}`}
                    alt="Local Profile Pic"
                    className="w-16 h-16 mx-auto rounded-full border border-gray-900"
                  />
                ) : conversation.partner.linkedin_id && conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' && conversation.partner.profilePicture.startsWith('http') ? (
                  <img
                    className="w-16 h-16 mx-auto rounded-full border border-gray-900"
                    src={conversation.partner.profilePicture}
                    alt="LinkedIn Profile Pic"
                  />
                ) : (
                  <img
                    src="../../assets/avatar.png"
                    alt="Default Avatar"
                    className="w-16 h-16 mx-auto rounded-full border border-gray-900"
                  />
                )}
              </>
            )
          }
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
              {message.receiver_id === conversation.partner.id && message.sender_type !== userRole && userRole === 'student' && (
                <img
                  src={`/storage/company/companyLogo/${conversation.partner.companyLogo}`}
                  alt="Company Logo"
                  className="w-12 h-12 rounded-full border ring-1 ring-gray-900 ml-2"
                />
              )}
              {
                message.receiver_id === conversation.partner.id && message.sender_type !== userRole && userRole === 'employer' && (
                  <>
                    {conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' ? (
                      <img
                        src={`/storage/profile/student/profile_pictures/${conversation.partner.profilePicture}`}
                        alt="Local Profile Pic"
                        className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                      />
                    ) : conversation.partner.linkedin_id && conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' && conversation.partner.profilePicture.startsWith('http') ? (
                      <img
                        className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                        src={conversation.partner.profilePicture}
                        alt="LinkedIn Profile Pic"
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
              <div className={`p-4 border ${message.sender_id === userID ? 'border-gray-200 bg-gray-100 rounded-tl-xl' : 'border-gray-300 bg-white rounded-tr-xl'} rounded-xl`}>
                <div className="flex flex-wrap gap-2 items-center mb-2 overflow-y-auto">
                  <h5 className="text-sm font-semibold text-gray-900">
                    {message.sender_id === userID && message.sender_type === userRole ? 'You' : message.receiver_type === 'student' ? conversation.partner.companyName : conversation.partner.firstName + ' ' + conversation.partner.lastName}
                  </h5>
                  <span className="text-sm text-gray-600">{formatDate(message.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700">{message.messageDetails}</p>
                {message.messageImage && <img src={`/storage/messages/images/${message.messageImage}`} alt="Message Image" className="mt-2 w-64" />}
                {message.messageDocument && <a href={`/storage/messages/files/${message.messageDocument}`} className="block mt-2 text-blue-500" download>Download File</a>}
                <div className="flex justify-end mt-2">
                  {message.contact_person && (
                    <p className="text-sm text-gray-600">Sent By: {message.contact_person.firstName} {message.contact_person.lastName}</p>
                  )}

                </div>
                {message.sender_id === userID && message.sender_type === userRole && (
                  <div className='flex justify-end mt-1'>
                    <p className='text-sm text-gray-600'>{message.messageStatus}</p>
                  </div>
                )}
              </div>
            </div>
            {message.sender_id === userID && message.receiver_type !== userRole && message.sender_type === 'student' && (
              <>
                {conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' ? (
                  <img
                    src={`/storage/profile/student/profile_pictures/${conversation.partner.profilePicture}`}
                    alt="Local Profile Pic"
                    className="w-12 h-12 mx-2 rounded-full border border-gray-900 ml-2"
                  />
                ) : conversation.partner.linkedin_id && conversation.partner.profilePicture && typeof conversation.partner.profilePicture === 'string' && conversation.partner.profilePicture.startsWith('http') ? (
                  <img
                    className="w-12 h-12 mx-2 rounded-full border border-gray-900 ml-2"
                    src={conversation.partner.profilePicture}
                    alt="LinkedIn Profile Pic"
                  />
                ) : (
                  <img
                    src="../../assets/avatar.png"
                    alt="Default Avatar"
                    className="w-12 h-12 mx-2 rounded-full border border-gray-900 ml-2"
                  />
                )}
              </>
            )}
            {
              message.sender_id === userID && message.receiver_type !== userRole && message.sender_type === 'employer' && (
                <img src={`/storage/company/companyLogo/${conversation.partner.companyLogo}`} alt="Company Logo" className="w-12 h-12 rounded-full border ring-1 ring-gray-900 ml-2" />
              )
            }
          </div>
        ))}
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <ul className="list-disc pl-5 mt-2">
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Message Input Form */}
      <div className='content-end ml-2'>
        {selectedImage && (
          <div className='flex gap-4'>
            <p className="text-sm text-gray-600">Selected Image: {selectedImage.name}</p>
            <a href="#" className="text-sm text-blue-500" onClick={handleRemoveImage}>Remove Image</a>
          </div>
        )}
        {selectedFile && (
          <div className='flex mt-2 gap-4'>
            <p className="text-sm text-gray-600">Selected File: {selectedFile.name}</p>

            <a href="#" className="text-sm text-blue-500" onClick={handleRemoveFile}>Remove File</a>
          </div>
        )}

      </div>
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

