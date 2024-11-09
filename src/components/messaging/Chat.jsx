// import { useState } from "react";
// import DirectMessages from "./DirectMessages";
// import CreateGroup from "./CreateGroup";
// import AddRoute from "./AddRoute";
// import UserList from "./UserList";

// const Chat = () => {
//   const [currentView, setCurrentView] = useState("messages");
//   // eslint-disable-next-line no-unused-vars
//   const [recipientId, setRecipientId] = useState(null);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-4">CHAT</h1>
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-5 space-y-2 sm:space-y-0 sm:space-x-2">
//         <button
//           onClick={() => setCurrentView("messages")}
//           className={`px-4 py-2 rounded ${
//             currentView === "messages"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Direct Messages
//         </button>
//         <button
//           onClick={() => setCurrentView("createGroup")}
//           className={`px-4 py-2 rounded ${
//             currentView === "createGroup"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Create Group
//         </button>
//         <button
//           onClick={() => setCurrentView("addRoute")}
//           className={`px-4 py-2 rounded ${
//             currentView === "addRoute"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Add Route
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded shadow-md">
//         <UserList onSelectRecipient={setRecipientId} />

//         {currentView === "messages" && <DirectMessages recipientId="userId" />}
//         {currentView === "createGroup" && <CreateGroup />}
//         {currentView === "addRoute" && <AddRoute groupId="groupId1" />}
//       </div>
//     </div>
//   );
// };

// export default Chat;
