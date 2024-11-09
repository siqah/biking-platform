// /* eslint-disable react/prop-types */

// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// const UserList = ({ onSelectRecipient }) => {
//     const { currentUser } = useAuth();
//     const [users, setUsers] = useState([]);

//     // Fetch all users from Firestore except the current user
//     useEffect(() => {
//         const fetchUsers = async () => {
//             const db = getFirestore();
//             const usersSnapshot = await getDocs(collection(db, "users"));
//             const usersList = usersSnapshot.docs
//                 .map((doc) => ({ id: doc.id, ...doc.data() }))
//                 .filter((user) => user.id !== currentUser.uid); // Exclude current user
//             setUsers(usersList);
//         };
//         fetchUsers();
//     }, [currentUser]);

//     return (
//         <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
//             <h2 className="text-xl font-semibold text-gray-800">Users</h2>
//             <div className="mt-4">
//                 {users.map((user) => (
//                     <button
//                         key={user.id}
//                         onClick={() => onSelectRecipient(user.id)}
//                         className="block w-full text-left p-2 my-1 rounded-lg bg-gray-100 hover:bg-gray-200"
//                     >
//                         {user.displayName || "User"})
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

import { useEffect, useState } from "react";
import fetchUsers from "./fetchUser"; // Adjust import path

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);
        };
        loadUsers();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800">Users List</h2>
            <ul className="mt-4 space-y-2">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 "
                    >
                    <img src={user.photoURL} alt="User Avatar" className="w-12 h-12 mx-auto rounded-full  ml-0" />
                    <span className="font-medium mr-">{user.displayName || "No Name"}</span> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
