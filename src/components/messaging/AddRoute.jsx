/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

const AddRoute = ({ groupId }) => {
    const [routeName, setRouteName] = useState("");
    const [startingPoint, setStartingPoint] = useState("");

    const generateMapLink = (startingPoint) => {
        return `https://maps.google.com/?q=${encodeURIComponent(startingPoint)}`;
    };

    const handleAddRoute = async () => {
        const db = getFirestore();
        const routeData = {
            routeName,
            startingPoint,
            mapLink: generateMapLink(startingPoint),
        };

        const groupRef = doc(db, "groups", groupId);
        await updateDoc(groupRef, {
            routes: arrayUnion(routeData),
        });

        setRouteName("");
        setStartingPoint("");
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Add Route</h2>
            <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="Route Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="text"
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
                placeholder="Starting Point"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
                onClick={handleAddRoute}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Add Route
            </button>
        </div>
    );
};

export default AddRoute;
