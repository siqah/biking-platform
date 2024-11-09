/* eslint-disable react/prop-types */
// MessageInput.jsx
import { useState } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export function MessageInput({ recipientId }) {
  const { currentUser } = useAuth();
  const [messageText, setMessageText] = useState("");

  const sendMessage = async () => {
    if (messageText.trim() === "") return;

    const messageData = {
      senderId: currentUser.uid,
      receiverId: recipientId,
      messageText,
      timestamp: serverTimestamp(),
      isRead: false,
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
}
