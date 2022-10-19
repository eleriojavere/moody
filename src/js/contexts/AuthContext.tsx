import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

interface AuthContextInterface {
  currentUser: { email: string | null | undefined } | null;
  signup: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  signOut: () => void;
  error: null | { code: string; message: string };
}

const AuthContext = React.createContext<AuthContextInterface>({
  currentUser: null,
  signup: () => {},
  logIn: () => {},
  signOut: () => {},
  error: null,
});

export function AuthProvider({ children }: { children: ReactElement }) {
  const [currentUser, setCurrentUser] =
    useState<AuthContextInterface["currentUser"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | AuthContextInterface["error"]>(
    null
  );

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logIn(email: string, password: string) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = { email: userCredential.user?.email };
        setCurrentUser(user);
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
    currentUser: AuthContextInterface["currentUser"];
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
