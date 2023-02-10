
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import {ref as storageRef} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCvgLSIInuu4XAUMmBT6Bo90EhB5XHZ8Kg",
  authDomain: "restaurant-app-ca9a9.firebaseapp.com",
  databaseURL: "https://restaurant-app-ca9a9-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-ca9a9",
  storageBucket: "restaurant-app-ca9a9.appspot.com",
  messagingSenderId: "495303391047",
  appId: "1:495303391047:web:a0b72b31b375ff97cbbe62",
  measurementId: "G-19P4D18JPG"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export {storageRef};