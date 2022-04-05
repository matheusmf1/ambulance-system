import  React, { useContext, useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  updateProfile,
 } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext( AuthContext );
}

export function AuthProvider( { children } ) {

  const [ currentUser, setCurrentUser ] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword( auth, email, password );
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword( auth, email, password );
  }

  const logout = () => {
    return signOut( auth );
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail( auth, email );
  }

  const updateEmailProvider = (newEmail) => {
    return updateEmail( currentUser, newEmail );
  }

  const updatePasswordProvider = ( newPassword ) => {
    return updatePassword( currentUser, newPassword );
  }

  const sendEmailVerificationProvider = () => {
    return sendEmailVerification( auth.currentUser );
  }

  const updateProfileProvider = ( name ) => {
    return updateProfile( auth.currentUser, { displayName: name })
  }

  const addUserToFirestore = () => {
    return setDoc( doc( db, "users", auth.currentUser.uid ), {} );
  }

  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      setCurrentUser( user );
      setLoading( false );
    });
  }, []);

  

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmailProvider,
    updatePasswordProvider,
    sendEmailVerificationProvider,
    updateProfileProvider,
    addUserToFirestore
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}