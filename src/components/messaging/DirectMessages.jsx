// // DirectMessages.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { db } from "../firebase-config";
// import { addDoc, serverTimestamp } from "firebase/firestore";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   collection,
//   getDocs,
// } from "firebase/firestore";

// // eslint-disable-next-line no-unused-vars
// async function sendMessage(senderId, receiverId, messageText) {
//   const messageData = {
//     senderId,
//     receiverId,
//     messageText,
//     timestamp: serverTimestamp(),
//     isRead: false,
//   };

//   try {
//     await addDoc(collection(db, "messages"), messageData);
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// }

// const DirectMessages = () => {
//   const { currentUser } = useAuth();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [conversationId, setConversationId] = useState(null);
//   const [recipientId, setRecipientId] = useState(null);
//   const [users, setUsers] = useState([]);

//   // Fetch all authenticated users except the current user
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const db = getFirestore();
//       const usersSnapshot = await getDocs(collection(db, "users"));
//       const usersList = usersSnapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.id !== currentUser.uid); // Exclude current user
//       setUsers(usersList);
//     };
//     fetchUsers();
//   }, [currentUser]);

//   // Fetch or create a conversation when recipient changes
//   useEffect(() => {
//     if (!recipientId) return;

//     const fetchConversation = async () => {
//       const db = getFirestore();
//       const conversationPath = currentUser.uid + recipientId;
//       const conversationRef = doc(db, "messages", conversationPath);
//       const conversationDoc = await getDoc(conversationRef);

//       if (conversationDoc.exists()) {
//         setConversationId(conversationDoc.id);
//         setMessages(conversationDoc.data().messages || []);
//       } else {
//         setConversationId(conversationPath);
//         await setDoc(conversationRef, {
//           participants: [currentUser.uid, recipientId],
//           messages: [],
//         });
//       }
//     };

//     if (currentUser && recipientId) {
//       fetchConversation();
//     }
//   }, [currentUser, recipientId]);

//   // Handle message sending
//   const handleSendMessage = async () => {
//     if (!message || !conversationId) return;
//     const db = getFirestore();
//     const conversationRef = doc(db, "messages", conversationId);
//     const messageData = {
//       senderId: currentUser.uid,
//       message,
//       timestamp: new Date(),
//     };

//     await updateDoc(conversationRef, {
//       messages: arrayUnion(messageData),
//     });

//     setMessages((prev) => [...prev, messageData]);
//     setMessage("");
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="px-6 py-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           Select a user to message
//         </h2>

//         {/* User List */}
//         <div className="mb-4">
//           {users.map((user) => (
//             <button
//               key={user.id}
//               onClick={() => setRecipientId(user.id)}
//               className={`block w-full text-left p-2 rounded-lg ${
//                 recipientId === user.id ? "bg-blue-200" : "bg-gray-100"
//               } hover:bg-gray-200`}
//             >
//               {user.displayName || "User"} ({user.email})
//             </button>
//           ))}
//         </div>

//         {/* Message Conversation */}
//         {recipientId && (
//           <>
//             <h3 className="text-lg font-semibold text-gray-800">
//               Conversation with {recipientId}
//             </h3>
//             <div className="mt-4">
//               {messages.map((msg, index) => (
//                 <p
//                   key={index}
//                   className={`p-2 rounded-lg ${
//                     msg.senderId === currentUser.uid
//                       ? "bg-blue-100 text-right"
//                       : "bg-gray-100 text-left"
//                   }`}
//                 >
//                   {msg.senderId === currentUser.uid ? "You: " : "Recipient: "}{" "}
//                   {msg.message}
//                 </p>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//       <div className="px-6 py-4 bg-gray-100">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           disabled={!recipientId}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DirectMessages;
