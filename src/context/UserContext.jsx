/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const userSnapshots = await getDocs(usersCollection);
      
      const usersList = userSnapshots.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
      }));
      
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      {children}
    </UserContext.Provider>
  );
};
