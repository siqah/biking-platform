/* eslint-disable react/prop-types */
// Chat.jsx
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import  UserList  from "./UserList";

export default function Chat({ recipientId }) {
  return (
    <>
      <UserList />

      <div className="chat flex flex-col h-full bg-gray-100 p-4 rounded-lg shadow-lg">
        <div className="flex-1 overflow-y-auto mb-4">
          <MessageList recipientId={recipientId} />
        </div>
        <div className="mt-auto">
          <MessageInput recipientId={recipientId} />
        </div>
      </div>
    </>
  );
}
