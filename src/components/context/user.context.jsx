import { useState, createContext, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../../utils/firebase.config.js";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser, children };

  useEffect(() => {

    // manages user auth state and also connects with firbase.utils.js to create collection in firstore database
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
     
    });

    return unsubscribe; // avoids memory leaks
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
