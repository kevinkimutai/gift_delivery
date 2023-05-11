import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzNR8GzP5vgHcd5niy6j0rqgYApveqBH0",
  authDomain: "gift-delivery-7f82c.firebaseapp.com",
  projectId: "gift-delivery-7f82c",
  storageBucket: "gift-delivery-7f82c.appspot.com",
  messagingSenderId: "763294999393",
  appId: "1:763294999393:web:3d7beaff27a4e847dd1b20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
