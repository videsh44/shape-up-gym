// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import * as firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import 'Firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);

const projectStorage = getStorage(fireapp);
const projectFirestore = getFirestore(fireapp);
const auth = getAuth(fireapp);
// const timestamp = database.ServerValue.TIMESTAMP;

export { projectStorage, projectFirestore, auth };
