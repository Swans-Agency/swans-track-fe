import { initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9-PQlZS4CdaN_-bNo1VEAZixd_OgNBU0",
  authDomain: "swanttracknotification.firebaseapp.com",
  databaseURL:
    "https://swanttracknotification-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "swanttracknotification",
  storageBucket: "swanttracknotification.appspot.com",
  messagingSenderId: "643262543195",
  appId: "1:643262543195:web:921c030656c9606ca7167e",
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
