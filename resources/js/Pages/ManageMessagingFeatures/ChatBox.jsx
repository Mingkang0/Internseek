import DefaultLayout from '@/layout/defaultLayout';
import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Head, Link, router, usePage } from '@inertiajs/react';

const Chatbox = ({ messages, sender, receiver, receiverType }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(sender.profilePicture);
  const { auth } = usePage().props;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust format as needed
  };

  console.log(messages, sender, receiver, receiverType);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGoBack = () => {
    window.history.back();
  }

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('message', messageText);
    // Append the sender and receiver information
    formData.append('sender_id', sender.id);
    formData.append('sender_type', sender.type);
    formData.append('receiver_id', receiver.id);
    formData.append('receiver_type', receiverType);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    if (auth.role === 'student') {
      router.post('/student/messages/send', formData, {
        onSuccess: () => {
          setMessageText('');
          setSelectedImage(null);
          setSelectedFile(null);

          // Assuming the server returns the updated list of messages:
          const updatedMessages = page.props.messages;
          setMessages(updatedMessages);
        },
      });
    } else {
      router.post('/employer/messages/send', formData, {
        onSuccess: () => {
          setMessageText('');
          setSelectedImage(null);
          setSelectedFile(null);

          // Assuming the server returns the updated list of messages:
          const updatedMessages = page.props.messages;
          setMessages(updatedMessages);
        },
      });
    }
  };

  return (
    <DefaultLayout>
      <Head title="Chatbox" />
      <div className='bg-gray-200 px-6 py-10 min-h-screen lg:py-6'>
        <div className="mx-auto p-4 bg-white border border-gray-900 rounded-lg lg:w-3/4">
          {/* Header */}
          <div className="flex items-center mb-4 justify-between">
            <div className='flex gap-2 items-center'>
              {auth.role === 'student' && receiverType !== auth.role ? (
                <img
                  src={`/storage/company/companyLogo/${receiver.companyLogo}`}
                  alt="CompanyLogo"
                  className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                />
              ) : auth.role === 'employer' && receiverType !== auth.role ? (
                <>
                  {receiver.profilePicture && typeof receiver.profilePicture === 'string' ? (
                    <img
                      src={`/storage/profile/student/profile_pictures/${receiver.profilePicture}`}
                      alt="Local Profile Pic"
                      className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                    />
                  ) : receiver.linkedin_id && receiver.profilePicture && typeof receiver.profilePicture === 'string' && receiver.profilePicture.startsWith('http') ? (
                    <img
                      className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                      src={receiver.profilePicture}
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
              )
                : null}
              <h5 className="text-base font-bold text-gray-900">{receiver && receiverType === 'employer' ? receiver.companyName : receiver.firstName + ' ' + receiver.lastName}</h5>
            </div>
            <Link><FaTimesCircle className="text-black-900 cursor-pointer" onClick={handleGoBack} /></Link>
          </div>
          <hr className="my-2 border border-gray-900" />

          {/* Messages */}
          <div className="overflow-y-auto h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === sender.id && message.sender_type !== receiverType ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {message.receiver_id == sender.id && message.sender_type == receiverType && message.sender_type == 'employer' && (
                  <img
                    src={`/storage/company/companyLogo/${receiver.companyLogo}`}
                    alt="CompanyLogo"
                    className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                  />
                )}
                {
                  message.receiver_id == sender.id && message.sender_type == receiverType && message.sender_type == 'student' && (
                    <>
                      {receiver.profilePicture && typeof receiver.profilePicture === 'string' ? (
                        <img
                          src={`/storage/profile/student/profile_pictures/${receiver.profilePicture}`}
                          alt="Local Profile Pic"
                          className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                        />
                      ) : receiver.linkedin_id && receiver.profilePicture && typeof receiver.profilePicture === 'string' && receiver.profilePicture.startsWith('http') ? (
                        <img
                          className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                          src={receiver.profilePicture}
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
                  )
                }
                <div
                  className={`p-3 ml-2 border ${message.sender_id === sender.id ? 'border-gray-200 bg-gray-100 rounded-tl-xl' : 'border-gray-300 bg-white rounded-tr-xl'} rounded-xl`}
                >
                  <div className="flex flex-wrap gap-4 items-center mb-2">
                    <h5 className="text-sm font-semibold text-gray-900">
                      {
                        message.sender_id == sender.id && message.sender_type !== receiverType ? 'You' : message.sender_type == 'employer' ? receiver.companyName : receiver.firstName + ' ' + receiver.lastName
                      }
                    </h5>
                    <span className="text-sm text-gray-600">{formatDate(message.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700">{message.messageDetails}</p>
                  {message.messageImage && (
                    <img src={`/storage/messages/images/${message.messageImage}`} alt="Message Image" className="mt-2 w-fit-screen lg:w-64" />
                  )}
                  {message.messageDocument && (
                    <a href={`/storage/messages/files/${message.messageDocument}`} className="block mt-2 text-blue-500" download>
                      Download File
                    </a>
                  )}
                  <div className="flex justify-end mt-2">
                    {message.contact_person && (
                      <p className="text-sm text-gray-600">Sent By: {message.contact_person.firstName} {message.contact_person.lastName}</p>
                    )}
                  </div>
                </div>
                {message.sender_id == sender.id && message.sender_type == 'employer' && receiverType !== message.sender_type && (
                  <img
                    src={`/storage/company/companyLogo/${sender.companyLogo}`}
                    alt="CompanyLogo"
                    className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                  />
                )}
                {message.sender_id == sender.id && message.sender_type == 'student' && receiverType !== message.sender_type && (
                  <>
                    {sender.linkedin_id && sender.profilePicture && typeof sender.profilePicture === 'string' && sender.profilePicture.startsWith('http') ? (
                      <img
                        className="w-12 h-12 mx-2 rounded-full border border-gray-900"
                        src={sender.profilePicture}
                        alt="LinkedIn Profile Pic"
                      />
                    ) : sender.profilePicture && typeof sender.profilePicture === 'string' ? (
                      <img
                        src={`/storage/profile/student/profile_pictures/${sender.profilePicture}`}
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


              </div>
            ))}

          </div>

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
          <form className="p-0 border-t border-gray-900 mt-2" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="px-4 py-2 bg-white rounded-t-lg">
              <label htmlFor="comment" className="sr-only">Enter your message</label>
              <textarea
                id="comment"
                rows={4}
                className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                placeholder="Write a comment..."
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
      </div>
    </DefaultLayout>
  );
};

export default Chatbox;

