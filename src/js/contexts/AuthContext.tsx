import React, { ReactElement, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

type User = {
  email?: string | null;
} | null;
interface AuthContextInterface {
  currentUser: User;
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
  const [currentUser, setCurrentUser] = useState<User>(null);
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
        if (userCredential?.user?.email != null) {
          const user = { email: userCredential.user?.email };
          setCurrentUser(user);
        }
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

  const value = {
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
