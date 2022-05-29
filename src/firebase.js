// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD3AsJUcOYnCyUQ4_STxm6x226b6PPhLmE",
  authDomain: "team3-sky.firebaseapp.com",
  projectId: "team3-sky",
  storageBucket: "team3-sky.appspot.com",
  messagingSenderId: "144188363669",
  appId: "1:144188363669:web:23ec38e4160f5fc834dc9c",
  measurementId: "G-CHCTRSBL7Y",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
