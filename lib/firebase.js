import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpN1CDFdbOEJkE7IHPSh-XLUdvtevokQ8",
  authDomain: "my-shop-kipepeo.firebaseapp.com",
  projectId: "my-shop-kipepeo",
  storageBucket: "my-shop-kipepeo.firebasestorage.app",
  messagingSenderId: "504050412701",
  appId: "1:504050412701:web:df79854bf27c15300cb874",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };