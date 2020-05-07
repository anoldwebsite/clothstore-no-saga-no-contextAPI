import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBGP1pMHFhNf_JhktRnZvPgRZqnANB_ObM",
  authDomain: "clothing-store-91486.firebaseapp.com",
  databaseURL: "https://clothing-store-91486.firebaseio.com",
  projectId: "clothing-store-91486",
  storageBucket: "clothing-store-91486.appspot.com",
  messagingSenderId: "721926602180",
  appId: "1:721926602180:web:9f51aeaa7267d013b13891",
  measurementId: "G-KWP9VX342H"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //Do nothing. Just return back.
  const userRef = firestore.doc(`users/${userAuth.uid}`);//Every user has a user id i.e., uid
  const snapshot = await userRef.get();//Get the shanpshot object useing a call to the get method on the userRef object.
  //console.log(snapshot);
  if (!snapshot.exists) //Create the data as there is no data, using the object userRef
  {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set(
        {
          displayName,
          email,
          createdAt,
          ...additionalData
        }
      )
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Gmail login
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//Facebook login
const providerFB = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => auth.signInWithPopup(providerFB);


export default firebase;