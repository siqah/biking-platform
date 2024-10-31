/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase-config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext();

// Custom hook to access authentication context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user profile from Firestore if authenticated
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({ ...user, ...userData });
          localStorage.setItem("currentUser", JSON.stringify({ ...user, ...userData }));
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    });
  
    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);
  

  // Function to handle signup with name and profile picture
  const signup = async (name, email, password, profilePicture) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload profile picture if provided
    let profilePictureUrl = '';
    if (profilePicture) {
      const profilePicRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(profilePicRef, profilePicture);
      profilePictureUrl = await getDownloadURL(profilePicRef);
    }

    // Set profile display name in Firebase Auth
    await updateProfile(user, { displayName: name, photoURL: profilePictureUrl });

    // Store user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      profilePictureUrl,
      routes: [],
      createdAt: new Date(),
    });

    setCurrentUser({ ...user, displayName: name, photoURL: profilePictureUrl });
    localStorage.setItem("currentUser", JSON.stringify({ ...user, displayName: name, photoURL: profilePictureUrl }));
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => {
    localStorage.removeItem("currentUser");
    return signOut(auth);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
