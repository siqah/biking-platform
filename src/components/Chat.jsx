/* eslint-disable react/prop-types */
import  { useState } from 'react';
import sendMessage  from '../firebaseServices/sendMessage';

function Chat({ user1Id, user2Id }) {
  const [messageText, setMessageText] = useState('');
  const [isUser1Turn, setIsUser1Turn] = useState(true);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      const senderId = isUser1Turn ? user1Id : user2Id;
      const recipientId = isUser1Turn ? user2Id : user1Id;

      try {
        await sendMessage(senderId, recipientId, messageText);
        setMessageText(''); // Clear the input after sending
        setIsUser1Turn(!isUser1Turn); // Toggle the sender/recipient turn
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div className="chat">
      <h3>{isUser1Turn ? "User 1" : "User 2"}&rsquo;s turn to send a message</h3>
      <input
        type="text"
        placeholder="Type your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Send Message
      </button>
    </div>
  );
}

export default Chat;
