/* eslint-disable react/prop-types */
// MessageList.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import 'tailwindcss/tailwind.css';

export function MessageList({ recipientId }) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentUser || !recipientId) return;
  
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, "messages"),
          where("senderId", "in", [currentUser.uid, recipientId]),
          where("receiverId", "in", [currentUser.uid, recipientId])
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setMessages(messages);
        });
  
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages();
  }, [currentUser, recipientId]);
  

  return (
    <div className="message-list p-4 bg-gray-100 rounded-lg shadow-md">
      {messages.map((message) => (
        <div key={message.id} className={`message p-2 my-2 rounded-lg ${message.senderId === currentUser.uid ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}>
          <p className="mb-1">{message.messageText}</p>
          <span className="text-xs text-gray-600">{message.timestamp?.toDate().toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
}
