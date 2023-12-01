import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNL3ZP4ULWdYV14ewTIO89U8ukblqN1jw",
  authDomain: "dropbox-5d2e6.firebaseapp.com",
  projectId: "dropbox-5d2e6",
  storageBucket: "dropbox-5d2e6.appspot.com",
  messagingSenderId: "618664248328",
  appId: "1:618664248328:web:ad17e0c8c11879e8fcbdbd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
