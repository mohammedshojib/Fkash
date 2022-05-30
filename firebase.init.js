import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBp3O-YOTZ5KUk1uaEIoy3__KZPG_PYuk0",
  authDomain: "fkash-239a1.firebaseapp.com",
  projectId: "fkash-239a1",
  storageBucket: "fkash-239a1.appspot.com",
  messagingSenderId: "914515829467",
  appId: "1:914515829467:web:11facf8276a4ae05a3e2fe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
