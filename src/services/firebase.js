import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = {
  apiKey: "AIzaSyDFFUN_0mXGk-w6dX9Ij961Loy9cP-jF7k",
  authDomain: "portfolio-react-10eac.firebaseapp.com",
  projectId: "portfolio-react-10eac",
  storageBucket: "portfolio-react-10eac.firebasestorage.app",
  messagingSenderId: "886568465330",
  appId: "1:886568465330:web:0e58d36aa9ffe8a3fceaab",
  measurementId: "G-J95D9L4H3Y",
};

// Inicializa o Firebase
const app = initializeApp(firebaseApp);
const db = getFirestore(app);

export { app, db };
