import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBMMrupmXOqSeHYvDYkERwj6kcc1yjP3i8",
  authDomain: "ecommerceweb-262cb.firebaseapp.com",
  projectId: "ecommerceweb-262cb",
  storageBucket: "ecommerceweb-262cb.appspot.com",
  messagingSenderId: "376298249076",
  appId: "1:376298249076:web:d5216b9ace488fe4116a21",
  measurementId: "G-R2NBBD6LXJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);