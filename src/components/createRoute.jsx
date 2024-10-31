// import { db } from '../firebase';
// import { collection, addDoc, updateDoc, arrayUnion, doc } from 'firebase/firestore';

// export const createRoute = async (userId, routeData) => {
//   const userDoc = doc(db, "users", userId);
//   const routeRef = await addDoc(collection(db, "routes"), {
//     ...routeData,
//     creator: userId,
//     createdAt: new Date(),
//   });

//   // Add the route ID to the user's profile
//   await updateDoc(userDoc, {
//     routes: arrayUnion(routeRef.id),
//   });

//   return routeRef.id;
// };
