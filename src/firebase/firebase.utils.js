import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaxbxL2KLJ_SHxEszkRe6ObPyrpYe42w8",
  authDomain: "user-manager-a7ff6.firebaseapp.com",
  databaseURL: "https://user-manager-a7ff6.firebaseio.com",
  projectId: "user-manager-a7ff6",
  storageBucket: "user-manager-a7ff6.appspot.com",
  messagingSenderId: "921790992682",
  appId: "1:921790992682:web:f8a677bbdf1fd9b3584e53",
  measurementId: "G-2EVRGBW2TQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        createdAt,
        displayName,
        email,
        likes: '',
        photoURL,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export const editUserProfileDocument = async (userId, additionalData) => {
  const userRef = firestore.doc(`users/${userId}`);
  const snapShot = await userRef.get();
  try {
    await userRef.set({
      ...snapShot.data(),
      ...additionalData,
    })
  } catch (error) {
    console.error('error updating user', error.message);
  }
}

// export const getUsersList = async () => {
//   const usersListRef = firestore.collection(`users`);
//   const snapShot = await usersListRef.get();
//   const usersList = await snapShot.docs;

//   return usersList;
// }
export const getUsersList = async () => {
  const usersSnapshot = await firestore.collection(`users`).get();
  let usersList = [];
  usersSnapshot.forEach((doc) => usersList.push({id: doc.id, ...doc.data()}));

  return usersList;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;