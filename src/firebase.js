import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC0ivLsikLkRnSIiUrGmGTY0XJifVM0mFA",
  authDomain: "chat-app-demo-8f295.firebaseapp.com",
  projectId: "chat-app-demo-8f295",
  storageBucket: "chat-app-demo-8f295.appspot.com",
  messagingSenderId: "792464962672",
  appId: "1:792464962672:web:26153fa5f86e7eed1870b5"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export default db