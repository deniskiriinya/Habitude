// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const role = userDoc.exists() ? userDoc.data().role : 'user';

        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role,
        };

        setUser(userData);
        localStorage.setItem('habitTrackerUser', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('habitTrackerUser');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup function
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Save role to Firestore (admin if email matches)
    const role = email === 'admin@gmail.com' ? 'admin' : 'user';

    await setDoc(doc(db, 'users', firebaseUser.uid), {
      email,
      role,
    });

    // Store locally
    const userData = { uid: firebaseUser.uid, email, role };
    localStorage.setItem('habitTrackerUser', JSON.stringify(userData));
    setUser(userData);
  };

  // Login function
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get role from Firestore
    const docRef = doc(db, 'users', firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    const role = docSnap.exists() ? docSnap.data().role : 'user';

    const userData = { uid: firebaseUser.uid, email, role };
    localStorage.setItem('habitTrackerUser', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout
  const logout = () => {
    signOut(auth);
    localStorage.removeItem('habitTrackerUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
