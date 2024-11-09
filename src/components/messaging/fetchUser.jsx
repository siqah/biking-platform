import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default fetchUsers;