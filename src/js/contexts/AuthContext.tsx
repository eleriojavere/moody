import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import firebase from "firebase/compat/app";

const AuthContext = React.createContext<any>(null);

export function AuthProvider({ children }: { children: ReactElement }) {
  const [currentUser, setCurrentUser] = useState<
    null | firebase.auth.UserCredential | firebase.User
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | { code: string; message: string }>(
    null
  );

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logIn(email: string, password: string) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential);
      })
      .catch((error) => {
        setError({ code: error.code, message: error.message });
      });
  }

  function signOut() {
    auth
      .signOut()
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => {
        setError({ code: error.code, message: error.message });
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: {
    currentUser: null | firebase.auth.UserCredential | firebase.User;
    signup: (email: string, password: string) => void;
    logIn: (email: string, password: string) => void;
    signOut: () => void;
    error: { code: string; message: string } | null;
  } = {
    currentUser,
    signup,
    logIn,
    signOut,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
