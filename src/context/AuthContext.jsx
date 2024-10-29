/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        // Save the user data to local storage when authenticated
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        // Remove user data from local storage when signed out
        localStorage.removeItem("currentUser");
      }
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = (name, email, password) => createUserWithEmailAndPassword(auth,name, email, password);
  
  const logout = () => {
    localStorage.removeItem("currentUser"); // Clear local storage on logout
    return signOut(auth);
  };

  const value = { currentUser, login, signup, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
