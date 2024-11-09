import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { getFirestore, doc, setDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const CreateGroup = () => {
    const { currentUser } = useAuth();
    const [groupName, setGroupName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState("");

    const handleAddParticipant = () => {
        if (newParticipant && !participants.includes(newParticipant)) {
            setParticipants((prev) => [...prev, newParticipant]);
            setNewParticipant("");
        }
    };

    const createGroup = async () => {
        const db = getFirestore();
        const groupRef = doc(db, "groups", groupName);
        await setDoc(groupRef, {
            adminId: currentUser.uid,
            participants: [currentUser.uid, ...participants],
            routes: [],
        });

        alert("Group Created!");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a Group</h2>
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="mb-4">
                <input
                    type="text"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    placeholder="Add participant"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleAddParticipant}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Participant
                </button>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Participants:</h3>
                <ul className="list-disc pl-5">
                    {participants.map((participant, index) => (
                        <li key={index} className="mb-1">{participant}</li>
                    ))}
                </ul>
            </div>
            <button
                onClick={createGroup}
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Create Group
            </button>
        </div>
    );
};

export default CreateGroup;
