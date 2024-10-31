// path-to-your-sendMessage-function.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const sendMessage = async (senderId, recipientId, messageText) => {
    await addDoc(collection(db, "messages"), {
        senderId,
        recipientId,
        messageText,
        timestamp: new Date(),
    });
};

export default sendMessage;
