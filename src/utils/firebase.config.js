import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyvkoC5GmGwtze6_1Afca5g7oFtiBOAvk",
  authDomain: "shared-budget-home.firebaseapp.com",
  projectId: "shared-budget-home",
  storageBucket: "shared-budget-home.appspot.com",
  messagingSenderId: "312805157700",
  appId: "1:312805157700:web:9a2f04e7d8154c45568511",
  measurementId: "G-K3ZH0J2MT5",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const userDb = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(userDb, collectionKey);
  const batch = writeBatch(userDb);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //doc takes three arguments
  //docref is to check the user existance

  if (!userAuth) return;
  const userDocRef = doc(userDb, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if the user does not exists

  if (!userSnapshot.exists()) {
    const { displayName, email, phoneNumber } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        phoneNumber,
        createdAt,
        moneyPot: [],
        budget: {
          weeklyBudget: null,
          monthlyBudget: null,
          currencyValue: null,
          weekTarget: null,
          expenses: [],
        },

        ...additionalInformation,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const updateUserBudget = async (budgetValues) => {
  if (budgetValues) {
    const { currencyValue, weeklyBudgetValue, monthlyBudgetValue, weekTarget } =
      budgetValues;

    const userCollection = collection(userDb, "users");
    const userId = async () => {
      if (auth.currentUser) {
        const { uid } = await auth.currentUser;
        await setDoc(
          doc(userCollection, uid),
          {
            budget: {
              weeklyBudget: weeklyBudgetValue,
              monthlyBudget: monthlyBudgetValue,
              currencyValue: currencyValue,
              weekTarget: weekTarget,
              expenses: [],
            },
            
          },
          { merge: true }
        );
      }
    };

    return userId();
  }
};
export const updateUserExpense = async (expenseValues) => {
 
  if (expenseValues) {
    const userCollection = collection(userDb, "users");
    const userId = async () => {
      if (auth.currentUser) {
        const { uid } = await auth.currentUser;
        await setDoc(
          doc(userCollection, uid),
          {
            budget: {
              expenses: expenseValues,
            },
            
          },
          { merge: true }
        );
      }
    };

    return userId();
  }
};

export const userBudgetValues = async () => {
  const userId = async () => {
    if (auth.currentUser) {
      const { uid } = await auth.currentUser;
      const docRef = doc(userDb, "users", uid);
      const docSnap = await getDoc(docRef);
      const { budget } = docSnap.data();

      return budget;
    }
  };

  return userId();
};

export const updateUserMoneyPot = async (moneyPotValues) => {
  if (moneyPotValues) {
    const userCollection = collection(userDb, "users");
    const userId = async () => {
      if (auth.currentUser) {
        const { uid } = await auth.currentUser;
        await setDoc(
          doc(userCollection, uid),
          {
            moneyPot: moneyPotValues,
          },
          { merge: true }
        );
      }
    };

    return userId();
  }
};

export const userMoneyPotValues = async () => {
  const userId = async () => {
    if (auth.currentUser) {
      const { uid } = await auth.currentUser;
      const docRef = doc(userDb, "users", uid);
      const docSnap = await getDoc(docRef);
      const { moneyPot } = docSnap.data();

      return moneyPot;
    }
  };

  return userId();
};
