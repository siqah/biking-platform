/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, storage, database } from '../firebase-config';
import { set, onDisconnect, ref as dbRef } from 'firebase/database';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
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

  // Assign a unique race number to the user and save their initial position
  const assignRaceNumber = async (userId) => {
    if (!userId) {
      console.error("User ID is undefined, cannot assign race number");
      return;
    }

    const userRef = dbRef(database, `race/users/${userId}`);
    const raceNumber = Date.now(); // A simple unique number assignment strategy

    try {
      await set(userRef, { raceNumber, position: { lat: null, lng: null } });
      onDisconnect(userRef).remove(); // Remove user data on disconnect
    } catch (error) {
      console.error("Error assigning race number:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user profile data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          let userData = {};

          if (userDoc.exists()) {
            userData = userDoc.data();
          } else {
            // Assign race number for new users
            await assignRaceNumber(user.uid);
          }

          const updatedUser = { ...user, ...userData };
          setCurrentUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    });

    return unsubscribe; // Clean up the listener on component unmount
  }, []);

  // Signup with profile picture upload
    const signup = async (name, email, password, profilePicture) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential?.user;
        if (!user) throw new Error("User is undefined");
    
        let profilePictureUrl = '';
        if (profilePicture) {
          const profilePicRef = ref(storage, `profilePictures/${user.uid}`);
          await uploadBytes(profilePicRef, profilePicture);
          profilePictureUrl = await getDownloadURL(profilePicRef);
        }
    
        await updateProfile(user, { displayName: name, photoURL: profilePictureUrl });
    
        const userProfile = {
          name,
          email,
          profilePictureUrl,
          routes: [],
          createdAt: new Date(),
        };
    
        await setDoc(doc(db, "users", user.uid), userProfile);
        const updatedUser = { ...user, ...userProfile };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
        // Assign race number for the new user
        await assignRaceNumber(user.uid);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.error("Email already in use. Please use a different email.");
          alert("The email address is already in use. Please use a different email.");
        } else {
          console.error("Signup error:", error);
        }
        throw error;
      }
    };
    

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential?.user;
      if (!user) throw new Error("User is undefined");

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedUser = { ...user, ...userData };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
      return user;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
