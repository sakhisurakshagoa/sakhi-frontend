import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJQDBrjCAHvYKUVhaqG4xlcMv9QDZT87U",
  authDomain: "sakhi-suraksha-81da0.firebaseapp.com",
  projectId: "sakhi-suraksha-81da0",
  appId: "1:507760104616:web:2a1e0ecd6d1887fff9de9d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);