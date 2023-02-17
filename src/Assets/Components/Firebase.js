import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDaAXynBc5aWbVtxlZ_p2wGNDjq-CvNsbQ",
  authDomain: "chat-app-6bdfd.firebaseapp.com",
  projectId: "chat-app-6bdfd",
  storageBucket: "chat-app-6bdfd.appspot.com",
  messagingSenderId: "629613937484",
  appId: "1:629613937484:web:7feb3a9d654ebda10f05e9"
};


export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const db=getFirestore();